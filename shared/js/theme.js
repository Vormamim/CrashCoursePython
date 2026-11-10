/**
 * Theme handling shared by the student app and the teacher dashboard.
 * The inline snippet in each page's <head> applies the saved theme before
 * first paint; this module wires up the toggle button.
 */

const KEY = 'ccp2:theme';

/** @returns {'light'|'dark'|null} the saved choice, or null if none. */
export function savedTheme() {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch { return null; }
}

/** @returns {'light'|'dark'} the theme currently in effect. */
export function currentTheme() {
  const attr = document.documentElement.dataset.theme;
  if (attr === 'light' || attr === 'dark') return attr;
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/** Apply and save a theme. */
export function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(KEY, theme); } catch { /* storage unavailable */ }
  document.dispatchEvent(new CustomEvent('ccp2:themechange', { detail: theme }));
}

/**
 * Wire a toggle button. The button label states the action, so the
 * meaning doesn't depend on an icon or colour.
 * @param {HTMLButtonElement} btn
 */
export function initThemeToggle(btn) {
  const sync = () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    btn.textContent = next === 'light' ? 'Light theme' : 'Dark theme';
    btn.setAttribute('aria-label', `Switch to ${next} theme`);
  };
  btn.addEventListener('click', () => {
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    sync();
  });
  sync();
}
