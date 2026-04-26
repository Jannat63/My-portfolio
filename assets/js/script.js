/* =========================================
   SCRIPT.JS — Main Interactions
   Navbar · Filter · WhatsApp · Active Nav
   Portfolio: Ahsan Jannat
   ========================================= */

'use strict';

/* ---- NAVBAR: Scroll Background ---- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ---- NAVBAR: Mobile Hamburger ---- */
const hamburger   = document.getElementById('hamburger');
const navMenu     = document.getElementById('navMenu');

// Create overlay for mobile menu
const navOverlay = document.createElement('div');
navOverlay.classList.add('nav-overlay');
document.body.appendChild(navOverlay);

function openMenu() {
  hamburger.classList.add('open');
  navMenu.classList.add('open');
  navOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
  navOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (navMenu.classList.contains('open')) closeMenu();
  else openMenu();
});

navOverlay.addEventListener('click', closeMenu);

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});


/* ---- NAVBAR: Active Link on Scroll ---- */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link[data-section]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, {
  threshold: 0.35,
  rootMargin: '-80px 0px 0px 0px'
});

sections.forEach(section => sectionObserver.observe(section));


/* ---- SMOOTH SCROLL for nav links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ---- PROJECT FILTER ---- */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    const filter = this.dataset.filter;

    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    // Show/hide cards
    projectCards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
        // Re-trigger reveal if needed
        card.classList.add('revealed');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


/* ---- WHATSAPP POPUP ---- */
const waBtn     = document.getElementById('whatsappBtn');
const waPopup   = document.getElementById('whatsappPopup');
const waClose   = document.getElementById('popupClose');
const waForm    = document.getElementById('whatsappForm');

waBtn.addEventListener('click', () => {
  waPopup.classList.toggle('open');
});

waClose.addEventListener('click', () => {
  waPopup.classList.remove('open');
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!waBtn.contains(e.target) && !waPopup.contains(e.target)) {
    waPopup.classList.remove('open');
  }
});

waForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = document.getElementById('waName').value.trim();
  const service = document.getElementById('waService').value.trim();
  const message = document.getElementById('waMessage').value.trim();

  const phone = '+8801643644550';
  const text  = `Hi Ahsan! I'm ${name}. I need help with: *${service}*.\n\n${message}`;
  const url   = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  window.open(url, '_blank');
  waPopup.classList.remove('open');
  waForm.reset();
});


/* ---- CONTACT FORM: Formspree ---- */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #14b8a6, #0f766e)';
        contactForm.reset();
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error();
      }
    } catch {
      btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Error. Try again.';
      btn.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }
  });
}


/* ---- PORTRAIT FALLBACK ---- */
// If portrait.png not found, show a placeholder gradient
const portrait = document.getElementById('portraitImg');
if (portrait) {
  portrait.addEventListener('error', () => {
    portrait.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width: 380px;
      height: 460px;
      border-radius: 24px;
      background: linear-gradient(135deg, rgba(249,115,22,0.15), rgba(59,130,246,0.1));
      border: 1px dashed rgba(249,115,22,0.3);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      color: rgba(255,255,255,0.3);
      font-family: 'Syne', sans-serif;
      font-size: 0.85rem;
      position: relative;
      z-index: 1;
    `;
    placeholder.innerHTML = `
      <i class="fa-solid fa-image" style="font-size:3rem; color: rgba(249,115,22,0.3);"></i>
      <p>Place portrait.png in<br><code style="font-size:0.75rem">assets/images/portrait.png</code></p>
    `;
    portrait.parentElement.appendChild(placeholder);
  });
}
