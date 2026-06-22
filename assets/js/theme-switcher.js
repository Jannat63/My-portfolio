/*!
 * AHSAN JANNAT — DESIGN THEME SWITCHER
 * Swaps a single stylesheet href to apply one of 5 full visual themes.
 * One click on the palette button advances to the next theme in the
 * list; the active choice is persisted in localStorage so it carries
 * across every page on the site.
 */
(function () {
  'use strict';

  const ROOT = window.location.pathname.includes('/blog/') ? '../' : '';
  const STORAGE_KEY = 'aj-style';

  const THEMES = [
    { id: 'sage',          label: 'Default',              file: 'theme-sage.css' },
    { id: 'glass',         label: 'Glassmorphism',        file: 'theme-glassmorphism.css' },
    { id: 'neumorphism',   label: 'Neumorphism',          file: 'theme-neumorphism.css' },
    { id: 'claymorphism',  label: 'Claymorphism',         file: 'theme-claymorphism.css' },
    { id: 'skeuomorphism', label: 'Modern Skeuomorphism', file: 'theme-skeuomorphism.css' }
  ];

  const link     = document.getElementById('themeStyleLink');
  const btn      = document.getElementById('styleBtn');
  const htmlEl   = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');

  if (!link) return;

  /* ── Apply a theme ───────────────────────────────────────────── */
  function applyTheme(id, announce) {
    const theme = THEMES.find(t => t.id === id) || THEMES[0];

    // Briefly force every element to transition colour/shadow properties
    // smoothly, even ones that don't normally declare a transition, so
    // swapping the stylesheet never feels like an abrupt jump-cut.
    htmlEl.classList.add('aj-theme-transitioning');
    window.clearTimeout(htmlEl._ajThemeT);
    htmlEl._ajThemeT = window.setTimeout(() => {
      htmlEl.classList.remove('aj-theme-transitioning');
    }, 420);

    link.setAttribute('href', ROOT + 'assets/css/themes/' + theme.file);
    htmlEl.setAttribute('data-style', theme.id);
    localStorage.setItem(STORAGE_KEY, theme.id);

    // Every theme now has its own dark-mode palette, so the day/night
    // toggle stays available no matter which design theme is active.
    if (themeBtn) {
      themeBtn.style.display = '';
    }

    if (btn) btn.setAttribute('aria-label', 'Portfolio theme: ' + theme.label + '. Click to switch to the next theme.');
    if (announce) showToast(theme.label);
  }

  function nextTheme() {
    const current = htmlEl.getAttribute('data-style') || 'sage';
    const idx = THEMES.findIndex(t => t.id === current);
    const next = THEMES[(idx + 1) % THEMES.length];
    applyTheme(next.id, true);
  }

  /* ── Toast ────────────────────────────────────────────────────── */
  function showToast(label) {
    let toast = document.getElementById('aj-theme-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'aj-theme-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = label;
    toast.classList.add('is-visible');
    window.clearTimeout(toast._hideT);
    toast._hideT = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 1400);
  }

  /* ── Wire up ──────────────────────────────────────────────────── */
  if (btn) {
    btn.addEventListener('click', nextTheme);
  }

  // Apply saved theme on load (no toast on initial load).
  const saved = localStorage.getItem(STORAGE_KEY) || 'sage';
  applyTheme(saved, false);

})();
