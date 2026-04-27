/* =========================================
   bg-animations.js  v2.0
   Aurora + Gradient Mesh + Particles MIXED
   Portfolio: Ahsan Jannat
   ========================================= */

'use strict';

/* ══════════════════════════════════════════
   CANVAS SETUP
   ══════════════════════════════════════════ */
const canvas = document.createElement('canvas');
canvas.id = 'bgCanvas';
Object.assign(canvas.style, {
  position: 'fixed', top: '0', left: '0',
  width: '100%', height: '100%',
  zIndex: '0', pointerEvents: 'none',
});
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
let W, H;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  initMesh();
}
window.addEventListener('resize', resize);

/* ══════════════════════════════════════════
   SECTION COLOR THEMES
   ══════════════════════════════════════════ */
const themes = {
  home: {
    aurora: ['#f97316','#fb923c','#3b82f6'],
    glowA: 'rgba(249,115,22,', glowB: 'rgba(59,130,246,',
  },
  about: {
    aurora: ['#8b5cf6','#3b82f6','#14b8a6'],
    glowA: 'rgba(139,92,246,', glowB: 'rgba(20,184,166,',
  },
  services: {
    aurora: ['#f97316','#ef4444','#8b5cf6'],
    glowA: 'rgba(249,115,22,', glowB: 'rgba(139,92,246,',
  },
  experience: {
    aurora: ['#14b8a6','#3b82f6','#8b5cf6'],
    glowA: 'rgba(20,184,166,', glowB: 'rgba(59,130,246,',
  },
  projects: {
    aurora: ['#f97316','#3b82f6','#14b8a6'],
    glowA: 'rgba(59,130,246,', glowB: 'rgba(249,115,22,',
  },
  testimonials: {
    aurora: ['#8b5cf6','#f97316','#3b82f6'],
    glowA: 'rgba(139,92,246,', glowB: 'rgba(249,115,22,',
  },
  contact: {
    aurora: ['#f97316','#14b8a6','#3b82f6'],
    glowA: 'rgba(249,115,22,', glowB: 'rgba(20,184,166,',
  },
};

/* ══════════════════════════════════════════
   COLOR UTILITIES
   ══════════════════════════════════════════ */
function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1,3),16),
    parseInt(hex.slice(3,5),16),
    parseInt(hex.slice(5,7),16),
  ];
}
function lerpColor(c1, c2, t) {
  const a = hexToRgb(c1), b = hexToRgb(c2);
  return `rgb(${Math.round(a[0]+(b[0]-a[0])*t)},${Math.round(a[1]+(b[1]-a[1])*t)},${Math.round(a[2]+(b[2]-a[2])*t)})`;
}
function hexToRgbStr(hex) {
  const [r,g,b] = hexToRgb(hex); return `${r},${g},${b}`;
}

/* ══════════════════════════════════════════
   THEME TRANSITION
   ══════════════════════════════════════════ */
let currentTheme    = { ...themes.home };
let fromTheme       = themes.home;
let toTheme         = themes.home;
let targetThemeName = 'home';
let themeProgress   = 1;

function setTheme(name) {
  if (!themes[name] || name === targetThemeName) return;
  fromTheme       = { aurora: [...currentTheme.aurora], glowA: currentTheme.glowA, glowB: currentTheme.glowB };
  toTheme         = themes[name];
  targetThemeName = name;
  themeProgress   = 0;
}

/* ══════════════════════════════════════════
   GRADIENT MESH  — slow liquid warp
   ══════════════════════════════════════════ */
let meshPts = [];

function initMesh() {
  meshPts = [];
  for (let r = 0; r <= 4; r++) {
    for (let c = 0; c <= 5; c++) {
      meshPts.push({
        bx: (c / 5) * (typeof W !== 'undefined' ? W : window.innerWidth),
        by: (r / 4) * (typeof H !== 'undefined' ? H : window.innerHeight),
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.3,
        amp:   40 + Math.random() * 40,
      });
    }
  }
}

