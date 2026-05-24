/*!
 * AHSAN JANNAT — UNIVERSAL 3D MOTION SYSTEM v2
 * One file. Every page. Auto-detects root path.
 * Place in: assets/js/motion.js
 * Add to every page: <script src="assets/js/motion.js"></script>
 *                or: <script src="../assets/js/motion.js"></script> (blog posts)
 */
(function () {
  'use strict';

  /* ══════════════════════════════════════
     ROOT PATH AUTO-DETECT
     Works from root pages AND /blog/ subfolder
  ══════════════════════════════════════ */
  const isSubfolder = window.location.pathname.split('/').filter(Boolean).length > 1 &&
                      !window.location.pathname.endsWith('.html') === false &&
                      window.location.pathname.includes('/blog/');
  const ROOT = isSubfolder ? '../' : '';

  /* ══════════════════════════════════════
     INJECT STYLES
  ══════════════════════════════════════ */
  const css = document.createElement('style');
  css.textContent = `
    /* Cursor */
    *, *::before, *::after { cursor: none !important; }
    #aj-cur { position:fixed;top:0;left:0;z-index:99999;pointer-events:none; }
    #aj-cur .cd {
      position:absolute;width:8px;height:8px;background:#6B8C6E;
      border-radius:50%;transform:translate(-50%,-50%);
      transition:width .2s,height .2s,background .2s;
    }
    #aj-cur .cr {
      position:absolute;width:34px;height:34px;
      border:1.5px solid rgba(107,140,110,.55);border-radius:50%;
      transform:translate(-50%,-50%);
      transition:width .35s cubic-bezier(.25,.46,.45,.94),
                 height .35s cubic-bezier(.25,.46,.45,.94),
                 border-color .35s;
    }
    body.ch #aj-cur .cd { width:14px;height:14px;background:#C9A0AC; }
    body.ch #aj-cur .cr { width:50px;height:50px;border-color:rgba(201,160,172,.7); }
    body.cd #aj-cur .cr { width:20px;height:20px; }

    /* Page transition wipe */
    /* ── Blur Dissolve Sci-Fi Transition ── */
    #aj-wipe {
      position: fixed; inset: 0; z-index: 2147483647;
      pointer-events: none;
      display: flex; align-items: center; justify-content: center;
    }

    /* Frosted glass overlay */
    #aj-wipe .w-blur {
      position: absolute; inset: 0;
      backdrop-filter: blur(0px) brightness(1);
      -webkit-backdrop-filter: blur(0px) brightness(1);
      background: rgba(13,13,16,0);
      transition:
        backdrop-filter 0s,
        -webkit-backdrop-filter 0s,
        background 0s;
    }

    /* Scanline texture */
    #aj-wipe .w-scanlines {
      position: absolute; inset: 0; opacity: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(107,140,110,0.03) 2px,
        rgba(107,140,110,0.03) 4px
      );
      transition: opacity 0.2s ease;
    }

    /* Glitch slice — horizontal bar that sweeps once */
    #aj-wipe .w-glitch {
      position: absolute; left: 0; right: 0;
      height: 3px; top: 50%;
      background: linear-gradient(90deg,
        transparent 0%,
        rgba(107,140,110,0) 10%,
        #6B8C6E 30%, #9DCCAA 50%, #6B8C6E 70%,
        rgba(107,140,110,0) 90%, transparent 100%
      );
      box-shadow: 0 0 12px 2px rgba(107,140,110,0.5);
      opacity: 0;
      transform: scaleX(0);
      transform-origin: left;
    }

    /* Corner reticle marks */
    #aj-wipe .w-reticle {
      position: absolute; inset: 20px;
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    #aj-wipe .w-reticle::before,
    #aj-wipe .w-reticle::after,
    #aj-wipe .w-rc::before,
    #aj-wipe .w-rc::after {
      content: ''; position: absolute;
      background: #6B8C6E;
      box-shadow: 0 0 6px rgba(107,140,110,0.8);
    }
    /* top-left */
    #aj-wipe .w-reticle::before { top:0; left:0; width:20px; height:2px; }
    #aj-wipe .w-reticle::after  { top:0; left:0; width:2px; height:20px; }
    /* bottom-right */
    #aj-wipe .w-rc::before { bottom:0; right:0; width:20px; height:2px; }
    #aj-wipe .w-rc::after  { bottom:0; right:0; width:2px; height:20px; }

    /* Center monogram */
    #aj-wipe .w-logo {
      position: relative; z-index: 2;
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 2.4rem; letter-spacing: 0.4em;
      color: rgba(107,140,110,0);
      text-shadow: none;
      opacity: 0;
      transition: opacity 0.3s ease, color 0.3s ease, text-shadow 0.3s ease;
      user-select: none;
    }

    /* Status line */
    #aj-wipe .w-status {
      position: absolute; bottom: 24px; right: 24px;
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
      color: rgba(107,140,110,0);
      opacity: 0;
      transition: opacity 0.3s ease, color 0.3s ease;
    }

    /* ── ENTER: blur up → hold → reveal ── */
    #aj-wipe.in .w-blur {
      backdrop-filter: blur(18px) brightness(0.35) saturate(0.4);
      -webkit-backdrop-filter: blur(18px) brightness(0.35) saturate(0.4);
      background: rgba(13,13,16,0.55);
      transition:
        backdrop-filter 0.45s cubic-bezier(.4,0,.2,1),
        -webkit-backdrop-filter 0.45s cubic-bezier(.4,0,.2,1),
        background 0.45s ease;
    }
    #aj-wipe.in .w-scanlines { opacity: 1; transition-delay: 0.2s; }
    #aj-wipe.in .w-reticle   { opacity: 1; transition-delay: 0.25s; }
    #aj-wipe.in .w-logo {
      opacity: 1; color: #6B8C6E;
      text-shadow: 0 0 24px rgba(107,140,110,0.6);
      transition-delay: 0.28s;
    }
    #aj-wipe.in .w-status {
      opacity: 1; color: rgba(107,140,110,0.55);
      transition-delay: 0.32s;
    }

    /* ── EXIT: un-blur, fade clear ── */
    #aj-wipe.out .w-blur {
      backdrop-filter: blur(0px) brightness(1) saturate(1);
      -webkit-backdrop-filter: blur(0px) brightness(1) saturate(1);
      background: rgba(13,13,16,0);
      transition:
        backdrop-filter 0.4s cubic-bezier(.4,0,.2,1),
        -webkit-backdrop-filter 0.4s cubic-bezier(.4,0,.2,1),
        background 0.4s ease;
    }
    #aj-wipe.out .w-scanlines,
    #aj-wipe.out .w-reticle,
    #aj-wipe.out .w-logo,
    #aj-wipe.out .w-status { opacity: 0; transition-delay: 0s; }

    /* Three.js canvas behind hero */
    #aj-canvas {
      position:absolute;inset:0;width:100%;height:100%;
      pointer-events:none;z-index:0;
    }
    #home, .hero, [id="home"] { position:relative;overflow:hidden; }

    /* 3D scroll reveal */
    [data-m] {
      opacity:0;
      transform:perspective(800px) translateY(44px) rotateX(10deg);
      transition:opacity .8s cubic-bezier(.16,1,.3,1),
                 transform .8s cubic-bezier(.16,1,.3,1);
      will-change:opacity,transform;
    }
    [data-m].on { opacity:1;transform:perspective(800px) translateY(0) rotateX(0); }

    /* tag-label slide */
    .tag-label {
      opacity:0;transform:translateX(-14px);
      transition:opacity .55s ease,transform .55s ease;
    }
    .tag-label.on { opacity:1;transform:translateX(0); }

    /* Card tilt */
    .svc-card,.case-card,.testi-card,.proj-card,.tool-card,.blog-card,
    .post-card,.related-card,.author-card-side,.callout {
      transform-style:preserve-3d;
      transition:transform .5s cubic-bezier(.25,.46,.45,.94),
                 box-shadow .5s cubic-bezier(.25,.46,.45,.94);
      will-change:transform;
    }

    /* Portrait tilt */
    .portrait-wrap {
      transform-style:preserve-3d;
      transition:transform .55s cubic-bezier(.25,.46,.45,.94);
      will-change:transform;
    }

    /* Magnetic btn shimmer */
    .btn {
      display:inline-block;position:relative;
      overflow:hidden;transition:transform .15s ease;
    }
    .btn::after {
      content:'';position:absolute;inset:0;
      background:rgba(255,255,255,.1);
      transform:translateX(-110%) skewX(-10deg);
      transition:transform .45s cubic-bezier(.25,.46,.45,.94);
      pointer-events:none;
    }
    .btn:hover::after { transform:translateX(110%) skewX(-10deg); }

    /* Stats float */
    .stats-card { animation:stfloat 5s ease-in-out infinite; }
    @keyframes stfloat {
      0%,100% { transform:translateY(0); }
      50%      { transform:translateY(-9px); }
    }

    /* Hero pill float */
    .hero-pill { display:inline-flex;animation:pfloat 3.5s ease-in-out infinite; }
    @keyframes pfloat {
      0%,100% { transform:translateY(0); }
      50%      { transform:translateY(-5px); }
    }

    /* Word reveal */
    .w-reveal {
      display:inline-block;opacity:0;
      transform:perspective(500px) translateY(36px) rotateX(22deg);
      animation:wrev .85s cubic-bezier(.16,1,.3,1) forwards;
    }
    @keyframes wrev { to { opacity:1;transform:perspective(500px) translateY(0) rotateX(0); } }

    /* Skill fill sheen */
    .skill-fill { position:relative;overflow:hidden; }
    .skill-fill::after {
      content:'';position:absolute;inset:0;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);
      transform:translateX(-100%);
      animation:sheen 2.6s ease-in-out infinite;
    }
    @keyframes sheen { 0%{transform:translateX(-100%)} 60%,100%{transform:translateX(220%)} }

    /* Timeline dot pulse */
    .tl-dot { animation:tlp 2.4s ease-in-out infinite; }
    @keyframes tlp {
      0%,100%{ box-shadow:0 0 0 0 rgba(107,140,110,.4); }
      50%    { box-shadow:0 0 0 7px rgba(107,140,110,0); }
    }

    /* Navbar glass */
    #navbar.glass {
      backdrop-filter:blur(18px) saturate(180%);
      -webkit-backdrop-filter:blur(18px) saturate(180%);
    }
    [data-theme="light"] #navbar.glass { background:rgba(250,248,249,.82) !important; }
    [data-theme="dark"]  #navbar.glass { background:rgba(25,18,26,.85) !important; }

    /* Sparkline draw */
    .sparkline polyline {
      stroke-dasharray:300;stroke-dashoffset:300;
      transition:stroke-dashoffset 1.5s cubic-bezier(.16,1,.3,1);
    }
    .sparkline polyline.drawn { stroke-dashoffset:0; }

    /* Metric hover pop */
    .metric-num { display:inline-block;transition:transform .4s cubic-bezier(.34,1.56,.64,1); }
    .metric-item:hover .metric-num { transform:scale(1.1) translateY(-2px); }

    /* Counter 3D roll */
    .count { display:inline-block;transition:transform .4s; }

    /* Blog callout reveal */
    .callout { transition:transform .5s cubic-bezier(.25,.46,.45,.94),box-shadow .5s; }
    .callout:hover { transform:perspective(700px) translateZ(8px) !important; }

    /* Post reading progress */
    #aj-read-bar {
      position:fixed;top:0;left:0;height:2px;z-index:99998;
      background:linear-gradient(90deg,#6B8C6E,#C9A0AC);
      width:0%;transition:width .1s linear;
    }

    /* Loader 3D exit */
    #loader { transition:transform .75s cubic-bezier(.76,0,.24,1),opacity .5s ease !important; }
    #loader.done {
      transform:perspective(500px) rotateX(-90deg) translateY(-60%) !important;
      opacity:0 !important;
    }

    /* Logo flip */
    .n-box,.logo-box-f {
      transition:transform .5s cubic-bezier(.25,.46,.45,.94);
      backface-visibility:hidden;
    }
    .n-box:hover,.logo-box-f:hover { transform:rotateY(180deg) scale(1.05); }

    /* Ticker hover lift */
    .ticker-item { transition:transform .3s ease; }
    .ticker-item:hover { transform:translateY(-4px) scale(1.05); }
  `;
  document.head.appendChild(css);

  /* ══════════════════════════════════════
     PAGE WIPE TRANSITION
  ══════════════════════════════════════ */
  /* ── Blur dissolve sci-fi overlay ── */
  const wipe = document.createElement('div');
  wipe.id = 'aj-wipe';
  wipe.innerHTML = `
    <div class="w-blur"></div>
    <div class="w-scanlines"></div>
    <div class="w-reticle"><div class="w-rc"></div></div>
    <div class="w-glitch"></div>
    <div class="w-logo">AJ</div>
    <div class="w-status">Navigating…</div>
  `;
  document.body.appendChild(wipe);

  function runGlitch() {
    const g = wipe.querySelector('.w-glitch');
    if (!g) return;
    g.style.transition = 'none';
    g.style.opacity = '0';
    g.style.transform = 'scaleX(0)';
    g.style.top = (20 + Math.random() * 60) + '%';
    requestAnimationFrame(() => {
      g.style.transition = 'transform 0.25s cubic-bezier(.16,1,.3,1), opacity 0.1s ease';
      g.style.opacity = '0.9';
      g.style.transform = 'scaleX(1)';
      setTimeout(() => {
        g.style.transition = 'opacity 0.2s ease';
        g.style.opacity = '0';
      }, 260);
    });
  }

  document.querySelectorAll('a[href]').forEach(link => {
    const h = link.getAttribute('href') || '';
    if (!h || h.startsWith('#') || h.startsWith('mailto:') ||
        h.startsWith('tel:') || h.startsWith('http') ||
        link.hasAttribute('download') || link.target === '_blank') return;
    link.addEventListener('click', e => {
      e.preventDefault();
      const dest = h;
      document.body.classList.add('aj-transitioning');
      sessionStorage.setItem('aj-nav', '1');
      wipe.classList.add('in');
      runGlitch();
      /* hide native loader on current page */
      const ldr = document.getElementById('loader');
      if (ldr) ldr.style.cssText = 'z-index:0!important;opacity:0!important;transition:none!important;';
      setTimeout(() => { window.location.href = dest; }, 620);
    });
  });

  /* Hide native loader instantly when arriving via nav */
  (function() {
    if (sessionStorage.getItem('aj-nav')) {
      sessionStorage.removeItem('aj-nav');
      document.body.classList.add('aj-arriving');
      const ldr = document.getElementById('loader');
      if (ldr) ldr.style.cssText = 'opacity:0!important;visibility:hidden!important;transition:none!important;z-index:0!important;';
    }
  })();

  window.addEventListener('pageshow', () => {
    requestAnimationFrame(() => {
      wipe.classList.add('out');
      document.body.classList.remove('aj-transitioning', 'aj-arriving');
      setTimeout(() => wipe.classList.remove('in', 'out'), 500);
    });
  });;

  /* ══════════════════════════════════════
     CUSTOM CURSOR
  ══════════════════════════════════════ */
  const cur = document.createElement('div');
  cur.id = 'aj-cur';
  cur.innerHTML = '<div class="cd"></div><div class="cr"></div>';
  document.body.appendChild(cur);

  const dot = cur.querySelector('.cd');
  const ring = cur.querySelector('.cr');
  let mx = -200, my = -200, rx = -200, ry = -200;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mousedown', () => document.body.classList.add('cd'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cd'));

  document.addEventListener('mouseover', e => {
    const t = e.target.closest('a,button,.btn,.svc-card,.proj-card,.testi-card,.case-card,.blog-card,.tool-card,.post-card,input,select,textarea,.callout');
    document.body.classList.toggle('ch', !!t);
  });

  (function curLoop() {
    dot.style.cssText  = `left:${mx}px;top:${my}px`;
    rx += (mx - rx) * 0.09;
    ry += (my - ry) * 0.09;
    ring.style.cssText = `left:${rx}px;top:${ry}px`;
    requestAnimationFrame(curLoop);
  })();

  /* ══════════════════════════════════════
     READING PROGRESS BAR (blog posts only)
  ══════════════════════════════════════ */
  if (document.querySelector('.post-body, .blog-post-body, article')) {
    const bar = document.createElement('div');
    bar.id = 'aj-read-bar';
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
      const s = document.documentElement;
      bar.style.width = (s.scrollTop / (s.scrollHeight - s.clientHeight) * 100) + '%';
    }, { passive: true });
  }

  /* ══════════════════════════════════════
     THREE.JS HERO SCENE (homepage only)
  ══════════════════════════════════════ */
  const heroSection = document.getElementById('home');
  if (heroSection) {
    const s3 = document.createElement('script');
    s3.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s3.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.id = 'aj-canvas';
      heroSection.insertBefore(canvas, heroSection.firstChild);

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
      camera.position.z = 5;

      function resize() {
        const w = heroSection.offsetWidth, h = heroSection.offsetHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      resize();
      window.addEventListener('resize', resize);

      /* Particles */
      const N = 280;
      const pos = new Float32Array(N * 3);
      const col = new Float32Array(N * 3);
      const vel = [];
      const SAGE  = new THREE.Color('#6B8C6E');
      const BLUSH = new THREE.Color('#C9A0AC');

      for (let i = 0; i < N; i++) {
        pos[i*3]   = (Math.random()-.5)*18;
        pos[i*3+1] = (Math.random()-.5)*11;
        pos[i*3+2] = (Math.random()-.5)*7;
        const c = Math.random() > .5 ? SAGE : BLUSH;
        col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b;
        vel.push({ x:(Math.random()-.5)*.003, y:(Math.random()-.5)*.003, z:(Math.random()-.5)*.002 });
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
      const pts = new THREE.Points(geo, new THREE.PointsMaterial({
        size:.08, vertexColors:true, transparent:true, opacity:.65, sizeAttenuation:true
      }));
      scene.add(pts);

      /* Mesh lines between close particles */
      const lp = [];
      for (let i = 0; i < N; i++)
        for (let j = i+1; j < N; j++) {
          const dx=pos[i*3]-pos[j*3], dy=pos[i*3+1]-pos[j*3+1], dz=pos[i*3+2]-pos[j*3+2];
          if (dx*dx+dy*dy+dz*dz < 7.5) {
            lp.push(new THREE.Vector3(pos[i*3],pos[i*3+1],pos[i*3+2]));
            lp.push(new THREE.Vector3(pos[j*3],pos[j*3+1],pos[j*3+2]));
          }
        }
      scene.add(new THREE.LineSegments(
        new THREE.BufferGeometry().setFromPoints(lp),
        new THREE.LineBasicMaterial({ color:0x6B8C6E, transparent:true, opacity:.07 })
      ));

      /* Floating gems */
      const gems = [];
      [0x6B8C6E,0xC9A0AC,0x4F6E52,0xB07888,0x9AB89D].forEach((color, i) => {
        const m = new THREE.Mesh(
          new THREE.IcosahedronGeometry(.1 + Math.random()*.12, 0),
          new THREE.MeshPhongMaterial({ color, transparent:true, opacity:.5, wireframe:i%2===0, shininess:100 })
        );
        m.position.set((Math.random()-.5)*10,(Math.random()-.5)*5,(Math.random()-.5)*3);
        m.userData = { vy:(Math.random()-.5)*.007, vx:(Math.random()-.5)*.005,
                       rx:(Math.random()-.5)*.02,  ry:(Math.random()-.5)*.015 };
        scene.add(m); gems.push(m);
      });

      /* Lights */
      scene.add(new THREE.AmbientLight(0xffffff, .5));
      const dl = new THREE.DirectionalLight(0x6B8C6E, 1.2); dl.position.set(5,3,5); scene.add(dl);
      const pl = new THREE.PointLight(0xC9A0AC, .8, 20);    pl.position.set(-5,-3,3); scene.add(pl);

      let tx=0,ty=0,cx=0,cy=0;
      document.addEventListener('mousemove', e => {
        tx = (e.clientX/innerWidth-.5)*1.1;
        ty = (e.clientY/innerHeight-.5)*.7;
      });

      let t = 0;
      (function loop() {
        requestAnimationFrame(loop);
        t += .007;
        cx += (tx-cx)*.04; cy += (ty-cy)*.04;
        for (let i=0; i<N; i++) {
          pos[i*3]   += vel[i].x;
          pos[i*3+1] += vel[i].y + Math.sin(t+i*.4)*.0007;
          pos[i*3+2] += vel[i].z;
          if (Math.abs(pos[i*3])   > 9) { pos[i*3]   *= -.95; vel[i].x *= -1; }
          if (Math.abs(pos[i*3+1]) > 6) { pos[i*3+1] *= -.95; vel[i].y *= -1; }
          if (Math.abs(pos[i*3+2]) > 4) { pos[i*3+2] *= -.95; vel[i].z *= -1; }
        }
        geo.attributes.position.needsUpdate = true;
        gems.forEach(g => {
          g.rotation.x += g.userData.rx; g.rotation.y += g.userData.ry;
          g.position.y  += g.userData.vy; g.position.x  += g.userData.vx;
          if (Math.abs(g.position.y) > 4) g.userData.vy *= -1;
          if (Math.abs(g.position.x) > 6) g.userData.vx *= -1;
        });
        pts.rotation.y = cx*.1; pts.rotation.x = -cy*.07;
        scene.rotation.y = cx*.05;
        renderer.render(scene, camera);
      })();
    };
    document.head.appendChild(s3);
  }

  /* ══════════════════════════════════════
     HERO WORD SPLIT
  ══════════════════════════════════════ */
  const h1 = document.querySelector('.hero-h1');
  if (h1) {
    const tw = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
    const tnodes = [];
    let tn;
    while ((tn = tw.nextNode())) tnodes.push(tn);
    let wi = 0;
    tnodes.forEach(node => {
      const words = node.textContent.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      words.forEach(w => {
        if (!w.trim()) { frag.appendChild(document.createTextNode(w)); return; }
        const sp = document.createElement('span');
        sp.className = 'w-reveal';
        sp.textContent = w;
        sp.style.animationDelay = (wi++ * .06) + 's';
        frag.appendChild(sp);
      });
      node.parentNode.replaceChild(frag, node);
    });
  }

  /* ══════════════════════════════════════
     SCROLL REVEAL OBSERVER
  ══════════════════════════════════════ */
  /* Tag labels */
  document.querySelectorAll('.tag-label').forEach(el => el.setAttribute('data-tag', ''));

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const delay = parseFloat(el.style.transitionDelay) || 0;
      setTimeout(() => el.classList.add('on'), delay * 1000);
      io.unobserve(el);
    });
  }, { threshold: .1 });

  const tagIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('on');
      tagIO.unobserve(en.target);
    });
  }, { threshold: .4 });

  /* Convert legacy data-reveal → data-m */
  document.querySelectorAll('[data-reveal]').forEach(el => {
    el.setAttribute('data-m', el.getAttribute('data-reveal'));
    el.removeAttribute('data-reveal');
  });
  document.querySelectorAll('[data-m]').forEach(el => io.observe(el));
  document.querySelectorAll('[data-tag]').forEach(el => tagIO.observe(el));

  /* Auto-stagger grid children */
  const grids = '.svc-grid,.cases-grid,.testi-grid,.proj-grid,.tools-grid,.blog-grid,.blog-posts-grid,.post-grid';
  document.querySelectorAll(grids).forEach(parent => {
    Array.from(parent.children).forEach((child, i) => {
      if (!child.hasAttribute('data-m')) {
        child.setAttribute('data-m', 'up');
        child.style.transitionDelay = (i * .07) + 's';
        io.observe(child);
      }
    });
  });

  /* ══════════════════════════════════════
     3D CARD TILT
  ══════════════════════════════════════ */
  const TILT = '.svc-card,.case-card,.testi-card,.proj-card,.tool-card,.blog-card,.post-card,.callout';
  document.querySelectorAll(TILT).forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      card.style.transform = `perspective(750px) rotateY(${x*13}deg) rotateX(${-y*9}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(750px) rotateY(0deg) rotateX(0deg) translateZ(0)';
    });
  });

  /* ══════════════════════════════════════
     PORTRAIT TILT
  ══════════════════════════════════════ */
  const portrait = document.querySelector('.portrait-wrap');
  if (portrait) {
    portrait.addEventListener('mousemove', e => {
      const r = portrait.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      portrait.style.transform = `perspective(650px) rotateY(${x*17}deg) rotateX(${-y*13}deg) scale(1.03)`;
    });
    portrait.addEventListener('mouseleave', () => {
      portrait.style.transform = 'perspective(650px) rotateY(0) rotateX(0) scale(1)';
    });
  }

  /* ══════════════════════════════════════
     MAGNETIC BUTTONS
  ══════════════════════════════════════ */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2)  * .2;
      const y = (e.clientY - r.top  - r.height/2) * .2;
      btn.style.transform = `translate(${x}px,${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform .5s cubic-bezier(.25,.46,.45,.94)';
      btn.style.transform = '';
    });
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform .12s ease';
    });
  });

  /* ══════════════════════════════════════
     COUNTER ROLL ANIMATION
  ══════════════════════════════════════ */
  const cntIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = +el.dataset.target;
      const start = performance.now();
      const dur = 1600;
      (function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(ease * target);
        el.style.transform = `perspective(180px) rotateX(${(1-ease)*40}deg)`;
        el.style.opacity = .2 + ease * .8;
        if (p < 1) requestAnimationFrame(tick);
        else { el.style.transform = ''; el.style.opacity = ''; }
      })(start);
      cntIO.unobserve(el);
    });
  }, { threshold: .5 });
  document.querySelectorAll('.count[data-target]').forEach(el => cntIO.observe(el));

  /* ══════════════════════════════════════
     SKILL BAR 3D UNFURL
  ══════════════════════════════════════ */
  const skIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.style.cssText = 'width:0%;transform-origin:left;transform:perspective(200px) rotateY(-25deg);transition:none';
      requestAnimationFrame(() => {
        el.style.transition = 'width 1.3s cubic-bezier(.16,1,.3,1),transform 1.3s cubic-bezier(.16,1,.3,1)';
        el.style.width = el.dataset.w + '%';
        el.style.transform = 'perspective(200px) rotateY(0deg)';
      });
      skIO.unobserve(el);
    });
  }, { threshold: .5 });
  document.querySelectorAll('.skill-fill[data-w]').forEach(el => skIO.observe(el));

  /* ══════════════════════════════════════
     SPARKLINE DRAW
  ══════════════════════════════════════ */
  const spIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('drawn');
      spIO.unobserve(en.target);
    });
  }, { threshold: .5 });
  document.querySelectorAll('.sparkline polyline').forEach(el => {
    const len = 300;
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
    spIO.observe(el);
  });

  /* ══════════════════════════════════════
     NAVBAR GLASS ON SCROLL
  ══════════════════════════════════════ */
  const nav = document.getElementById('navbar');
  if (nav) {
    const onScroll = () => nav.classList.toggle('glass', scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════════════════════════════════
     PARALLAX BLOBS
  ══════════════════════════════════════ */
  const blobs = [
    { el: document.querySelector('.hero-blob-1'), f: .055 },
    { el: document.querySelector('.hero-blob-2'), f: -.04 },
    { el: document.querySelector('.dot-pattern'), f: .03 },
    { el: document.querySelector('.cta-blob-1'),  f: .04 },
    { el: document.querySelector('.cta-blob-2'),  f: -.03 },
  ].filter(b => b.el);
  window.addEventListener('scroll', () => {
    const y = scrollY;
    blobs.forEach(b => { b.el.style.transform = `translateY(${y * b.f}px)`; });
  }, { passive: true });

  /* ══════════════════════════════════════
     BLOG POST: PARAGRAPH FADE-IN
  ══════════════════════════════════════ */
  const postBody = document.querySelector('.post-body, .blog-post-body, article .content');
  if (postBody) {
    const paraIO = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.16,1,.3,1)';
        en.target.style.opacity = '1';
        en.target.style.transform = 'translateY(0)';
        paraIO.unobserve(en.target);
      });
    }, { threshold: .15 });
    postBody.querySelectorAll('p, h2, h3, h4, ul, ol, blockquote, .callout').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      paraIO.observe(el);
    });
  }

  /* ══════════════════════════════════════
     LOADER 3D EXIT
  ══════════════════════════════════════ */
  const loader = document.getElementById('loader');
  if (loader) {
    new MutationObserver(() => {
      if (loader.classList.contains('done')) {
        loader.style.transform = 'perspective(500px) rotateX(-90deg) translateY(-60%)';
        loader.style.opacity = '0';
      }
    }).observe(loader, { attributes: true, attributeFilter: ['class'] });
  }

  console.log('%c AJ Motion v2 ✦ universal ', 'background:#6B8C6E;color:#fff;padding:4px 10px;border-radius:3px;font-size:12px');
})();
