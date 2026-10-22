import { t } from './i18n.js';
const sun = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>';
const moon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15a8 8 0 0 1-11-11 8.5 8.5 0 1 0 11 11Z"/></svg>';
export function initTheme() {
  const buttons = [...document.querySelectorAll('.theme-toggle')];
  const sync = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    for (const button of buttons) {
      button.innerHTML = `${dark ? sun : moon}<span class="localized">${t(dark ? 'Claro' : 'Escuro')}</span>`;
      button.setAttribute('aria-label', t(dark ? 'Ativar tema claro' : 'Ativar tema escuro'));
      button.hidden = false;
    }
    document.querySelector('meta[name="theme-color"]').content = dark ? '#14191d' : '#efeee9';
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('loui-theme', next); } catch { /* No persistence in restricted contexts. */ }
    sync();
  }));
  document.addEventListener('languagechange', sync);
  sync();
}