function drawMesh(t) {
  const angle = t * 0.1;
  const cx  = W * (0.5 + Math.sin(angle) * 0.3);
  const cy  = H * (0.5 + Math.cos(angle * 0.7) * 0.3);
  const cx2 = W * (0.5 - Math.sin(angle * 0.8) * 0.4);
  const cy2 = H * (0.5 - Math.cos(angle * 0.5) * 0.4);

  const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.95);
  g1.addColorStop(0,   currentTheme.aurora[0] + '1a');
  g1.addColorStop(0.5, currentTheme.aurora[1] + '0d');
  g1.addColorStop(1,   'transparent');
  ctx.fillStyle = g1; ctx.fillRect(0,0,W,H);

  const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, Math.max(W, H) * 0.75);
  g2.addColorStop(0,   currentTheme.aurora[2] + '14');
  g2.addColorStop(0.6, currentTheme.aurora[0] + '08');
  g2.addColorStop(1,   'transparent');
  ctx.fillStyle = g2; ctx.fillRect(0,0,W,H);
}

/* ══════════════════════════════════════════
   AURORA BANDS  — flowing curtains of light
   ══════════════════════════════════════════ */
const BANDS = [
  { yBase:0.12, freq:0.0018, amp:0.13, speed:0.18, width:0.24, ci:0 },
  { yBase:0.28, freq:0.0024, amp:0.11, speed:0.26, width:0.20, ci:1 },
  { yBase:0.20, freq:0.0014, amp:0.15, speed:0.13, width:0.26, ci:2 },
  { yBase:0.42, freq:0.0020, amp:0.10, speed:0.32, width:0.18, ci:0 },
  { yBase:0.56, freq:0.0013, amp:0.12, speed:0.22, width:0.22, ci:1 },
  { yBase:0.70, freq:0.0022, amp:0.09, speed:0.29, width:0.16, ci:2 },
  { yBase:0.82, freq:0.0016, amp:0.11, speed:0.17, width:0.20, ci:0 },
];

