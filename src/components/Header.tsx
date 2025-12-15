import React from 'react';
import { useI18n, availableLocales, translations } from '../i18n';
import { useTheme } from '../theme/ThemeProvider';

const Header: React.FC<{ onCtaClick?: () => void }> = ({ onCtaClick }) => {
  const { locale, setLocale, t } = useI18n();
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 10, backdropFilter: 'blur(12px)', background: 'rgba(11,18,36,0.65)', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg,var(--accent),var(--accent-2))', display: 'grid', placeItems: 'center', color: '#0b1224', fontWeight: 700 }}>
            SL
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>Soundloadmate</div>
            <div style={{ color: 'var(--muted)', fontSize: 13 }}>{t('brandTagline')}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--muted)' }}>
            {t('languageLabel')}
            <select className="select" style={{ width: 'auto' }} value={locale} onChange={(e) => setLocale(e.target.value as typeof locale)}>
              {availableLocales.map((l) => (
                <option key={l} value={l}>
                  {translations[l].languageName}
                </option>
              ))}
            </select>
          </label>
          <button className="button secondary" onClick={toggleTheme} aria-label={t('themeLabel')}>
            {theme === 'light' ? '🌞' : '🌙'}
          </button>
          <button className="button" onClick={onCtaClick}>{t('heroPrimaryCta')}</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
