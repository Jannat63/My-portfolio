/* ═══════════════════════════════════════════════════
   AHSAN JANNAT PORTFOLIO — GLOBAL SCRIPT
   ═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── PAGE LOADER ── */
  window.addEventListener('load', () => {
    setTimeout(() => {
      const l = document.getElementById('loader');
      if (l) l.classList.add('done');
    }, 500);
  });

  /* ── THEME TOGGLE ── */
  const html = document.documentElement;
  const tb   = document.getElementById('themeBtn');
  const saved = localStorage.getItem('aj-theme') || 'light';
  html.setAttribute('data-theme', saved);
  function setThemeIcon(t) {
    if (tb) tb.innerHTML = t === 'dark'
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }
  setThemeIcon(saved);
  if (tb) {
    tb.addEventListener('click', () => {
      const t = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', t);
      localStorage.setItem('aj-theme', t);
      setThemeIcon(t);
    });
  }

  /* ── NAVBAR SCROLL + BACK-TO-TOP + PROGRESS BAR ── */
  const nav = document.getElementById('navbar');
  const btt = document.getElementById('btt');
  const pb  = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const h = document.documentElement;
    if (nav) nav.classList.toggle('scrolled', y > 40);
    if (btt) btt.classList.toggle('show', y > 300);
    if (pb)  pb.style.width = (y / (h.scrollHeight - h.clientHeight) * 100) + '%';
  }, { passive: true });
  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── ACTIVE NAV LINK ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.n-links a, .mob-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('act');
  });

  /* ── HAMBURGER MENU ── */
  const hbg = document.getElementById('hbg');
  const mob = document.getElementById('mobMenu');
  if (hbg && mob) {
    hbg.addEventListener('click', () => {
      hbg.classList.toggle('open');
      mob.classList.toggle('open');
      mob.style.display = mob.classList.contains('open') ? 'flex' : 'none';
    });
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hbg.classList.remove('open');
      mob.classList.remove('open');
      mob.style.display = 'none';
    }));
  }

  /* ── SCROLL REVEAL ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

  /* ── COUNTER ANIMATION ── */
  document.querySelectorAll('.count').forEach(el => {
    const cio = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      const target = +el.dataset.target;
      const dur = 1400; const step = target / 60;
      let cur = 0;
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = Math.round(cur);
        if (cur >= target) clearInterval(t);
      }, dur / 60);
      cio.unobserve(el);
    }, { threshold: .5 });
    cio.observe(el);
  });

  /* ── SKILL BAR ANIMATION ── */
  document.querySelectorAll('.skill-fill').forEach(f => {
    const sio = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        f.style.width = f.dataset.w + '%';
        sio.unobserve(f);
      }
    }, { threshold: .3 });
    sio.observe(f);
  });

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  /* ── PROJECT / BLOG FILTER ── */
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const btns  = group.querySelectorAll('[data-f]');
    const items = group.querySelectorAll('[data-cat]');
    btns.forEach(btn => {
      btn.addEventListener('click', function () {
        btns.forEach(b => b.classList.remove('act'));
        this.classList.add('act');
        const f = this.dataset.f;
        items.forEach(c => {
          c.style.display = (f === 'all' || c.dataset.cat === f) ? '' : 'none';
        });
      });
    });
  });

  /* ── SKILL TABS (About page) ── */
  document.querySelectorAll('.s-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.s-tab').forEach(t => t.classList.remove('act'));
      document.querySelectorAll('.skill-group').forEach(g => g.classList.remove('act'));
      this.classList.add('act');
      const group = document.getElementById('tab-' + this.dataset.tab);
      if (group) {
        group.classList.add('act');
        group.querySelectorAll('.skill-fill').forEach(f => {
          f.style.width = '0%';
          setTimeout(() => f.style.width = f.dataset.w + '%', 50);
        });
      }
    });
  });

  /* ── CONTACT FORM ── */
  const form = document.getElementById('contactForm');
  const succ = document.getElementById('formSuccess');
  const sbtn = document.getElementById('submitBtn');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (sbtn) { sbtn.disabled = true; sbtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…'; }
      try {
        const r = await fetch(form.action, {
          method: 'POST', body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (r.ok) {
          form.style.display = 'none';
          if (succ) succ.style.display = 'block';
        } else {
          if (sbtn) { sbtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Try Again'; sbtn.disabled = false; }
        }
      } catch {
        if (sbtn) { sbtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Try Again'; sbtn.disabled = false; }
      }
    });
  }

  /* ── CHAR COUNTER (contact form) ── */
  const ta = document.getElementById('message');
  const cc = document.getElementById('charCount');
  if (ta && cc) ta.addEventListener('input', () => cc.textContent = ta.value.length + ' / 500');

  /* ── WHATSAPP POPUP ── */
  const waBtn   = document.getElementById('waBtn');
  const waPopup = document.getElementById('waPopup');
  const waClose = document.getElementById('waClose');
  const waSend  = document.getElementById('waSend');
  if (waBtn)   waBtn.addEventListener('click',  () => waPopup && waPopup.classList.toggle('open'));
  if (waClose) waClose.addEventListener('click', () => waPopup && waPopup.classList.remove('open'));
  if (waSend)  waSend.addEventListener('click', () => {
    const n = document.getElementById('waName')?.value.trim() || '';
    const s = document.getElementById('waService')?.value || 'General inquiry';
    const m = document.getElementById('waMsg')?.value.trim() || '';
    const msg = encodeURIComponent(`Hi Ahsan! I'm ${n||'interested'}.\nService: ${s}\n${m}`);
    window.open(`https://wa.me/8801643644550?text=${msg}`, '_blank');
    if (waPopup) waPopup.classList.remove('open');
  });

  /* ── TYPING EFFECT (Hero only) ── */
  const typedEl = document.getElementById('typedText');
  if (typedEl) {
    const words = ['Locally', 'Digitally', 'Globally', 'Powerfully'];
    let wi = 0, ci = 0, deleting = false;
    function type() {
      const word = words[wi];
      if (!deleting) {
        typedEl.textContent = word.slice(0, ++ci);
        if (ci === word.length) { setTimeout(() => { deleting = true; type(); }, 1800); return; }
      } else {
        typedEl.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
      }
      setTimeout(type, deleting ? 60 : 100);
    }
    setTimeout(type, 1200);
  }

  /* ── NEWSLETTER WIDGET ── */
  document.querySelectorAll('.nl-form button').forEach(btn => {
    btn.addEventListener('click', function () {
      const inp = this.previousElementSibling;
      if (inp && inp.value.includes('@')) {
        this.textContent = '✓ Subscribed!';
        inp.value = '';
      }
    });
  });

  /* ── PORTRAIT FALLBACK ── */
  const portrait = document.getElementById('portraitImg');
  if (portrait) {
    portrait.addEventListener('error', () => {
      portrait.style.display = 'none';
      portrait.parentElement.style.background = 'var(--blush-pal)';
      const ph = document.createElement('div');
      ph.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-size:6rem;color:var(--blush);opacity:.3';
      ph.textContent = 'AJ';
      portrait.parentElement.insertBefore(ph, portrait);
    });
  }

})();
