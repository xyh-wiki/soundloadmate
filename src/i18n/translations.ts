export type Locale = 'en' | 'es';

type FAQItem = { question: string; answer: string };

type Translation = {
  languageName: string;
  brandTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  privacyBadge: string;
  offlineBadge: string;
  workspaceTitle: string;
  workspaceHelper: string;
  addFile: string;
  addUrl: string;
  urlPlaceholder: string;
  fileLimits: string;
  trackListTitle: string;
  startLabel: string;
  endLabel: string;
  normalizeLabel: string;
  formatLabel: string;
  renderAction: string;
  resetAction: string;
  downloadAction: string;
  statusIdle: string;
  statusWorking: string;
  statusError: string;
  statusSuccess: string;
  progressPreparing: string;
  progressRecording: string;
  progressEncoding: string;
  howTitle: string;
  howSteps: string[];
  useCasesTitle: string;
  useCases: string[];
  benefitsTitle: string;
  benefits: string[];
  relatedTitle: string;
  faqTitle: string;
  faq: FAQItem[];
  aboutTitle: string;
  aboutBody: string;
  contactTitle: string;
  contactBody: string;
  footerLegal: string;
  footerPrivacy: string;
  footerTerms: string;
  themeLabel: string;
  languageLabel: string;
  formatNotes: string;
  backendOptional: string;
  limitationsTitle: string;
  limitationCors: string;
  limitationMp3: string;
  limitationSize: string;
};

