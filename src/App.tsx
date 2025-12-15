import React, { useEffect, useMemo } from 'react';
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import UseCases from './sections/UseCases';
import FAQ from './sections/FAQ';
import About from './sections/About';
import RelatedTools from './sections/RelatedTools';
import AudioWorkspace from './components/AudioWorkspace';
import Header from './components/Header';
import Footer from './components/Footer';
import { I18nProvider, useI18n } from './i18n';
import { ThemeProvider } from './theme/ThemeProvider';

const ScrollAnchors: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const { t } = useI18n();

  const jsonLd = useMemo(() => {
    const faqEntries = t('faq').map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer }
    }));
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: 'Soundloadmate',
          applicationCategory: 'Multimedia',
          operatingSystem: 'Web',
          url: 'https://soundloadmate.xyh.wiki',
          description: 'Offline audio trimming, merging, and export in your browser',
          featureList: ['Trim audio', 'Merge clips', 'Normalize loudness', 'Export WAV/OGG']
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqEntries
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://soundloadmate.xyh.wiki/' },
            { '@type': 'ListItem', position: 2, name: 'How it works', item: 'https://soundloadmate.xyh.wiki/how-it-works' },
            { '@type': 'ListItem', position: 3, name: 'FAQ', item: 'https://soundloadmate.xyh.wiki/faq' }
          ]
        }
      ]
    };
  }, [t]);

  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE;
    if (!base) return;
    fetch(`${base}/heartbeat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ app: 'soundloadmate', timestamp: Date.now() })
    }).catch((err) => console.debug('Optional heartbeat skipped:', err));
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header onCtaClick={() => scrollTo('workspace')} />
      <Hero onPrimary={() => scrollTo('workspace')} onSecondary={() => scrollTo('how-it-works')} />
      <AudioWorkspace />
      <HowItWorks />
      <UseCases />
      <RelatedTools />
      <FAQ />
      <About />
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <I18nProvider>
        <ScrollAnchors />
      </I18nProvider>
    </ThemeProvider>
  );
};

export default App;
