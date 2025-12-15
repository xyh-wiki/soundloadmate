import React from 'react';
import { useI18n } from '../i18n';

const FAQ: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className="section" id="faq">
      <div className="container" style={{ display: 'grid', gap: 18 }}>
        <h2 style={{ fontSize: 28 }}>{t('faqTitle')}</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
          {t('faq').map((item) => (
            <div key={item.question} className="card" style={{ display: 'grid', gap: 8 }}>
              <strong>{item.question}</strong>
              <p style={{ color: 'var(--muted)' }}>{item.answer}</p>
            </div>
          ))}
        </div>
        <div className="card" style={{ display: 'grid', gap: 8 }}>
          <strong>{t('limitationsTitle')}</strong>
          <ul style={{ color: 'var(--muted)', paddingLeft: 18, margin: 0, display: 'grid', gap: 6 }}>
            <li>{t('limitationCors')}</li>
            <li>{t('limitationMp3')}</li>
            <li>{t('limitationSize')}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
