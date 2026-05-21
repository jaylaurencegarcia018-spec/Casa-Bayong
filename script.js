/* ════════════════════════════════════════════
   CASA BAYONG — script.js
   Vanilla JavaScript — No dependencies required
════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────
   PRELOADER
───────────────────────────────────── */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
    // Trigger hero animations after preloader
    initScrollReveal();
  }, 1600);
});

// Prevent scroll during preloader
document.body.style.overflow = 'hidden';


/* ─────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────── */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left  = mouseX + 'px';
  cursorDot.style.top   = mouseY + 'px';
});

// Smooth ring follow
function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover states
const hoverEls = 'a, button, .product-card, .filter-btn, .gallery-item, .social-link, .pillar';
document.querySelectorAll(hoverEls).forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});


/* ─────────────────────────────────────
   STICKY NAVBAR
───────────────────────────────────── */
const navbar = document.getElementById('navbar');

function handleNavbar() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleNavbar, { passive: true });
handleNavbar();


/* ─────────────────────────────────────
   ACTIVE NAV LINK ON SCROLL
───────────────────────────────────── */
const sections  = document.querySelectorAll('section[id], footer[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));


/* ─────────────────────────────────────
   SMOOTH SCROLLING
───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const navH   = navbar.offsetHeight;
    const top    = target.getBoundingClientRect().top + window.scrollY - navH;

    window.scrollTo({ top, behavior: 'smooth' });

    // Close mobile menu if open
    closeMenu();
  });
});


/* ─────────────────────────────────────
   HAMBURGER / MOBILE MENU
───────────────────────────────────── */
const hamburger     = document.getElementById('hamburger');
const navLinksList  = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileOverlay');

function openMenu() {
  hamburger.classList.add('active');
  navLinksList.classList.add('open');
  mobileOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  hamburger.classList.remove('active');
  navLinksList.classList.remove('open');
  mobileOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  hamburger.classList.contains('active') ? closeMenu() : openMenu();
});
mobileOverlay.addEventListener('click', closeMenu);


/* ─────────────────────────────────────
   SCROLL REVEAL ANIMATIONS
───────────────────────────────────── */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay * 120);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
}


/* ─────────────────────────────────────
   PRODUCT FILTER
───────────────────────────────────── */
const filterBtns    = document.querySelectorAll('.filter-btn');
const productCards  = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    productCards.forEach((card, i) => {
      const category = card.dataset.category;
      const show     = filter === 'all' || category === filter;

      if (show) {
        card.classList.remove('hidden');
        // Staggered reveal
        card.style.opacity  = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.transition = 'opacity .4s ease, transform .4s ease';
          card.style.opacity    = '1';
          card.style.transform  = 'translateY(0)';
        }, i * 80);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


/* ─────────────────────────────────────
   ADD TO CART / BUY NOW
───────────────────────────────────── */
const cartToast  = document.getElementById('cartToast');
let   toastTimer = null;

function showToast() {
  cartToast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => cartToast.classList.remove('show'), 3000);
}

document.querySelectorAll('.btn-cart').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    // Button micro-animation
    btn.style.transform = 'scale(0.93)';
    setTimeout(() => { btn.style.transform = ''; }, 180);

    showToast();
  });
});

// Quick view button
document.querySelectorAll('.quick-view').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card   = btn.closest('.product-card');
    const name   = card.querySelector('.product-name').textContent;
    const price  = card.querySelector('.price-current').textContent;
    const desc   = card.querySelector('.product-desc').textContent;

    // Simple modal-less notification (toast style)
    cartToast.querySelector('span').textContent = `Viewing: ${name} — ${price}`;
    showToast();
    setTimeout(() => {
      cartToast.querySelector('span').textContent = 'Added to your bag!';
    }, 3200);
  });
});


/* ─────────────────────────────────────
   TESTIMONIAL SLIDER (MOBILE)
───────────────────────────────────── */
const track    = document.getElementById('testimonialsTrack');
const dotsWrap = document.getElementById('testiDots');
let   currentSlide = 0;

function buildDots() {
  const cards = track.querySelectorAll('.testimonial-card');
  dotsWrap.innerHTML = '';
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
}

