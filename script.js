// ===== PRELOADER =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 1500);
});

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.classList.add('visible');
});

document.addEventListener('mouseleave', () => {
  cursor.classList.remove('visible');
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  cursor.style.left = cursorX - 10 + 'px';
  cursor.style.top = cursorY - 10 + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effect on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .gallery-item, .service-card, input, textarea, select');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ===== HERO PARTICLES =====
const particlesContainer = document.getElementById('hero-particles');
const particleCount = 40;

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
  particle.style.animationDelay = Math.random() * 10 + 's';
  particle.style.width = (Math.random() * 3 + 1) + 'px';
  particle.style.height = particle.style.width;
  particlesContainer.appendChild(particle);
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== GALLERY FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.5s ease forwards';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.querySelector('img').src;
    const imgAlt = item.querySelector('img').alt;
    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgAlt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Testimonials section removed

// ===== STAT COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;

  const aboutSection = document.getElementById('about');
  const rect = aboutSection.getBoundingClientRect();

  if (rect.top < window.innerHeight * 0.8) {
    statsAnimated = true;

    statNumbers.forEach(stat => {
      const target = parseInt(stat.dataset.count);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const counter = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(counter);
          stat.textContent = target.toLocaleString() + (target === 98 ? '' : '+');
        } else {
          stat.textContent = Math.floor(current).toLocaleString();
        }
      }, 16);
    });
  }
}

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.88;

    if (rect.top < triggerPoint) {
      el.classList.add('visible');
    }
  });

  animateStats();
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', () => {
  setTimeout(checkReveal, 100);
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== INSTAGRAM OFFICIAL EMBEDS =====
// Note: Automatic JS scraping is blocked by Instagram's Cloudflare (returns 403/500/502 errors on all proxies).
// To prevent console errors, we render the exact known recent posts provided.
function initInstagramEmbeds() {
  const feedContainer = document.getElementById('instagram-feed');
  if (!feedContainer) return;

  // The 3 latest post IDs (You can update these manually whenever you share a new post)
  const shortcodes = ['DaXqmSeNCJf', 'DaXp2WTNuJr', 'DYQq001oebj'];
  feedContainer.innerHTML = ''; // Clear skeleton

  // Render the posts
  shortcodes.forEach(code => {
    const embedHtml = `
      <div class="instagram-embed-item" style="border: 1px solid var(--color-border); border-radius: 8px; overflow: hidden; background: var(--color-bg-card);">
        <blockquote class="instagram-media" data-instgrm-theme="dark" data-instgrm-permalink="https://www.instagram.com/p/${code}/" data-instgrm-version="14" style="background:#0a0a0a; border:0; margin:0; padding:0; width:100%;">
          <a href="https://www.instagram.com/p/${code}/" target="_blank">Instagram'da Gör</a>
        </blockquote>
      </div>
    `;
    feedContainer.insertAdjacentHTML('beforeend', embedHtml);
  });

  if (window.instgrm) {
    window.instgrm.Embeds.process();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInstagramEmbeds);
} else {
  initInstagramEmbeds();
}

// ===== PARALLAX EFFECT ON HERO =====
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-content');
  const scrolled = window.scrollY;

  if (scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    hero.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
  }
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 150;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        link.style.color = 'var(--color-gold)';
      } else {
        link.style.color = '';
      }
    }
  });
});
