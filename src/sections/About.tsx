import React from 'react';
import { useI18n } from '../i18n';

const About: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className="section" id="about">
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <h2 style={{ fontSize: 28 }}>{t('aboutTitle')}</h2>
        <p style={{ color: 'var(--muted)', maxWidth: 720 }}>{t('aboutBody')}</p>
        <h3 style={{ fontSize: 22 }}>{t('contactTitle')}</h3>
        <p style={{ color: 'var(--muted)' }}>{t('contactBody')}</p>
      </div>
    </section>
  );
};

export default About;
