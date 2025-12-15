import React from 'react';
import { useI18n } from '../i18n';

const HowItWorks: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <h2 style={{ fontSize: 28, marginBottom: 18 }}>{t('howTitle')}</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {t('howSteps').map((step) => (
            <div key={step} className="card" style={{ minHeight: 120 }}>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
