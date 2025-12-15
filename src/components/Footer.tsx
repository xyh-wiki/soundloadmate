import React from 'react';
import { useI18n } from '../i18n';
import { relatedLinks } from '../config/relatedLinks';

const Footer: React.FC = () => {
  const { t } = useI18n();
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 0', marginTop: 60 }}>
      <div className="container" style={{ display: 'grid', gap: 16 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <span className="chip">{t('footerPrivacy')}</span>
          <span className="chip">{t('footerTerms')}</span>
          <span className="chip">{t('backendOptional')}</span>
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 14 }}>{t('footerLegal')}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {relatedLinks.map((link) => (
            <a key={link.href} className="chip" href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
