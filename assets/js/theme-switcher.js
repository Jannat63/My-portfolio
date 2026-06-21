/*!
 * AHSAN JANNAT — DESIGN THEME SWITCHER
 * Swaps a single stylesheet href to apply one of 5 full visual themes.
 * Selection is made from an accessible dropdown menu and persisted in
 * localStorage so it carries across every page on the site.
 */
(function () {
  'use strict';

  const ROOT = window.location.pathname.includes('/blog/') ? '../' : '';
  const STORAGE_KEY = 'aj-style';

  const THEMES = [
    { id: 'sage',          label: 'Default',           desc: 'Sage editorial — the original look', file: 'theme-sage.css' },
    { id: 'glass',         label: 'Glassmorphism',     desc: 'Frosted glass, soft light & blur',   file: 'theme-glassmorphism.css' },
    { id: 'neumorphism',   label: 'Neumorphism',       desc: 'Soft extruded UI, subtle shadows',   file: 'theme-neumorphism.css' },
    { id: 'claymorphism',  label: 'Claymorphism',      desc: 'Puffy 3D clay, bright & playful',     file: 'theme-claymorphism.css' },
    { id: 'skeuomorphism', label: 'Modern Skeuomorphism', desc: 'Tactile realism, soft materials',  file: 'theme-skeuomorphism.css' }
  ];

  const link    = document.getElementById('themeStyleLink');
  const btn     = document.getElementById('styleBtn');
  const htmlEl  = document.documentElement;
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

    // Hide the light/dark toggle for themes with one fixed mood —
    // only the Default theme supports manual day/night switching.
    if (themeBtn) {
      themeBtn.style.display = (theme.id === 'sage') ? '' : 'none';
    }

    syncMenuState(theme.id);
    if (announce) showToast(theme.label);
  }

  /* ── Dropdown menu ────────────────────────────────────────────── */
  let panel = null;
  let items = [];

  function buildPanel() {
    if (panel) return panel;

    panel = document.createElement('div');
    panel.id = 'aj-theme-panel';
    panel.setAttribute('role', 'menu');
    panel.setAttribute('aria-label', 'Choose a portfolio theme');

    const heading = document.createElement('div');
    heading.className = 'aj-theme-panel-head';
    heading.textContent = '🎨 Themes';
    panel.appendChild(heading);

    THEMES.forEach((theme) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'aj-theme-item';
      item.setAttribute('role', 'menuitemradio');
      item.setAttribute('aria-checked', 'false');
      item.dataset.themeId = theme.id;
      item.tabIndex = -1;

      const dot = document.createElement('span');
      dot.className = 'aj-theme-item-check';
      dot.setAttribute('aria-hidden', 'true');

      const text = document.createElement('span');
      text.className = 'aj-theme-item-text';
      const titleEl = document.createElement('span');
      titleEl.className = 'aj-theme-item-title';
      titleEl.textContent = theme.label;
      const descEl = document.createElement('span');
      descEl.className = 'aj-theme-item-desc';
      descEl.textContent = theme.desc;
      text.appendChild(titleEl);
      text.appendChild(descEl);

      item.appendChild(dot);
      item.appendChild(text);

      item.addEventListener('click', () => {
        applyTheme(theme.id, true);
        closePanel();
        if (btn) btn.focus();
      });

      panel.appendChild(item);
      items.push(item);
    });

    panel.addEventListener('keydown', onPanelKeydown);
    document.body.appendChild(panel);
    return panel;
  }

  function syncMenuState(activeId) {
    items.forEach((item) => {
      const isActive = item.dataset.themeId === activeId;
      item.setAttribute('aria-checked', isActive ? 'true' : 'false');
      item.classList.toggle('is-active', isActive);
      item.tabIndex = isActive ? 0 : -1;
    });
  }

  function positionPanel() {
    if (!btn || !panel) return;
    const r = btn.getBoundingClientRect();
    const panelWidth = 260;
    let left = r.right - panelWidth;
    left = Math.max(12, Math.min(left, window.innerWidth - panelWidth - 12));
    panel.style.top = (r.bottom + 10) + 'px';
    panel.style.left = left + 'px';
  }

  function openPanel() {
    buildPanel();
    positionPanel();
    panel.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    document.addEventListener('click', onDocClick, true);
    document.addEventListener('keydown', onDocKeydown, true);
    window.addEventListener('resize', positionPanel);
    const active = items.find(i => i.classList.contains('is-active')) || items[0];
    window.setTimeout(() => active && active.focus(), 30);
  }

  function closePanel() {
    if (!panel) return;
    panel.classList.remove('is-open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', onDocClick, true);
    document.removeEventListener('keydown', onDocKeydown, true);
    window.removeEventListener('resize', positionPanel);
  }

  function isOpen() { return !!(panel && panel.classList.contains('is-open')); }

  function togglePanel() { isOpen() ? closePanel() : openPanel(); }

  function onDocClick(e) {
    if (panel && (panel.contains(e.target) || e.target === btn || btn.contains(e.target))) return;
    closePanel();
  }

  function onDocKeydown(e) {
    if (e.key === 'Escape') {
      closePanel();
      if (btn) btn.focus();
    }
  }

  function onPanelKeydown(e) {
    const focusable = items;
    const idx = focusable.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusable[(idx + 1 + focusable.length) % focusable.length].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusable[(idx - 1 + focusable.length) % focusable.length].focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusable[0].focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      focusable[focusable.length - 1].focus();
    } else if (e.key === 'Tab') {
      // Keep focus inside the menu while it's open.
      e.preventDefault();
      const dir = e.shiftKey ? -1 : 1;
      focusable[(idx + dir + focusable.length) % focusable.length].focus();
    }
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
    }, 1600);
  }

  /* ── Wire up ──────────────────────────────────────────────────── */
  if (btn) {
    btn.setAttribute('aria-haspopup', 'menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePanel();
    });
  }

  // Apply saved theme on load (no toast on initial load).
  const saved = localStorage.getItem(STORAGE_KEY) || 'sage';
  buildPanel();
  applyTheme(saved, false);

})();
