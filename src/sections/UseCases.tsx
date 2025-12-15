import React from 'react';
import { useI18n } from '../i18n';

const UseCases: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className="section" id="use-cases">
      <div className="container" style={{ display: 'grid', gap: 18 }}>
        <h2 style={{ fontSize: 28 }}>{t('useCasesTitle')}</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
          {t('useCases').map((item) => (
            <div key={item} className="card">
              <p>{item}</p>
            </div>
          ))}
        </div>
        <h3 style={{ fontSize: 24 }}>{t('benefitsTitle')}</h3>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
          {t('benefits').map((item) => (
            <div key={item} className="card">
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