function drawAurora(t) {
  BANDS.forEach((band, bi) => {
    const color   = currentTheme.aurora[band.ci];
    const rgb     = hexToRgbStr(color);
    const bandH   = H * band.width;
    const baseY   = H * band.yBase;

    ctx.beginPath();
    for (let x = 0; x <= W; x += 4) {
      const y = baseY
        + Math.sin(x * band.freq + t * band.speed) * H * band.amp
        + Math.sin(x * band.freq * 1.7 + t * band.speed * 0.6 + bi * 0.8) * H * band.amp * 0.35
        + Math.sin(x * band.freq * 0.4 + t * band.speed * 1.4) * H * band.amp * 0.18;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    for (let x = W; x >= 0; x -= 4) {
      const y = baseY + bandH
        + Math.sin(x * band.freq * 1.1 + t * band.speed * 0.8 + 1.2) * H * band.amp * 0.55
        + Math.sin(x * band.freq * 0.6 + t * band.speed * 1.2) * H * band.amp * 0.28;
      ctx.lineTo(x, y);
    }
    ctx.closePath();

    const ag = ctx.createLinearGradient(0, baseY, 0, baseY + bandH);
    ag.addColorStop(0,   `rgba(${rgb},0)`);
    ag.addColorStop(0.25,`rgba(${rgb},0.10)`);
    ag.addColorStop(0.5, `rgba(${rgb},0.18)`);
    ag.addColorStop(0.75,`rgba(${rgb},0.10)`);
    ag.addColorStop(1,   `rgba(${rgb},0)`);
    ctx.fillStyle = ag;
    ctx.fill();

    // Bright spine
    ctx.beginPath();
    for (let x = 0; x <= W; x += 4) {
      const y = baseY + bandH * 0.5
        + Math.sin(x * band.freq + t * band.speed) * H * band.amp * 0.9
        + Math.sin(x * band.freq * 1.7 + t * band.speed * 0.6 + bi * 0.8) * H * band.amp * 0.3;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(${rgb},0.22)`;
    ctx.lineWidth   = 2;
    ctx.stroke();
  });
}

/* ══════════════════════════════════════════
   PARTICLES  — glowing drifting dots
   ══════════════════════════════════════════ */
const MAX_P   = 100;
const parts   = [];

function spawnPart() {
  const col = hexToRgb(currentTheme.aurora[Math.floor(Math.random() * 3)]);
  parts.push({
    x:  Math.random() * W,
    y:  H + 10,
    r:  Math.random() * 2.0 + 0.5,
    vy: -(Math.random() * 0.55 + 0.2),
    vx: (Math.random() - 0.5) * 0.25,
    op: Math.random() * 0.65 + 0.35,
    ph: Math.random() * Math.PI * 2,
    col,
    life: 0,
    maxLife: 320 + Math.random() * 380,
  });
}

for (let i = 0; i < MAX_P; i++) {
  spawnPart();
  parts[i].y    = Math.random() * H;
  parts[i].life = Math.random() * parts[i].maxLife;
}

function drawParticles(t) {
  if (parts.length < MAX_P && Math.random() < 0.5) spawnPart();

  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i];
    p.x += p.vx + Math.sin(t * 0.45 + p.ph) * 0.12;
    p.y += p.vy;
    p.life++;
    p.ph += 0.018;

    if (p.life >= p.maxLife || p.y < -20) { parts.splice(i,1); continue; }

    const lr   = p.life / p.maxLife;
    const fade = lr < 0.12 ? lr * 8.3 : lr > 0.78 ? (1 - lr) * 4.5 : 1;
    const glow = Math.sin(p.ph) * 0.28 + 0.72;
    const [r,g,b] = p.col;

    // Soft glow halo
    const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
    pg.addColorStop(0, `rgba(${r},${g},${b},${0.18 * fade * glow})`);
    pg.addColorStop(1, 'transparent');
    ctx.fillStyle = pg;
    ctx.fillRect(p.x - p.r * 6, p.y - p.r * 6, p.r * 12, p.r * 12);

    // Core
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * glow, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${p.op * fade})`;
    ctx.fill();
  }
}

/* ══════════════════════════════════════════
   AMBIENT CORNER GLOWS
   ══════════════════════════════════════════ */
function drawAmbient(t) {
  const pulse = Math.sin(t * 0.28) * 0.03;

  const g1 = ctx.createRadialGradient(W, 0, 0, W, 0, W * 0.55);
  g1.addColorStop(0, currentTheme.glowA + (0.14 + pulse) + ')');
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1; ctx.fillRect(0,0,W,H);

  const g2 = ctx.createRadialGradient(0, H, 0, 0, H, W * 0.48);
  g2.addColorStop(0, currentTheme.glowB + (0.11 + pulse) + ')');
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2; ctx.fillRect(0,0,W,H);

  const g3 = ctx.createRadialGradient(W*0.5, H*0.5, 0, W*0.5, H*0.5, W*0.38);
  g3.addColorStop(0, currentTheme.glowA + (0.04 + Math.sin(t*0.4)*0.02) + ')');
  g3.addColorStop(1, 'transparent');
  ctx.fillStyle = g3; ctx.fillRect(0,0,W,H);
}

/* ══════════════════════════════════════════
   SECTION OBSERVER
   ══════════════════════════════════════════ */
['home','about','services','experience','projects','testimonials','contact'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) setTheme(id);
  }, { threshold: 0.25 }).observe(el);
});

/* ══════════════════════════════════════════
   RENDER LOOP
   ══════════════════════════════════════════ */
const startTime = Date.now();

function render() {
  const t = (Date.now() - startTime) * 0.001;

  // Ease theme transition
  if (themeProgress < 1) {
    themeProgress = Math.min(1, themeProgress + 0.011);
    const p = themeProgress < 0.5
      ? 2 * themeProgress * themeProgress
      : 1 - Math.pow(-2 * themeProgress + 2, 2) / 2;
    currentTheme = {
      aurora: fromTheme.aurora.map((c, i) => lerpColor(c, toTheme.aurora[i], p)),
      glowA:  p < 0.5 ? fromTheme.glowA : toTheme.glowA,
      glowB:  p < 0.5 ? fromTheme.glowB : toTheme.glowB,
    };
  }

  ctx.clearRect(0, 0, W, H);

  drawMesh(t);       // Layer 1 — deep liquid gradient mesh
  drawAmbient(t);    // Layer 2 — corner & center ambient glows
  drawAurora(t);     // Layer 3 — aurora bands (main wow effect)
  drawParticles(t);  // Layer 4 — floating glowing particles

  requestAnimationFrame(render);
}

resize();
render();
