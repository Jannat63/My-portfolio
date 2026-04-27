/* =========================================
   bg-animations.js  v1.0
   Per-section canvas background effects
   Portfolio: Ahsan Jannat
   ========================================= */

'use strict';

/* ── Global canvas setup ── */
const canvas = document.createElement('canvas');
canvas.id = 'bgCanvas';
canvas.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 1;
`;
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
let W, H;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

/* ── Color palette ── */
const ORANGE = 'rgba(249,115,22,';
const BLUE   = 'rgba(59,130,246,';
const PURPLE = 'rgba(139,92,246,';
const TEAL   = 'rgba(20,184,166,';
const WHITE  = 'rgba(255,255,255,';

/* ── Section tracking ── */
const sectionIds = ['home','about','services','experience','projects','testimonials','contact'];
let currentSection = 'home';
let targetSection  = 'home';
let transitionProgress = 1;
let transitionSpeed = 0.018;

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
      const id = entry.target.id;
      if (id !== currentSection) {
        targetSection = id;
        transitionProgress = 0;
        initSection(id);
      }
    }
  });
}, { threshold: 0.3 });

sectionIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

/* ══════════════════════════════════════
   SECTION RENDERERS
   ══════════════════════════════════════ */

/* ─── HOME: Floating constellation particles ─── */
const homeParticles = [];
(function initHome() {
  for (let i = 0; i < 120; i++) {
    homeParticles.push({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      r: Math.random() * 1.8 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    });
  }
})();

function drawHome(alpha) {
  const t = Date.now() * 0.001;

  const gr1 = ctx.createRadialGradient(W * 0.78, H * 0.2, 0, W * 0.78, H * 0.2, W * 0.45);
  gr1.addColorStop(0, ORANGE + (0.1 * alpha) + ')');
  gr1.addColorStop(1, 'transparent');
  ctx.fillStyle = gr1;
  ctx.fillRect(0, 0, W, H);

  const gr2 = ctx.createRadialGradient(W * 0.15, H * 0.85, 0, W * 0.15, H * 0.85, W * 0.35);
  gr2.addColorStop(0, BLUE + (0.07 * alpha) + ')');
  gr2.addColorStop(1, 'transparent');
  ctx.fillStyle = gr2;
  ctx.fillRect(0, 0, W, H);

  homeParticles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    p.pulse += 0.02;
    const pulse = Math.sin(p.pulse) * 0.3 + 0.7;

    ctx.beginPath();
    ctx.arc(p.x * (W / 1920), p.y * (H / 1080), p.r * pulse, 0, Math.PI * 2);
    ctx.fillStyle = WHITE + (p.opacity * alpha * pulse) + ')';
    ctx.fill();
  });

  const scaledParticles = homeParticles.map(p => ({ x: p.x * (W / 1920), y: p.y * (H / 1080), opacity: p.opacity }));
  for (let i = 0; i < scaledParticles.length; i++) {
    for (let j = i + 1; j < scaledParticles.length; j++) {
      const dx = scaledParticles[i].x - scaledParticles[j].x;
      const dy = scaledParticles[i].y - scaledParticles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(scaledParticles[i].x, scaledParticles[i].y);
        ctx.lineTo(scaledParticles[j].x, scaledParticles[j].y);
        ctx.strokeStyle = WHITE + ((1 - dist / 100) * 0.08 * alpha) + ')';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  const rx = W * 0.65 + Math.sin(t * 0.3) * 20;
  const ry = H * 0.45 + Math.cos(t * 0.2) * 15;
  ctx.beginPath();
  ctx.arc(rx, ry, W * 0.28, 0, Math.PI * 2);
  ctx.strokeStyle = ORANGE + (0.06 * alpha) + ')';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(rx, ry, W * 0.22, 0, Math.PI * 2);
  ctx.strokeStyle = BLUE + (0.04 * alpha) + ')';
  ctx.lineWidth = 0.5;
  ctx.stroke();
}

/* ─── ABOUT: Flowing wave ribbons ─── */
function drawAbout(alpha) {
  const t = Date.now() * 0.0008;

  const gr = ctx.createRadialGradient(W * 0.1, H * 0.5, 0, W * 0.1, H * 0.5, W * 0.5);
  gr.addColorStop(0, PURPLE + (0.09 * alpha) + ')');
  gr.addColorStop(1, 'transparent');
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, W, H);

  const waves = [
    { color: ORANGE, opacity: 0.04, freq: 0.003, amp: 60, speed: 0.6, yBase: 0.25 },
    { color: BLUE,   opacity: 0.05, freq: 0.004, amp: 50, speed: 0.9, yBase: 0.45 },
    { color: PURPLE, opacity: 0.04, freq: 0.002, amp: 70, speed: 0.5, yBase: 0.65 },
    { color: TEAL,   opacity: 0.03, freq: 0.005, amp: 40, speed: 1.1, yBase: 0.80 },
  ];

  waves.forEach(w => {
    ctx.beginPath();
    ctx.moveTo(0, H * w.yBase);
    for (let x = 0; x <= W; x += 4) {
      const y = H * w.yBase + Math.sin(x * w.freq + t * w.speed) * w.amp
                             + Math.sin(x * w.freq * 0.5 + t * w.speed * 0.7) * (w.amp * 0.4);
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = w.color + (w.opacity * alpha) + ')';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  for (let i = 0; i < 5; i++) {
    const ox = W * (0.1 + i * 0.2) + Math.sin(t * 0.4 + i) * 30;
    const oy = H * 0.5 + Math.cos(t * 0.3 + i * 1.2) * 80;
    const og = ctx.createRadialGradient(ox, oy, 0, ox, oy, 80 + i * 20);
    og.addColorStop(0, (i % 2 === 0 ? BLUE : ORANGE) + (0.06 * alpha) + ')');
    og.addColorStop(1, 'transparent');
    ctx.fillStyle = og;
    ctx.fillRect(0, 0, W, H);
  }
}

/* ─── SERVICES: Animated geometric grid ─── */
function drawServices(alpha) {
  const t = Date.now() * 0.001;

  const gr = ctx.createRadialGradient(W, 0, 0, W, 0, W * 0.6);
  gr.addColorStop(0, ORANGE + (0.08 * alpha) + ')');
  gr.addColorStop(1, 'transparent');
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, W, H);

  const cols = 14, rows = 9;
  const cw = W / cols, ch = H / rows;

  for (let i = 0; i <= cols; i++) {
    const wave = Math.sin(t * 0.8 + i * 0.4) * 8;
    ctx.beginPath();
    ctx.moveTo(i * cw, 0);
    ctx.lineTo(i * cw + wave, H);
    ctx.strokeStyle = WHITE + (0.025 * alpha) + ')';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }
  for (let j = 0; j <= rows; j++) {
    const wave = Math.sin(t * 0.6 + j * 0.5) * 6;
    ctx.beginPath();
    ctx.moveTo(0, j * ch + wave);
    ctx.lineTo(W, j * ch + wave);
    ctx.strokeStyle = WHITE + (0.025 * alpha) + ')';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  for (let i = 1; i < cols; i++) {
    for (let j = 1; j < rows; j++) {
      const pulse = Math.sin(t * 1.2 + i * 0.7 + j * 0.9);
      if (pulse > 0.6) {
        const r = (pulse - 0.6) * 6;
        ctx.beginPath();
        ctx.arc(i * cw, j * ch, r, 0, Math.PI * 2);
        ctx.fillStyle = ORANGE + (0.3 * alpha * (pulse - 0.6) * 2.5) + ')';
        ctx.fill();
      }
    }
  }

  for (let h = 0; h < 4; h++) {
    const hx = W * (0.1 + h * 0.25) + Math.sin(t * 0.3 + h) * 40;
    const hy = H * 0.5 + Math.cos(t * 0.25 + h * 1.5) * 100;
    const size = 40 + h * 15;
    drawHex(hx, hy, size, BLUE + (0.05 * alpha) + ')', BLUE + (0.08 * alpha) + ')');
  }
}

function drawHex(x, y, r, stroke, fill) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const px = x + r * Math.cos(angle);
    const py = y + r * Math.sin(angle);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  ctx.stroke();
}

/* ─── EXPERIENCE: Flowing timeline streams ─── */
function drawExperience(alpha) {
  const t = Date.now() * 0.001;

  const gr = ctx.createRadialGradient(0, H * 0.5, 0, 0, H * 0.5, W * 0.4);
  gr.addColorStop(0, TEAL + (0.07 * alpha) + ')');
  gr.addColorStop(1, 'transparent');
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, W, H);

  const streams = 8;
  for (let s = 0; s < streams; s++) {
    const sx = W * (s / (streams - 1));
    const phase = (s / streams) * Math.PI * 2;

    ctx.beginPath();
    for (let y = 0; y <= H; y += 3) {
      const x = sx + Math.sin(y * 0.008 + t * 0.8 + phase) * 30
                   + Math.sin(y * 0.015 + t * 0.5 + phase * 0.5) * 15;
      y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    const col = s % 3 === 0 ? ORANGE : s % 3 === 1 ? BLUE : TEAL;
    ctx.strokeStyle = col + (0.04 * alpha) + ')';
    ctx.lineWidth = 1;
    ctx.stroke();

    const dotY = ((t * 80 * (0.5 + s * 0.1)) % H);
    const dotX = sx + Math.sin(dotY * 0.008 + t * 0.8 + phase) * 30;
    const dg = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 12);
    dg.addColorStop(0, col + (0.5 * alpha) + ')');
    dg.addColorStop(1, 'transparent');
    ctx.fillStyle = dg;
    ctx.fillRect(dotX - 12, dotY - 12, 24, 24);
  }

  for (let d = 0; d < 5; d++) {
    const progress = ((t * 0.15 + d * 0.2) % 1);
    const x1 = -W * 0.2 + W * 1.4 * progress;
    ctx.beginPath();
    ctx.moveTo(x1, 0);
    ctx.lineTo(x1 - W * 0.1, H);
    ctx.strokeStyle = WHITE + (0.015 * alpha) + ')';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }
}

/* ─── PROJECTS: Floating geometric shapes ─── */
const projectShapes = [];
(function initProjects() {
  for (let i = 0; i < 18; i++) {
    projectShapes.push({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      size: Math.random() * 50 + 20,
      type: Math.floor(Math.random() * 3),
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.01,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.5 ? ORANGE : BLUE,
      opacity: Math.random() * 0.07 + 0.02,
    });
  }
})();

function drawProjects(alpha) {
  const t = Date.now() * 0.001;

  const gr = ctx.createRadialGradient(W * 0.5, H, 0, W * 0.5, H, W * 0.6);
  gr.addColorStop(0, PURPLE + (0.08 * alpha) + ')');
  gr.addColorStop(1, 'transparent');
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, W, H);

  const gr2 = ctx.createRadialGradient(W * 0.9, H * 0.1, 0, W * 0.9, H * 0.1, W * 0.35);
  gr2.addColorStop(0, ORANGE + (0.06 * alpha) + ')');
  gr2.addColorStop(1, 'transparent');
  ctx.fillStyle = gr2;
  ctx.fillRect(0, 0, W, H);

  projectShapes.forEach(s => {
    s.x += s.vx; s.y += s.vy; s.rot += s.rotSpeed;
    if (s.x < -100) s.x = 1920 + 100;
    if (s.x > 1920 + 100) s.x = -100;
    if (s.y < -100) s.y = 1080 + 100;
    if (s.y > 1080 + 100) s.y = -100;

    const sx = s.x * (W / 1920);
    const sy = s.y * (H / 1080);

    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(s.rot);
    ctx.globalAlpha = s.opacity * alpha;

    if (s.type === 0) {
      ctx.beginPath();
      ctx.arc(0, 0, s.size, 0, Math.PI * 2);
      ctx.strokeStyle = s.color + '1)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else if (s.type === 1) {
      ctx.beginPath();
      ctx.moveTo(0, -s.size);
      ctx.lineTo(s.size * 0.866, s.size * 0.5);
      ctx.lineTo(-s.size * 0.866, s.size * 0.5);
      ctx.closePath();
      ctx.strokeStyle = s.color + '1)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size);
      ctx.strokeStyle = s.color + '1)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    ctx.restore();
  });

  const scanY = (t * 60) % H;
  const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
  scanGrad.addColorStop(0, 'transparent');
  scanGrad.addColorStop(0.5, BLUE + (0.03 * alpha) + ')');
  scanGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = scanGrad;
  ctx.fillRect(0, scanY - 60, W, 120);
}

/* ─── CONTACT: Pulsing ripple rings ─── */
const ripples = [];
let lastRipple = 0;

function spawnRipple() {
  ripples.push({
    x: W * (0.3 + Math.random() * 0.4),
    y: H * (0.2 + Math.random() * 0.6),
    r: 0,
    maxR: 180 + Math.random() * 120,
    opacity: 0.15,
    color: Math.random() > 0.5 ? ORANGE : BLUE,
  });
}

function drawContact(alpha) {
  const now = Date.now();
  if (now - lastRipple > 1200) { spawnRipple(); lastRipple = now; }

  const gr = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.5);
  gr.addColorStop(0, ORANGE + (0.06 * alpha) + ')');
  gr.addColorStop(0.5, BLUE + (0.04 * alpha) + ')');
  gr.addColorStop(1, 'transparent');
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, W, H);

  for (let i = ripples.length - 1; i >= 0; i--) {
    const rip = ripples[i];
    rip.r += 1.2;
    rip.opacity = 0.15 * (1 - rip.r / rip.maxR) * alpha;

    if (rip.r >= rip.maxR) { ripples.splice(i, 1); continue; }

    ctx.beginPath();
    ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
    ctx.strokeStyle = rip.color + rip.opacity + ')';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    if (rip.r > 30) {
      ctx.beginPath();
      ctx.arc(rip.x, rip.y, rip.r * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = rip.color + (rip.opacity * 0.5) + ')';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }

  const t = Date.now() * 0.001;
  [[0.1,0.1],[0.9,0.1],[0.1,0.9],[0.9,0.9]].forEach(([cx,cy],idx) => {
    const r = 60 + Math.sin(t * 0.5 + idx) * 10;
    ctx.beginPath();
    ctx.arc(W * cx, H * cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = ORANGE + (0.06 * alpha) + ')';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  });
}

/* ══════════════════════════════════════
   SECTION STATE MANAGER
   ══════════════════════════════════════ */
const sectionRenderers = {
  home:         drawHome,
  about:        drawAbout,
  services:     drawServices,
  experience:   drawExperience,
  projects:     drawProjects,
  testimonials: drawAbout,
  contact:      drawContact,
};

let currentRenderer = drawHome;
let nextRenderer    = null;

function initSection(id) {
  nextRenderer = sectionRenderers[id] || drawHome;
}

/* ══════════════════════════════════════
   MAIN RENDER LOOP
   ══════════════════════════════════════ */
function render() {
  ctx.clearRect(0, 0, W, H);

  if (nextRenderer && transitionProgress < 1) {
    currentRenderer(1 - transitionProgress);
    nextRenderer(transitionProgress);
    transitionProgress = Math.min(1, transitionProgress + transitionSpeed);

    if (transitionProgress >= 1) {
      currentSection  = targetSection;
      currentRenderer = nextRenderer;
      nextRenderer    = null;
    }
  } else {
    currentRenderer(1);
  }

  requestAnimationFrame(render);
}

render();