function goToSlide(index) {
  const cards = track.querySelectorAll('.testimonial-card');
  currentSlide = Math.max(0, Math.min(index, cards.length - 1));
  const card   = cards[currentSlide];
  track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  dotsWrap.querySelectorAll('.testi-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

// Auto-detect scroll position to sync dots
track.addEventListener('scroll', () => {
  const cards = Array.from(track.querySelectorAll('.testimonial-card'));
  const scrollLeft = track.scrollLeft;
  let closest = 0;
  let minDist = Infinity;
  cards.forEach((card, i) => {
    const dist = Math.abs(card.offsetLeft - track.offsetLeft - scrollLeft);
    if (dist < minDist) { minDist = dist; closest = i; }
  });
  currentSlide = closest;
  dotsWrap.querySelectorAll('.testi-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}, { passive: true });

buildDots();

// Auto-play testimonials on mobile
let autoPlay = setInterval(() => {
  const cards = track.querySelectorAll('.testimonial-card');
  if (window.innerWidth <= 768) {
    goToSlide((currentSlide + 1) % cards.length);
  }
}, 4500);

// Pause on hover
track.addEventListener('mouseenter', () => clearInterval(autoPlay));
track.addEventListener('mouseleave', () => {
  autoPlay = setInterval(() => {
    const cards = track.querySelectorAll('.testimonial-card');
    if (window.innerWidth <= 768) goToSlide((currentSlide + 1) % cards.length);
  }, 4500);
});


/* ─────────────────────────────────────
   BACK TO TOP
───────────────────────────────────── */
const backBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backBtn.classList.add('visible');
  } else {
    backBtn.classList.remove('visible');
  }
}, { passive: true });

backBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ─────────────────────────────────────
   HERO SHELF BAG PARALLAX
───────────────────────────────────── */
const shelfScene = document.querySelector('.hero-shelf-scene');
const heroEl     = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  if (!heroEl) return;
  const heroBottom = heroEl.offsetHeight;
  const scrolled   = window.scrollY;
  if (scrolled < heroBottom) {
    const shift = scrolled * 0.12;
    if (shelfScene) {
      shelfScene.style.transform = `translateY(${shift}px)`;
    }
  }
}, { passive: true });


/* ─────────────────────────────────────
   LEAF HOVER EFFECT ON HERO SCROLL
───────────────────────────────────── */
const leaves = document.querySelectorAll('.leaf');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  leaves.forEach((leaf, i) => {
    const dir    = i % 2 === 0 ? 1 : -1;
    const factor = 0.06 + i * 0.02;
    leaf.style.transform = `translateY(${scrolled * factor * dir}px)`;
  });
}, { passive: true });


/* ─────────────────────────────────────
   NAVBAR LOGO CLICK = TOP
───────────────────────────────────── */
document.querySelector('.nav-logo').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeMenu();
});


/* ─────────────────────────────────────
   PRODUCT CARD TILT EFFECT (Desktop)
───────────────────────────────────── */
if (window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const xPos   = (e.clientX - rect.left) / rect.width  - 0.5;
      const yPos   = (e.clientY - rect.top)  / rect.height - 0.5;
      const rotateX = yPos * -6;
      const rotateY = xPos *  6;
      card.style.transform    = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      card.style.transition   = 'transform .1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'all .35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
  });
}


/* ─────────────────────────────────────
   MARQUEE PAUSE ON HOVER
───────────────────────────────────── */
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}


/* ─────────────────────────────────────
   PILLAR COUNTER ANIMATION
───────────────────────────────────── */
function animateNumber(el, end, duration = 1200) {
  let start = 0;
  const step = end / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= end) { start = end; clearInterval(timer); }
    el.textContent = Math.floor(start) + (el.dataset.suffix || '');
  }, 16);
}

// Watch hero stats
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // No raw numbers to animate here (mixed text), just skip
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: .5 });

document.querySelectorAll('.hero-stats .stat').forEach(s => statsObserver.observe(s));


/* ─────────────────────────────────────
   GALLERY ITEM HOVER GRAIN EFFECT
───────────────────────────────────── */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.querySelector('.gallery-art').style.filter = 'brightness(1.15) saturate(1.2)';
  });
  item.addEventListener('mouseleave', () => {
    item.querySelector('.gallery-art').style.filter = '';
  });
});


/* ─────────────────────────────────────
   FOOTER SOCIAL LINK RIPPLE
───────────────────────────────────── */
document.querySelectorAll('.social-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const ripple = document.createElement('span');
    const rect   = link.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      background:rgba(200,160,64,0.25);
      transform:scale(0); animation: ripple .5s ease forwards;
      pointer-events:none;
    `;
    link.style.position = 'relative'; link.style.overflow = 'hidden';
    link.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Inject ripple keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple { to { transform: scale(2.5); opacity: 0; } }`;
document.head.appendChild(rippleStyle);


/* ─────────────────────────────────────
   KEYBOARD ACCESSIBILITY
───────────────────────────────────── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});


/* ─────────────────────────────────────
   RESIZE HANDLER
───────────────────────────────────── */
window.addEventListener('resize', () => {
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768) closeMenu();
  // Rebuild dots
  buildDots();
});


/* ─────────────────────────────────────
   LOG READY
───────────────────────────────────── */
console.log('%cCasa Bayong ✦', 'font-family:serif; font-size:22px; color:#c8a040; font-weight:bold;');
console.log('%cHandcrafted Filipino Artisan Bags', 'font-family:sans-serif; font-size:12px; color:#806850;');