/*!
 * AHSAN JANNAT — DESIGN THEME SWITCHER
 * Cycles through 5 full visual themes by swapping a single
 * stylesheet href. Persisted in localStorage, shared across pages.
 */
(function () {
  'use strict';

  const ROOT = window.location.pathname.includes('/blog/') ? '../' : '';

  const THEMES = [
    { id: 'sage',       label: 'Sage Editorial',  file: 'theme-sage.css' },
    { id: 'deco',       label: 'Art Deco Gold',    file: 'theme-deco.css' },
    { id: 'terminal',   label: 'Neon Terminal',    file: 'theme-terminal.css' },
    { id: 'memphis',    label: 'Memphis Pop',      file: 'theme-memphis.css' },
    { id: 'watercolor', label: 'Watercolor',       file: 'theme-watercolor.css' }
  ];

  const link = document.getElementById('themeStyleLink');
  const btn  = document.getElementById('styleBtn');
  const htmlEl = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');

  if (!link) return;

  function applyTheme(id, announce) {
    const theme = THEMES.find(t => t.id === id) || THEMES[0];
    link.setAttribute('href', ROOT + 'assets/css/themes/' + theme.file);
    htmlEl.setAttribute('data-style', theme.id);
    localStorage.setItem('aj-style', theme.id);

    // Hide light/dark toggle for themes with a fixed mood
    if (themeBtn) {
      themeBtn.style.display = (theme.id === 'sage') ? '' : 'none';
    }

    if (announce) showToast(theme.label);
  }

  function nextTheme() {
    const current = localStorage.getItem('aj-style') || 'sage';
    const idx = THEMES.findIndex(t => t.id === current);
    const next = THEMES[(idx + 1) % THEMES.length];
    applyTheme(next.id, true);
  }

  function showToast(label) {
    let toast = document.getElementById('aj-theme-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'aj-theme-toast';
      toast.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(20px);' +
        'background:#1A1A1A;color:#fff;padding:11px 22px;border-radius:30px;font-size:13px;font-family:system-ui,sans-serif;' +
        'z-index:999999;opacity:0;transition:opacity .35s,transform .35s;pointer-events:none;box-shadow:0 8px 24px rgba(0,0,0,.25);';
      document.body.appendChild(toast);
    }
    toast.textContent = label;
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    clearTimeout(toast._hideT);
    toast._hideT = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 1600);
  }

  // Apply saved theme on load (no toast on initial load)
  const saved = localStorage.getItem('aj-style') || 'sage';
  applyTheme(saved, false);

  if (btn) btn.addEventListener('click', nextTheme);

})();
