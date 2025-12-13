/* script.js
   - Mobile nav toggle
   - Active link highlight based on current page
   - Smooth scrolling for anchor links (if used)
*/

document.addEventListener('DOMContentLoaded', function () {

  // NAV TOGGLE (mobile)
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  function setAria(expanded) {
    if (toggle) toggle.setAttribute('aria-expanded', String(expanded));
  }

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const expanded = navLinks.classList.contains('open');
      setAria(expanded);
    });

    // Close when clicking outside (mobile)
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
        navLinks.classList.remove('open');
        setAria(false);
      }
    });
  }

  // ACTIVE NAV LINK
  const links = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';

  links.forEach(a => {
    const href = a.getAttribute('href').toLowerCase();
    // mark active when href matches current file name
    if (href === currentPath || (href === 'index.html' && currentPath === '')) {
      a.classList.add('active');
    }

    // add smooth scroll for same-page anchors
    if (href.startsWith('#')) {
      a.addEventListener('click', (ev) => {
        ev.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        // close mobile menu after click
        navLinks.classList.remove('open');
        setAria(false);
      });
    }
  });

  // Optional: close mobile nav on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      navLinks.classList.remove('open');
      setAria(false);
    }
  });

});
