import React from 'react';
import { useI18n } from '../i18n';

const Hero: React.FC<{ onPrimary?: () => void; onSecondary?: () => void }> = ({ onPrimary, onSecondary }) => {
  const { t } = useI18n();
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="container" style={{ display: 'grid', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span className="badge">{t('privacyBadge')}</span>
          <span className="badge">{t('offlineBadge')}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 48px)', lineHeight: 1.1 }}>{t('heroTitle')}</h1>
        <p style={{ color: 'var(--muted)', fontSize: 18, maxWidth: 720 }}>{t('heroSubtitle')}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="button" onClick={onPrimary}>{t('heroPrimaryCta')}</button>
          <button className="button secondary" onClick={onSecondary}>{t('heroSecondaryCta')}</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
