import React from 'react';
import { useI18n } from '../i18n';
import { relatedLinks } from '../config/relatedLinks';

const RelatedTools: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className="section" id="related-tools">
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <h2 style={{ fontSize: 26 }}>{t('relatedTitle')}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {relatedLinks.map((link) => (
            <a key={link.href} className="chip" href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedTools;
