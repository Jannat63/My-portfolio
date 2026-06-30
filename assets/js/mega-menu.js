/* ═══════════════════════════════════════════════════════════
   MEGA MENU — interaction logic
   Desktop: hover-intent open/close with delay, click toggle,
            outside click + Escape to close, only one panel open.
   Mobile:  accordion expand/collapse inside .mob-menu.
   Photos:  About panel's 2x2 grid reads window.PHOTOS (shared
            with the Memory Library page via gallery-data.js).
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ───────── Desktop mega menu ───────── */
  var hosts = Array.prototype.slice.call(document.querySelectorAll('.mega-host'));
  var openTimer = null, closeTimer = null;

  function closeAll(except) {
    hosts.forEach(function (h) {
      if (h === except) return;
      h.classList.remove('open');
      var t = h.querySelector('.mega-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }

  function openHost(host) {
    closeAll(host);
    host.classList.add('open');
    var t = host.querySelector('.mega-trigger');
    if (t) t.setAttribute('aria-expanded', 'true');
  }

  hosts.forEach(function (host) {
    var trigger = host.querySelector('.mega-trigger');
    if (!trigger) return;
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    host.addEventListener('mouseenter', function () {
      if (window.innerWidth <= 1140) return;
      clearTimeout(closeTimer);
      openTimer = setTimeout(function () { openHost(host); }, 70);
    });
    host.addEventListener('mouseleave', function () {
      if (window.innerWidth <= 1140) return;
      clearTimeout(openTimer);
      closeTimer = setTimeout(function () { host.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); }, 250);
    });
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (host.classList.contains('open')) {
        host.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        openHost(host);
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.mega-host')) closeAll(null);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll(null);
  });
  window.addEventListener('resize', function () { closeAll(null); });
  window.addEventListener('scroll', function () { closeAll(null); }, { passive: true });

  /* ───────── Mobile accordion ───────── */
  var accs = Array.prototype.slice.call(document.querySelectorAll('.mob-acc'));
  accs.forEach(function (acc) {
    var trigger = acc.querySelector('.mob-acc-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', function () {
      var isOpen = acc.classList.contains('open');
      accs.forEach(function (a) { a.classList.remove('open'); });
      if (!isOpen) acc.classList.add('open');
    });
  });

  /* ───────── About panel photo grid ───────── */
  function buildMegaPhotoGrid() {
    var grid = document.querySelector('[data-mega-photo-grid]');
    if (!grid) return;

    var photos = [];
    if (window.PHOTOS) {
      Object.keys(window.PHOTOS).forEach(function (k) {
        photos = photos.concat(window.PHOTOS[k]);
      });
    }
    var slots = photos.slice(-4);
    while (slots.length < 4) slots.push(null);

    grid.innerHTML = slots.map(function (p) {
      if (p) {
        return '<a class="mega-photo-tile" href="' + grid.dataset.galleryHref + '" aria-label="' + (p.title || 'View Memory Library') + '">' +
          '<img src="' + grid.dataset.assetPrefix + p.src + '" alt="' + (p.alt || '') + '" loading="lazy">' +
          '<span class="mega-photo-link"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></span>' +
        '</a>';
      }
      return '<a class="mega-photo-tile" href="' + grid.dataset.galleryHref + '">' +
        '<span class="mega-photo-empty"><i class="fa-solid fa-camera-retro"></i><span>Photos coming soon</span></span>' +
      '</a>';
    }).join('');
  }
  buildMegaPhotoGrid();
})();
