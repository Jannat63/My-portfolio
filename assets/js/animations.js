/* =========================================
   ANIMATIONS.JS
   Typewriter · Counter · Scroll Reveal
   Portfolio: Ahsan Jannat
   ========================================= */

'use strict';

/* ---- TYPEWRITER EFFECT ---- */
const typedEl = document.getElementById('typed-text');
const words = ['rule.', 'grow.', 'convert.', 'lead.'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout;

function typeWriter() {
  const current = words[wordIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 80 : 120;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000; // pause before delete
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 400; // pause before next word
  }

  typeTimeout = setTimeout(typeWriter, speed);
}

// Start typing after hero entrance animation
setTimeout(typeWriter, 800);


/* ---- COUNTER ANIMATION ---- */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    animateCounter(counter, target);
  });
}

// Trigger counters when stats card enters view
const statsCard = document.querySelector('.stats-card');
if (statsCard) {
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        initCounters();
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  statsObserver.observe(statsCard);
}


/* ---- SKILL BAR ANIMATION ---- */
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  bars.forEach(bar => {
    const width = bar.dataset.width;
    bar.style.width = width + '%';
  });
}

const skillsPanel = document.querySelector('.skills-panel');
if (skillsPanel) {
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillObserver.disconnect();
      }
    });
  }, { threshold: 0.2 });
  skillObserver.observe(skillsPanel);
}


/* ---- SCROLL REVEAL ---- */
const revealElements = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
      setTimeout(() => {
        el.classList.add('revealed');
      }, delay);
      revealObserver.unobserve(el);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));
