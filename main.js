/* ─────────────────────────────────────────────────
   Haulencia — main.js
   ───────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav scroll shadow ─────────────────────────── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });

  /* ── Smooth scroll for nav links ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Scroll-reveal on sections ────────────────── */
  const revealEls = document.querySelectorAll(
    '.section, .story, .newsletter, .testi-card, .product-card'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  // Add base reveal styles via JS so CSS file stays clean
  const revealStyle = document.createElement('style');
  revealStyle.textContent = `
    .section, .story, .newsletter, .testi-card, .product-card {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    .testi-card:nth-child(2) { transition-delay: 0.12s; }
    .testi-card:nth-child(3) { transition-delay: 0.24s; }
    .product-card:nth-child(2) { transition-delay: 0.1s; }
    .product-card:nth-child(3) { transition-delay: 0.2s; }
    .product-card:nth-child(4) { transition-delay: 0.3s; }
  `;
  document.head.appendChild(revealStyle);

  revealEls.forEach(el => observer.observe(el));

  /* ── Quick View button ────────────────────────── */
  document.querySelectorAll('.overlay-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      const name = card.querySelector('.product-name')?.textContent || 'Product';
      const price = card.querySelector('.product-price')?.textContent || '';
      showToast(`✦ ${name} — ${price} · Added to bag`);
    });
  });

  /* ── Newsletter form ──────────────────────────── */
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    const btn = newsletterForm.querySelector('button');
    const input = newsletterForm.querySelector('input');

    btn.addEventListener('click', () => {
      const email = input.value.trim();
      if (!email || !email.includes('@')) {
        input.style.borderColor = 'rgba(201,100,76,0.6)';
        input.placeholder = 'Please enter a valid email';
        setTimeout(() => {
          input.style.borderColor = '';
          input.placeholder = 'Your email address';
        }, 2000);
        return;
      }
      input.value = '';
      input.placeholder = 'Your email address';
      showToast('✦ Welcome to the inner circle, beautiful soul.');
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') btn.click();
    });
  }

  /* ── Primary CTA buttons ──────────────────────── */
  document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.addEventListener('click', () => {
      // Scroll to products section
      const products = document.querySelector('.products-grid');
      if (products) products.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── Ghost "Our Story" button ─────────────────── */
  document.querySelectorAll('.btn-ghost').forEach(btn => {
    btn.addEventListener('click', () => {
      const story = document.querySelector('.story');
      if (story) story.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── Toast helper ─────────────────────────────── */
  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('show'), 3500);
  }

});