export const translations: Record<Locale, Translation> = {
  en: {
    languageName: 'English',
    brandTagline: 'Offline-first audio trimming, merging, and export in your browser.',
    heroTitle: 'Private audio workspace for quick trims, merges, and exports',
    heroSubtitle: 'Soundloadmate keeps audio local to your device while you trim, normalize, and export clean clips. Mobile-friendly with smart defaults.',
    heroPrimaryCta: 'Open workspace',
    heroSecondaryCta: 'See how it works',
    privacyBadge: 'No uploads — stays on your device',
    offlineBadge: 'Offline-friendly',
    workspaceTitle: 'Audio workspace',
    workspaceHelper: 'Drop files or paste a CORS-allowed URL. Set trim points, queue clips, normalize, then export.',
    addFile: 'Add file',
    addUrl: 'Add URL',
    urlPlaceholder: 'https://... (must allow CORS)',
    fileLimits: 'Best for <30 MB or <15 minutes per file to avoid memory spikes on mobile.',
    trackListTitle: 'Tracks',
    startLabel: 'Start (sec)',
    endLabel: 'End (sec)',
    normalizeLabel: 'Normalize loudness',
    formatLabel: 'Export format',
    renderAction: 'Render & export',
    resetAction: 'Reset workspace',
    downloadAction: 'Download result',
    statusIdle: 'Waiting for tracks',
    statusWorking: 'Processing...',
    statusError: 'Something went wrong. Try smaller files or another format.',
    statusSuccess: 'Ready to download',
    progressPreparing: 'Preparing buffers',
    progressRecording: 'Recording for browser-friendly encoding',
    progressEncoding: 'Encoding output',
    howTitle: 'How it works',
    howSteps: [
      '1) Add audio from device or CORS-allowed URL',
      '2) Choose trim points, normalize loudness, and order clips',
      '3) Export as WAV for lossless or OGG/WEBM via MediaRecorder'
    ],
    useCasesTitle: 'Use cases',
    useCases: [
      'Podcast snippets and interview highlights',
      'Lecture, webinar, or meeting cleanups',
      'Music practice loops and stems',
      'Sound effects batching for games or videos'
    ],
    benefitsTitle: 'Why Soundloadmate',
    benefits: [
      'Fast: Offline rendering with Web Audio and no uploads',
      'Safe: Nothing leaves your browser; privacy by default',
      'Simple: Trim, normalize, and export in a few clicks',
      'Portable: Mobile-friendly controls and low-memory guidance'
    ],
    relatedTitle: 'Related tools',
    faqTitle: 'FAQ & limitations',
    faq: [
      {
        question: 'Does Soundloadmate download from SoundCloud, YouTube, or Spotify?',
        answer: 'No. Direct downloading is blocked by CORS/rights. Use your own files or URLs that explicitly allow CORS.'
      },
      {
        question: 'Which formats can I export?',
        answer: 'WAV is rendered losslessly. OGG/WEBM uses MediaRecorder when supported. MP3 export is not provided because browsers cannot encode MP3 natively.'
      },
      {
        question: 'Why did my URL fail?',
        answer: 'The remote server must send CORS headers that allow your browser to fetch the file. If not, download locally first.'
      },
      {
        question: 'What if rendering is slow?',
        answer: 'Keep files under ~30 MB or 15 minutes. Close other tabs, and prefer WAV export on low-memory devices.'
      }
    ],
    aboutTitle: 'About Soundloadmate',
    aboutBody: 'Built for creators who need quick, private audio trims without heavyweight DAWs. Everything runs locally in your browser.',
    contactTitle: 'Contact',
    contactBody: 'Questions or feedback? Email xyh.wiki@gmail.com',
    footerLegal: '© 2024 Soundloadmate. All rights reserved.',
    footerPrivacy: 'Privacy',
    footerTerms: 'Terms',
    themeLabel: 'Theme',
    languageLabel: 'Language',
    formatNotes: 'OGG/WEBM uses MediaRecorder when your browser supports it; otherwise WAV only.',
    backendOptional: 'Optional analytics end-point (if configured) tracks anonymous usage. Core features stay local.',
    limitationsTitle: 'Known limitations',
    limitationCors: 'Remote URLs must allow CORS. Otherwise, download locally first.',
    limitationMp3: 'MP3 encoding is not available natively in browsers.',
    limitationSize: 'Large files may spike memory. Recommend <30 MB per track.'
  },
  es: {
    languageName: 'Español',
    brandTagline: 'Edición de audio primero offline: recorta, une y exporta en tu navegador.',
    heroTitle: 'Espacio privado para recortar, unir y exportar audio',
    heroSubtitle: 'Soundloadmate mantiene el audio en tu dispositivo mientras recortas, normalizas y exportas. Compatible con móvil y ligero.',
    heroPrimaryCta: 'Abrir espacio',
    heroSecondaryCta: 'Cómo funciona',
    privacyBadge: 'Sin subidas — todo queda local',
    offlineBadge: 'Funciona sin conexión',
    workspaceTitle: 'Espacio de audio',
    workspaceHelper: 'Suelta archivos o pega una URL con CORS. Ajusta recortes, ordena clips, normaliza y exporta.',
    addFile: 'Agregar archivo',
    addUrl: 'Agregar URL',
    urlPlaceholder: 'https://... (debe permitir CORS)',
    fileLimits: 'Recomendado <30 MB o <15 minutos por archivo para evitar picos de memoria.',
    trackListTitle: 'Pistas',
    startLabel: 'Inicio (s)',
    endLabel: 'Fin (s)',
    normalizeLabel: 'Normalizar volumen',
    formatLabel: 'Formato de exportación',
    renderAction: 'Renderizar y exportar',
    resetAction: 'Reiniciar espacio',
    downloadAction: 'Descargar resultado',
    statusIdle: 'Esperando pistas',
    statusWorking: 'Procesando...',
    statusError: 'Ocurrió un error. Prueba con archivos más pequeños o otro formato.',
    statusSuccess: 'Listo para descargar',
    progressPreparing: 'Preparando búferes',
    progressRecording: 'Grabando para codificación compatible',
    progressEncoding: 'Codificando salida',
    howTitle: 'Cómo funciona',
    howSteps: [
      '1) Agrega audio desde tu dispositivo o una URL con CORS',
      '2) Define puntos de recorte, normaliza volumen y ordena clips',
      '3) Exporta como WAV sin pérdidas u OGG/WEBM con MediaRecorder'
    ],
    useCasesTitle: 'Casos de uso',
    useCases: [
      'Fragmentos de pódcast y entrevistas',
      'Limpieza de clases, webinars o reuniones',
      'Bucles de práctica musical y stems',
      'Lotes de efectos de sonido para juegos o video'
    ],
    benefitsTitle: 'Por qué Soundloadmate',
    benefits: [
      'Rápido: render offline sin subidas',
      'Seguro: nada sale de tu navegador',
      'Simple: recorta y exporta en pocos clics',
      'Portátil: controles móviles y guía para poca memoria'
    ],
    relatedTitle: 'Herramientas relacionadas',
    faqTitle: 'Preguntas y límites',
    faq: [
      {
        question: '¿Descarga desde SoundCloud, YouTube o Spotify?',
        answer: 'No. Las descargas directas están bloqueadas por CORS/derechos. Usa archivos propios o URLs con CORS permitido.'
      },
      {
        question: '¿Qué formatos puedo exportar?',
        answer: 'WAV es sin pérdidas. OGG/WEBM usa MediaRecorder si el navegador lo soporta. No se ofrece MP3 porque el navegador no codifica MP3 nativamente.'
      },
      {
        question: '¿Por qué falló mi URL?',
        answer: 'El servidor remoto debe enviar cabeceras CORS que permitan la descarga. Si no, descárgalo primero.'
      },
      {
        question: '¿Qué pasa si es lento?',
        answer: 'Mantén los archivos bajo ~30 MB o 15 minutos. Cierra pestañas y usa WAV en dispositivos con poca memoria.'
      }
    ],
    aboutTitle: 'Sobre Soundloadmate',
    aboutBody: 'Diseñado para creadores que necesitan recortes rápidos y privados sin DAWs pesados. Todo ocurre en tu navegador.',
    contactTitle: 'Contacto',
    contactBody: '¿Dudas o comentarios? Escribe a xyh.wiki@gmail.com',
    footerLegal: '© 2024 Soundloadmate. Todos los derechos reservados.',
    footerPrivacy: 'Privacidad',
    footerTerms: 'Términos',
    themeLabel: 'Tema',
    languageLabel: 'Idioma',
    formatNotes: 'OGG/WEBM usa MediaRecorder cuando tu navegador lo soporta; si no, solo WAV.',
    backendOptional: 'El endpoint opcional de analítica (si se configura) registra uso anónimo. Las funciones clave son locales.',
    limitationsTitle: 'Limitaciones conocidas',
    limitationCors: 'Las URLs remotas deben permitir CORS. Si no, descárgalo primero.',
    limitationMp3: 'El navegador no codifica MP3 de forma nativa.',
    limitationSize: 'Archivos grandes pueden usar mucha memoria. Recomendado <30 MB.'
  }
};

export const availableLocales: Locale[] = ['en', 'es'];
