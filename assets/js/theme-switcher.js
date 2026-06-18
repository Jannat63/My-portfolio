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
    { id: 'watercolor', label: 'Watercolor',       file: 'theme-watercolor.css' },
    { id: 'ghost',      label: 'Ghost Manor',      file: 'theme-ghost.css' }
  ];

  const link = document.getElementById('themeStyleLink');
  const btn  = document.getElementById('styleBtn');
  const htmlEl = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');

  if (!link) return;

  function injectGhostStyles() {
    if (document.getElementById('aj-ghost-anim')) return;
    const s = document.createElement('style');
    s.id = 'aj-ghost-anim';
    s.textContent = `
      @keyframes ghostFloatA {
        0%   { transform: translate(6vw, 82vh) rotate(-3deg); }
        25%  { transform: translate(72vw, 58vh) rotate(2deg); }
        50%  { transform: translate(86vw, 14vh) rotate(-2deg); }
        75%  { transform: translate(32vw, 28vh) rotate(3deg); }
        100% { transform: translate(6vw, 82vh) rotate(-3deg); }
      }
      @keyframes ghostFloatB {
        0%   { transform: translate(88vw, 18vh) rotate(2deg); }
        25%  { transform: translate(48vw, 68vh) rotate(-3deg); }
        50%  { transform: translate(8vw, 48vh) rotate(2deg); }
        75%  { transform: translate(58vw, 9vh) rotate(-2deg); }
        100% { transform: translate(88vw, 18vh) rotate(2deg); }
      }
      @keyframes ghostFloatC {
        0%   { transform: translate(14vw, 9vh) rotate(0deg); }
        33%  { transform: translate(44vw, 24vh) rotate(3deg); }
        66%  { transform: translate(76vw, 7vh) rotate(-3deg); }
        100% { transform: translate(14vw, 9vh) rotate(0deg); }
      }
      @keyframes ghostFloatD {
        0%   { transform: translate(78vw, 86vh) rotate(-2deg); }
        50%  { transform: translate(18vw, 90vh) rotate(2deg); }
        100% { transform: translate(78vw, 86vh) rotate(-2deg); }
      }
      @keyframes ghostBob {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-12px); }
      }
      .aj-gw { animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
    `;
    document.head.appendChild(s);
  }

  function ghostSVG(w, grad1, grad2) {
    return '<svg width="' + w + '" height="' + (w*1.1) + '" viewBox="0 0 100 110">' +
      '<defs><linearGradient id="gg' + grad1 + grad2 + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="' + grad1 + '" stop-opacity=".9"/>' +
      '<stop offset="1" stop-color="' + grad2 + '" stop-opacity=".55"/></linearGradient></defs>' +
      '<path d="M50 8 C25 8 14 30 14 52 L14 88 C18 84 23 92 28 86 C32 93 37 95 41 87 C44 94 49 96 50 87 C51 96 56 94 59 87 C63 95 68 93 72 86 C77 92 82 84 86 88 L86 52 C86 30 75 8 50 8 Z" fill="url(#gg' + grad1 + grad2 + ')"/>' +
      '<ellipse cx="38" cy="46" rx="5" ry="7" fill="#0A0E11" opacity=".75"/>' +
      '<ellipse cx="63" cy="46" rx="5" ry="7" fill="#0A0E11" opacity=".75"/>' +
      '</svg>';
  }

  function injectFloatingGhosts() {
    if (document.querySelector('.aj-floating-ghost')) return;
    injectGhostStyles();
    const ghosts = [
      { anim: 'ghostFloatA', dur: '34s', delay: '0s',  bobDur: '3.2s', size: 70, c1: '#5FD8CC', c2: '#9B8FE0' },
      { anim: 'ghostFloatB', dur: '40s', delay: '-8s', bobDur: '3.8s', size: 54, c1: '#9B8FE0', c2: '#5FD8CC' },
      { anim: 'ghostFloatC', dur: '28s', delay: '-3s', bobDur: '2.9s', size: 42, c1: '#8AE8DD', c2: '#B3A8F0' },
      { anim: 'ghostFloatD', dur: '36s', delay: '-14s',bobDur: '3.5s', size: 58, c1: '#B3A8F0', c2: '#5FD8CC' }
    ];
    ghosts.forEach(g => {
      const outer = document.createElement('div');
      outer.className = 'aj-floating-ghost aj-gw';
      outer.style.cssText = 'left:0;top:0;animation-name:' + g.anim + ';animation-duration:' + g.dur + ';animation-delay:' + g.delay + ';';
      const inner = document.createElement('div');
      inner.className = 'aj-gw';
      inner.style.cssText = 'animation-name:ghostBob;animation-duration:' + g.bobDur + ';';
      inner.innerHTML = ghostSVG(g.size, g.c1, g.c2);
      outer.appendChild(inner);
      document.body.appendChild(outer);
    });
  }

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
  injectFloatingGhosts();

  if (btn) btn.addEventListener('click', nextTheme);

})();
