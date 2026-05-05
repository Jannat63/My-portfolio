/* ============================================================
   cursor.js — Elastic Stretch Cursor  (Orange Edition)
   Place at: assets/js/cursor.js
   Add ONE line before </body> on every page:
     <script src="./assets/js/cursor.js" defer></script>
   ============================================================ */

(function () {

  /* Skip entirely on touch / mobile devices */
  if (window.matchMedia('(pointer: coarse)').matches) return;

  /* ── Config ─────────────────────────────────────────────── */
  const CFG = {
    dotColor:        '#f97316',
    ringColor:       'rgba(249,115,22,0.45)',
    ringHoverColor:  'rgba(249,115,22,0.90)',
    ringHoverBg:     'rgba(249,115,22,0.09)',
    dotHoverColor:   '#ffffff',
    particleColor:   '#f97316',
    lerp:            0.10,
    stretchAmount:   0.09,
    stretchMax:      1.1,
    squashRatio:     0.45,
    particleLife:    0.028,
    particleSpread:  2.0,
    particleMinSpeed:2,
  };

  /* ── Inject styles ─────────────────────────────────────── */
  const css = document.createElement('style');
  css.textContent = `
    *, *::before, *::after { cursor: none !important; }

    #_ecDot {
      position: fixed;
      width: 9px; height: 9px;
      background: ${CFG.dotColor};
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 999999;
      transition: opacity .3s ease, width .15s ease,
                  height .15s ease, background .15s ease;
    }

    #_ecRing {
      position: fixed;
      width: 46px; height: 46px;
      border: 2px solid ${CFG.ringColor};
      border-radius: 50%;
      pointer-events: none;
      z-index: 999998;
      transition: opacity .3s ease,
                  width .2s ease, height .2s ease,
                  border-color .2s ease, background .2s ease;
    }

    #_ecCanvas {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 999997;
    }

    /* Hover state */
    body.ec-hover #_ecDot {
      width: 13px; height: 13px;
      background: ${CFG.dotHoverColor};
    }
    body.ec-hover #_ecRing {
      width: 68px; height: 68px;
      border-color: ${CFG.ringHoverColor};
      background: ${CFG.ringHoverBg};
    }

    /* Click state */
    body.ec-click #_ecDot  { width: 5px;  height: 5px;  }
    body.ec-click #_ecRing { width: 30px; height: 30px; }

    /* Text / input state */
    body.ec-text #_ecRing {
      width: 2px; height: 36px;
      border-radius: 2px;
      border-color: ${CFG.ringHoverColor};
    }
    body.ec-text #_ecDot { opacity: 0; }
  `;
  document.head.appendChild(css);

  /* ── Create elements ───────────────────────────────────── */
  const dot    = document.createElement('div');
  const ring   = document.createElement('div');
  const canvas = document.createElement('canvas');
  dot.id = '_ecDot';  ring.id = '_ecRing';  canvas.id = '_ecCanvas';
  dot.style.opacity = ring.style.opacity = '0';
  document.body.append(canvas, ring, dot);

  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  /* ── State ─────────────────────────────────────────────── */
  let mx = -200, my = -200;
  let rx = -200, ry = -200;
  let prevMx = -200, prevMy = -200;
  let visible = false;
  let particles = [];

  /* ── Mouse tracking ────────────────────────────────────── */
  document.addEventListener('mousemove', e => {
    prevMx = mx; prevMy = my;
    mx = e.clientX;
    my = e.clientY;

    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';

    if (!visible) {
      dot.style.opacity = ring.style.opacity = '1';
      visible = true;
    }

    const speed = Math.hypot(mx - prevMx, my - prevMy);
    if (speed > CFG.particleMinSpeed) {
      const count = Math.min(Math.floor(speed / 4), 3);
      for (let i = 0; i < count; i++) {
        particles.push({
          x:    mx,
          y:    my,
          vx:   (mx - prevMx) * 0.12 + (Math.random() - 0.5) * CFG.particleSpread,
          vy:   (my - prevMy) * 0.12 + (Math.random() - 0.5) * CFG.particleSpread,
          life: 1,
          size: Math.random() * 3 + 1.5,
        });
      }
    }
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = ring.style.opacity = '0';
    visible = false;
  });
  document.addEventListener('mouseenter', () => {
    if (visible) dot.style.opacity = ring.style.opacity = '1';
  });

  /* ── Click feedback ─────────────────────────────────────── */
  document.addEventListener('mousedown', () => document.body.classList.add('ec-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('ec-click'));

  /* ── Hover detection ───────────────────────────────────── */
  const HOVER_SEL = [
    'a', 'button', '[role="button"]',
    '.btn', '.filter-btn', '.project-live-btn',
    '.nav-link', '.nav-logo', '.hamburger',
    '.service-card', '.project-card', '.project-thumb',
    '.testimonial-card', '.whatsapp-float',
    '.social-icons a', '.contact-socials a',
    'select', 'label', '.footer-links a',
  ].join(',');

  const TEXT_SEL = 'input, textarea';

  document.addEventListener('mouseover', e => {
    const t = e.target;
    if (t.matches(TEXT_SEL) || t.closest(TEXT_SEL)) {
      document.body.classList.add('ec-text');
      document.body.classList.remove('ec-hover');
    } else if (t.matches(HOVER_SEL) || t.closest(HOVER_SEL)) {
      document.body.classList.add('ec-hover');
      document.body.classList.remove('ec-text');
    }
  });

  document.addEventListener('mouseout', e => {
    const t = e.target;
    if (t.matches(HOVER_SEL) || t.closest(HOVER_SEL))
      document.body.classList.remove('ec-hover');
    if (t.matches(TEXT_SEL) || t.closest(TEXT_SEL))
      document.body.classList.remove('ec-text');
  });

  /* ── Animation loop ────────────────────────────────────── */
  function loop() {

    rx += (mx - rx) * CFG.lerp;
    ry += (my - ry) * CFG.lerp;

    const dvx    = mx - prevMx;
    const dvy    = my - prevMy;
    const speed  = Math.hypot(dvx, dvy);
    const angle  = Math.atan2(dvy, dvx);
    const deg    = angle * (180 / Math.PI);

    const stretch = Math.min(speed * CFG.stretchAmount, CFG.stretchMax);
    const scaleX  = 1 + stretch;
    const scaleY  = Math.max(1 - stretch * CFG.squashRatio, 0.4);

    ring.style.left      = rx + 'px';
    ring.style.top       = ry + 'px';
    ring.style.transform =
      `translate(-50%,-50%) rotate(${deg}deg) scaleX(${scaleX}) scaleY(${scaleY})`;

    /* Particle trail */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => {
      p.x    += p.vx;
      p.y    += p.vy;
      p.vx   *= 0.92;
      p.vy   *= 0.92;
      p.life -= CFG.particleLife;
      if (p.life <= 0) return false;

      const alpha = Math.floor(p.life * 170).toString(16).padStart(2, '0');
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fillStyle = CFG.particleColor + alpha;
      ctx.fill();
      return true;
    });

    requestAnimationFrame(loop);
  }

  loop();

})();
