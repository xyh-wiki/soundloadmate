import React, { useMemo, useRef, useState } from 'react';
import { useI18n } from '../i18n';
import { decodeAudio, fetchAudioBuffer, readFile, renderAndExport, TrackInput } from '../utils/audio';

const uid = () => Math.random().toString(36).slice(2);

const formatDuration = (seconds: number) => `${seconds.toFixed(1)}s`;

const AudioWorkspace: React.FC = () => {
  const { t } = useI18n();
  const [tracks, setTracks] = useState<TrackInput[]>([]);
  const [url, setUrl] = useState('');
  const [normalize, setNormalize] = useState(true);
  const [format, setFormat] = useState<'wav' | 'ogg'>('wav');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState('');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const totalDuration = useMemo(() => tracks.reduce((acc, t) => acc + Math.max(0, t.end - t.start), 0), [tracks]);

  const addFiles = async (files: FileList | null) => {
    if (!files) return;
    setStatus('processing');
    setErrorMsg('');
    const newTracks: TrackInput[] = [];
    for (const file of Array.from(files)) {
      try {
        const buffer = await readFile(file).then((data) => decodeAudio(data));
        newTracks.push({
          id: uid(),
          name: file.name,
          buffer,
          start: 0,
          end: buffer.duration
        });
      } catch (err) {
        console.error(err);
        setErrorMsg(t('statusError'));
      }
    }
    setTracks((prev) => [...prev, ...newTracks]);
    setStatus('idle');
  };

  const addUrl = async () => {
    if (!url) return;
    setStatus('processing');
    setErrorMsg('');
    try {
      const buffer = await fetchAudioBuffer(url);
      setTracks((prev) => [
        ...prev,
        { id: uid(), name: url, buffer, start: 0, end: buffer.duration }
      ]);
    } catch (err) {
      console.error(err);
      setErrorMsg(t('statusError'));
    } finally {
      setStatus('idle');
    }
  };

  const updateTrack = (id: string, changes: Partial<TrackInput>) => {
    setTracks((prev) =>
      prev.map((track) =>
        track.id === id
          ? { ...track, ...changes, start: Math.max(0, changes.start ?? track.start), end: Math.max(changes.start ?? track.start, changes.end ?? track.end) }
          : track
      )
    );
  };

  const removeTrack = (id: string) => {
    setTracks((prev) => prev.filter((t) => t.id !== id));
  };

  const render = async () => {
    if (!tracks.length) return;
    setStatus('processing');
    setProgress(t('progressPreparing'));
    setErrorMsg('');
    try {
      const result = await renderAndExport(tracks, normalize, format, (stage) => {
        if (stage === 'preparing') setProgress(t('progressPreparing'));
        if (stage === 'recording') setProgress(t('progressRecording'));
        if (stage === 'encoding') setProgress(t('progressEncoding'));
      });
      const url = URL.createObjectURL(result.blob);
      setDownloadUrl(url);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg(t('statusError'));
    }
  };

  const reset = () => {
    setTracks([]);
    setStatus('idle');
    setDownloadUrl(null);
    setProgress('');
    setErrorMsg('');
    setUrl('');
  };

  return (
    <section className="section" id="workspace">
      <div className="container" style={{ display: 'grid', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: 28, margin: 0 }}>{t('workspaceTitle')}</h2>
          <span className="chip">{t('fileLimits')}</span>
        </div>
        <p style={{ color: 'var(--muted)' }}>{t('workspaceHelper')}</p>
        <div className="card" style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="button" onClick={() => inputRef.current?.click()}>{t('addFile')}</button>
            <input ref={inputRef} type="file" accept="audio/*" multiple style={{ display: 'none' }} onChange={(e) => addFiles(e.target.files)} />
            <div style={{ flex: 1, minWidth: 240, display: 'flex', gap: 8 }}>
              <input className="text-input" value={url} placeholder={t('urlPlaceholder')} onChange={(e) => setUrl(e.target.value)} />
              <button className="button secondary" onClick={addUrl}>{t('addUrl')}</button>
            </div>
          </div>
          {status === 'processing' && <div className="chip">{progress || t('statusWorking')}</div>}
          {errorMsg && <div className="chip" style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}>{errorMsg}</div>}
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
            {tracks.map((track) => (
              <div key={track.id} className="card" style={{ borderStyle: 'dashed' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.name}</strong>
                  <button className="button secondary" onClick={() => removeTrack(track.id)}>✕</button>
                </div>
                <p style={{ color: 'var(--muted)' }}>{formatDuration(track.end - track.start)} / {formatDuration(track.buffer.duration)}</p>
                <label style={{ display: 'grid', gap: 6 }}>
                  {t('startLabel')}
                  <input
                    className="range"
                    type="range"
                    min={0}
                    max={track.buffer.duration}
                    step={0.1}
                    value={track.start}
                    onChange={(e) => updateTrack(track.id, { start: parseFloat(e.target.value) })}
                  />
                </label>
                <label style={{ display: 'grid', gap: 6 }}>
                  {t('endLabel')}
                  <input
                    className="range"
                    type="range"
                    min={track.start}
                    max={track.buffer.duration}
                    step={0.1}
                    value={track.end}
                    onChange={(e) => updateTrack(track.id, { end: parseFloat(e.target.value) })}
                  />
                </label>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={normalize} onChange={(e) => setNormalize(e.target.checked)} />
              {t('normalizeLabel')}
            </label>
            <label style={{ display: 'grid', gap: 6, maxWidth: 240 }}>
              {t('formatLabel')}
              <select className="select" value={format} onChange={(e) => setFormat(e.target.value as 'wav' | 'ogg')}>
                <option value="wav">WAV (lossless)</option>
                <option value="ogg">OGG / WEBM (browser)</option>
              </select>
            </label>
            <div className="chip">{t('formatNotes')}</div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="button" disabled={!tracks.length || status === 'processing'} onClick={render}>{t('renderAction')}</button>
            <button className="button secondary" onClick={reset}>{t('resetAction')}</button>
            {downloadUrl && status === 'success' && (
              <a className="button" href={downloadUrl} download={`soundloadmate-${Date.now()}.${format === 'wav' ? 'wav' : 'ogg'}`}>
                {t('downloadAction')}
              </a>
            )}
          </div>
          <div className="chip" style={{ background: 'transparent', borderStyle: 'dashed' }}>
            {tracks.length ? `${tracks.length} track(s), ${formatDuration(totalDuration)} combined.` : t('statusIdle')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioWorkspace;
