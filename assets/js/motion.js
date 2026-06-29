/*!
 * AHSAN JANNAT — PREMIUM MOTION SYSTEM v4.0
 * Philosophy: one direction, one speed, no rotation, no drama.
 * Every animation serves clarity — nothing performs for its own sake.
 */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ─────────────────────────────────────────────
     1. CSS — injected once, drives everything
  ───────────────────────────────────────────── */
  const css = document.createElement('style');
  css.textContent = `

    /* ── Page transition ── */
    body { transition: opacity .18s ease; }
    body.aj-fade { opacity: 0; }

    /* ── Scroll entrance — ONE animation for all elements ──
       Fade up 14px. Clean. Consistent. Done.              */
    [data-m] {
      opacity: 0;
      transform: translateY(14px);
      transition: none;
    }
    [data-m].on {
      opacity: 1;
      transform: translateY(0);
      transition:
        opacity  .48s cubic-bezier(.25, .46, .45, .94),
        transform .48s cubic-bezier(.25, .46, .45, .94);
    }

    /* ── Tag labels ── */
    .tag-label { opacity: 0; transform: translateX(-10px); transition: none; }
    .tag-label.on { opacity: 1; transform: translateX(0); transition: opacity .4s ease, transform .4s ease; }

    /* ── Blog paragraph reveals ── */
    .para-hidden {
      opacity: 0; transform: translateY(10px);
      transition: opacity .4s ease, transform .4s ease;
    }
    .para-hidden.para-on { opacity: 1; transform: translateY(0); }

    /* ── Hero headline — staggered fade up per word ── */
    .w-reveal {
      display: inline-block;
      opacity: 0; transform: translateY(10px);
      animation: wrev .5s cubic-bezier(.25,.46,.45,.94) forwards;
    }
    @keyframes wrev {
      to { opacity: 1; transform: translateY(0); }
    }

    /* ── Card hover — lift only, no tilt ── */
    .svc-card, .case-card, .testi-card, .proj-card,
    .tool-card, .blog-card, .post-card, .callout,
    .why-card, .tool-badge, .cert-card, .achieve-card {
      transition:
        transform .24s cubic-bezier(.25,.46,.45,.94),
        box-shadow .24s cubic-bezier(.25,.46,.45,.94),
        border-color .24s ease;
    }
    .svc-card:hover, .case-card:hover, .testi-card:hover,
    .proj-card:hover, .tool-card:hover, .blog-card:hover,
    .post-card:hover, .callout:hover, .why-card:hover,
    .tool-badge:hover, .cert-card:hover, .achieve-card:hover {
      transform: translateY(-4px);
    }

    /* ── Portrait hover — very subtle lift ── */
    .portrait-wrap, .hero-split-portrait {
      transition: transform .3s cubic-bezier(.25,.46,.45,.94);
    }
    .portrait-wrap:hover, .hero-split-portrait:hover {
      transform: translateY(-4px) scale(1.01);
    }

    /* ── Button — subtle shine sweep on hover ── */
    .btn {
      position: relative; overflow: hidden;
      transition: transform .18s ease, box-shadow .18s ease;
    }
    .btn::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.14) 50%, transparent 60%);
      transform: translateX(-100%);
      transition: transform .5s cubic-bezier(.25,.46,.45,.94);
      pointer-events: none;
    }
    .btn:hover::after { transform: translateX(100%); }
    .btn:hover { transform: translateY(-2px); }
    .btn:active { transform: translateY(0) scale(.98); }

    /* ── Logo box — simple scale, no flip ── */
    .n-box, .logo-box-f {
      transition: transform .22s ease, background .22s ease;
    }
    .n-box:hover, .logo-box-f:hover {
      transform: scale(1.08);
    }

    /* ── Timeline dot pulse ── */
    .tl-dot { animation: tlp 2.4s ease-in-out infinite; }
    @keyframes tlp {
      0%, 100% { box-shadow: 0 0 0 0 rgba(107,140,110,.4); }
      50%       { box-shadow: 0 0 0 7px rgba(107,140,110,0); }
    }

    /* ── Sparkline draw ── */
    .sparkline polyline {
      stroke-dasharray: 300;
      stroke-dashoffset: 300;
      transition: stroke-dashoffset 1.4s cubic-bezier(.25,.46,.45,.94);
    }
    .sparkline polyline.drawn { stroke-dashoffset: 0; }

    /* ── Reading progress bar ── */
    #aj-read-bar {
      position: fixed; top: 0; left: 0; height: 2px;
      z-index: 99998;
      background: linear-gradient(90deg, var(--sage), var(--blush));
      width: 0; transition: width .1s linear;
    }

    /* ── Navbar glass ── */
    #navbar.glass {
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
    }

    /* ── Loader exit ── */
    #loader {
      transition: opacity .45s ease, visibility .45s ease !important;
    }
    #loader.done {
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none;
    }

    /* ── Mobile nav — simple fade + slide ── */
    .mob-menu a, .mob-menu .btn {
      opacity: 0;
      transform: translateY(8px);
      transition: opacity .3s ease, transform .3s ease;
    }
    .mob-menu.open a, .mob-menu.active a,
    .mob-menu.open .btn, .mob-menu.active .btn {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── Reduced motion override ── */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: .01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: .01ms !important;
      }
      [data-m], .tag-label, .w-reveal, .para-hidden {
        opacity: 1 !important;
        transform: none !important;
        animation: none !important;
      }
    }
  `;
  document.head.appendChild(css);

  /* ─────────────────────────────────────────────
     2. Skip all motion if user prefers reduced
  ───────────────────────────────────────────── */
  if (reduceMotion) {
    document.querySelectorAll('[data-m], .tag-label, .para-hidden').forEach(el => {
      el.classList.add('on', 'para-on');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    document.querySelectorAll('.count[data-target]').forEach(el => {
      el.textContent = el.dataset.target;
    });
    return;
  }

  /* ─────────────────────────────────────────────
     3. Page fade transition — internal links only
  ───────────────────────────────────────────── */
  let navigating = false;

  function triggerFade(dest) {
    if (navigating) return;
    navigating = true;
    document.body.classList.add('aj-fade');
    sessionStorage.setItem('aj-nav', '1');
    setTimeout(() => { window.location.href = dest; }, 160);
  }

  document.querySelectorAll('a[href]').forEach(link => {
    const h = link.getAttribute('href') || '';
    if (!h || h.startsWith('#') || h.startsWith('mailto:') ||
        h.startsWith('tel:') || h.startsWith('http') ||
        link.hasAttribute('download') || link.target === '_blank') return;
    link.addEventListener('click', e => { e.preventDefault(); triggerFade(h); });
  });

  if (sessionStorage.getItem('aj-nav')) {
    sessionStorage.removeItem('aj-nav');
    document.body.style.transition = 'none';
    document.body.classList.add('aj-fade');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.body.style.removeProperty('transition');
      document.body.classList.remove('aj-fade');
    }));
    const ldr = document.getElementById('loader');
    if (ldr) ldr.style.cssText = 'opacity:0!important;visibility:hidden!important;';
  }

  window.addEventListener('pageshow', () => {
    navigating = false;
    document.body.classList.remove('aj-fade');
  });

  /* ─────────────────────────────────────────────
     4. Scroll entrance — IntersectionObserver
     Single animation: fade + translateY(14px) → 0
     Grid children stagger at 60ms intervals
  ───────────────────────────────────────────── */
  // Convert old data-reveal attributes
  document.querySelectorAll('[data-reveal]').forEach(el => {
    el.setAttribute('data-m', el.getAttribute('data-reveal'));
    el.removeAttribute('data-reveal');
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const delay = parseFloat(el.style.transitionDelay) || 0;
      el.style.transitionDelay = delay + 's';
      el.classList.add('on');
      io.unobserve(el);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-m]').forEach(el => io.observe(el));

  // Auto-stagger grid children
  const GRIDS = [
    '.svc-grid', '.cases-grid', '.testi-grid', '.proj-grid',
    '.tools-grid', '.blog-grid', '.blog-posts-grid', '.post-grid',
    '.certs-grid', '.why-grid', '.tool-badge-grid'
  ].join(',');

  document.querySelectorAll(GRIDS).forEach(parent => {
    Array.from(parent.children).forEach((child, i) => {
      if (!child.hasAttribute('data-m')) {
        child.setAttribute('data-m', 'up');
        child.style.transitionDelay = (i * 0.06) + 's';
        io.observe(child);
      }
    });
  });

  /* ─────────────────────────────────────────────
     5. Hero headline — staggered word fade-up
     Subtle: only 10px shift, 500ms, no 3D
  ───────────────────────────────────────────── */
  const h1 = document.querySelector('.hero-h1');
  if (h1) {
    const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) {
      let skip = false, p = node.parentNode;
      while (p && p !== h1) {
        if (p.id === 'typedText' || p.id === 'cursor') { skip = true; break; }
        p = p.parentNode;
      }
      if (!skip) textNodes.push(node);
    }
    let wi = 0;
    textNodes.forEach(tn => {
      const words = tn.textContent.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      words.forEach(w => {
        if (!w.trim()) { frag.appendChild(document.createTextNode(w)); return; }
        const sp = document.createElement('span');
        sp.className = 'w-reveal';
        sp.textContent = w;
        sp.style.animationDelay = (wi++ * 0.055) + 's';
        frag.appendChild(sp);
      });
      tn.parentNode.replaceChild(frag, tn);
    });
  }

  /* ─────────────────────────────────────────────
     6. Tag labels
  ───────────────────────────────────────────── */
  const tagIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('on');
      tagIO.unobserve(en.target);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.tag-label').forEach(el => tagIO.observe(el));

  /* ─────────────────────────────────────────────
     7. Stat counters — clean ease-out, no 3D
  ───────────────────────────────────────────── */
  const cntIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = +el.dataset.target;
      const dur = 1400;
      const t0 = performance.now();
      (function tick(now) {
        const p    = Math.min((now - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);   // cubic ease-out
        el.textContent = Math.round(ease * target);
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
      cntIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.count[data-target]').forEach(el => cntIO.observe(el));

  /* ─────────────────────────────────────────────
     8. Sparkline draw
  ───────────────────────────────────────────── */
  const spIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('drawn');
      spIO.unobserve(en.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.sparkline polyline').forEach(el => {
    el.style.strokeDasharray = 300;
    el.style.strokeDashoffset = 300;
    spIO.observe(el);
  });

  /* ─────────────────────────────────────────────
     9. Navbar glass on scroll
  ───────────────────────────────────────────── */
  const nav = document.getElementById('navbar');
  if (nav) {
    const handleScroll = () => nav.classList.toggle('glass', window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ─────────────────────────────────────────────
     10. Blob parallax — very subtle (3-5% of scroll)
  ───────────────────────────────────────────── */
  const blobs = [
    { el: document.querySelector('.hero-blob-1'), f: 0.05 },
    { el: document.querySelector('.hero-blob-2'), f: -0.035 },
    { el: document.querySelector('.dot-pattern'), f: 0.025 },
  ].filter(b => b.el);

  if (blobs.length) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      blobs.forEach(b => { b.el.style.transform = 'translateY(' + (y * b.f) + 'px)'; });
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────
     11. Blog paragraph reveals
  ───────────────────────────────────────────── */
  const pb = document.querySelector('.post-body, .blog-post-body, article .content');
  if (pb) {
    const pIO = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('para-on');
        pIO.unobserve(en.target);
      });
    }, { threshold: 0.12 });
    pb.querySelectorAll('p, h2, h3, h4, ul, ol, blockquote, .callout').forEach((el, i) => {
      el.classList.add('para-hidden');
      el.style.transitionDelay = (i * 0.03) + 's';
      pIO.observe(el);
    });
  }

  /* ─────────────────────────────────────────────
     12. Reading progress bar (blog only)
  ───────────────────────────────────────────── */
  if (document.querySelector('.post-body, .blog-post-body, article')) {
    const bar = document.createElement('div');
    bar.id = 'aj-read-bar';
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
      const s = document.documentElement;
      bar.style.width = (s.scrollTop / (s.scrollHeight - s.clientHeight) * 100) + '%';
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────
     13. Mobile nav — staggered fade per link
  ───────────────────────────────────────────── */
  const mobNav = document.querySelector('nav.mob-menu, #mob-nav, .mob-nav');
  if (mobNav) {
    const links = Array.from(mobNav.querySelectorAll('a, .btn'));
    links.forEach((el, i) => { el.style.transitionDelay = (i * 0.04) + 's'; });

    new MutationObserver(() => {
      const isOpen = mobNav.classList.contains('open') ||
                     mobNav.classList.contains('active') ||
                     getComputedStyle(mobNav).display !== 'none';
      links.forEach(el => {
        if (!isOpen) { el.style.opacity = '0'; el.style.transform = 'translateY(8px)'; }
      });
    }).observe(mobNav, { attributes: true, attributeFilter: ['class', 'style'] });
  }

  /* ─────────────────────────────────────────────
     14. Loader exit
  ───────────────────────────────────────────── */
  const loader = document.getElementById('loader');
  if (loader) {
    new MutationObserver(() => {
      if (loader.classList.contains('done')) {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
      }
    }).observe(loader, { attributes: true, attributeFilter: ['class'] });
  }

})();
