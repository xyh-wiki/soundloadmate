export type TrackInput = {
  id: string;
  name: string;
  buffer: AudioBuffer;
  start: number;
  end: number;
};

type ProgressStage = 'preparing' | 'recording' | 'encoding';

export const readFile = async (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};

export const decodeAudio = async (data: ArrayBuffer, sampleRate = 44100) => {
  const ctx = new AudioContext({ sampleRate });
  const decoded = await ctx.decodeAudioData(data.slice(0));
  ctx.close();
  return decoded;
};

export const fetchAudioBuffer = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Fetch failed');
  const buffer = await res.arrayBuffer();
  return decodeAudio(buffer);
};

const cloneChannelData = (buffer: AudioBuffer, start: number, end: number, targetChannels?: number) => {
  const sampleRate = buffer.sampleRate;
  const startIndex = Math.max(0, Math.floor(start * sampleRate));
  const endIndex = Math.min(buffer.length, Math.floor(end * sampleRate));
  const frameCount = Math.max(0, endIndex - startIndex);
  const channelCount = targetChannels ? Math.min(targetChannels, buffer.numberOfChannels) : buffer.numberOfChannels;
  const out = new AudioBuffer({
    length: frameCount,
    numberOfChannels: channelCount,
    sampleRate
  });
  for (let ch = 0; ch < channelCount; ch += 1) {
    const data = buffer.getChannelData(ch).slice(startIndex, endIndex);
    out.copyToChannel(data, ch, 0);
  }
  return out;
};

const normalizeBuffer = (buffer: AudioBuffer) => {
  let peak = 0;
  for (let ch = 0; ch < buffer.numberOfChannels; ch += 1) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < data.length; i += 1) {
      const value = Math.abs(data[i]);
      if (value > peak) peak = value;
    }
  }
  if (peak === 0) return buffer;
  const gain = 1 / peak;
  const out = new AudioBuffer({ length: buffer.length, numberOfChannels: buffer.numberOfChannels, sampleRate: buffer.sampleRate });
  for (let ch = 0; ch < buffer.numberOfChannels; ch += 1) {
    const data = buffer.getChannelData(ch);
    const target = out.getChannelData(ch);
    for (let i = 0; i < data.length; i += 1) {
      target[i] = data[i] * gain;
    }
  }
  return out;
};

const renderSequence = async (tracks: TrackInput[], normalize: boolean) => {
  if (!tracks.length) throw new Error('No tracks');
  const sampleRate = tracks[0].buffer.sampleRate;
  const channelCount = Math.min(
    2,
    Math.max(
      1,
      ...tracks.map((t) => t.buffer.numberOfChannels)
    )
  );
  const totalDuration = tracks.reduce((acc, t) => acc + Math.max(0, t.end - t.start), 0);
  const offline = new OfflineAudioContext({
    length: Math.ceil(totalDuration * sampleRate),
    numberOfChannels: channelCount,
    sampleRate
  });
  let offset = 0;
  tracks.forEach((track) => {
    const duration = Math.max(0, track.end - track.start);
    if (duration <= 0) return;
    const source = offline.createBufferSource();
    const trimmed = cloneChannelData(track.buffer, track.start, track.end, channelCount);
    const toPlay = normalize ? normalizeBuffer(trimmed) : trimmed;
    source.buffer = toPlay;
    source.connect(offline.destination);
    source.start(offset, 0, duration);
    offset += duration;
  });
  const rendered = await offline.startRendering();
  return rendered;
};

const writeWav = (buffer: AudioBuffer) => {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const samples = buffer.length;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const bufferLength = 44 + samples * blockAlign;
  const arrayBuffer = new ArrayBuffer(bufferLength);
  const view = new DataView(arrayBuffer);
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i += 1) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + samples * blockAlign, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bytesPerSample * 8, true);
  writeString(36, 'data');
  view.setUint32(40, samples * blockAlign, true);
  let offset = 44;
  for (let i = 0; i < samples; i += 1) {
    for (let ch = 0; ch < numChannels; ch += 1) {
      const sample = buffer.getChannelData(ch)[i];
      const clipped = Math.max(-1, Math.min(1, sample));
      view.setInt16(offset, clipped < 0 ? clipped * 0x8000 : clipped * 0x7fff, true);
      offset += bytesPerSample;
    }
  }
  return new Blob([arrayBuffer], { type: 'audio/wav' });
};

const recordOgg = async (buffer: AudioBuffer, onProgress?: (stage: ProgressStage) => void) => {
  const ctx = new AudioContext({ sampleRate: buffer.sampleRate });
  const destination = ctx.createMediaStreamDestination();
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(destination);
  source.connect(ctx.destination);
  const mimeOptions = ['audio/ogg;codecs=opus', 'audio/webm;codecs=opus', 'audio/webm'];
  const mimeType = mimeOptions.find((m) => MediaRecorder.isTypeSupported(m));
  if (!mimeType) {
    ctx.close();
    throw new Error('No supported recording mime type');
  }
  const recorder = new MediaRecorder(destination.stream, { mimeType });
  const chunks: BlobPart[] = [];
  return new Promise<Blob>((resolve, reject) => {
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onerror = (e) => {
      ctx.close();
      reject(e.error || new Error('Recording failed'));
    };
    recorder.onstop = () => {
      ctx.close();
      resolve(new Blob(chunks, { type: mimeType }));
    };
    try {
      source.start();
      onProgress?.('recording');
      recorder.start();
      setTimeout(() => {
        recorder.stop();
        source.stop();
        onProgress?.('encoding');
      }, buffer.duration * 1000 + 120);
    } catch (err) {
      ctx.close();
      reject(err);
    }
  });
};

export const renderAndExport = async (
  tracks: TrackInput[],
  normalize: boolean,
  format: 'wav' | 'ogg',
  onProgress?: (stage: ProgressStage) => void
) => {
  onProgress?.('preparing');
  const combined = await renderSequence(tracks, normalize);
  if (format === 'wav') {
    const blob = writeWav(combined);
    return { blob, mime: 'audio/wav' };
  }
  const blob = await recordOgg(combined, onProgress);
  return { blob, mime: blob.type || 'audio/ogg' };
};
