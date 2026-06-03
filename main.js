/**
 * MIROSLAV ŠEBESTA - UMĚLECKÝ TRUHLÁŘ
 * Main Interactivity and Animations Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initCategoryFilter();
});

/**
 * Navbar scroll behavior: Adds a class when user scrolls down
 */
function initNavbar() {
  const navbar = document.querySelector('nav');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Initial check in case page is loaded scrolled down
  handleScroll();
}

/**
 * Mobile responsive menu drawer toggle
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    const isActive = menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active', isActive);
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

/**
 * Intersection Observer for scrolling reveal animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once visible, we can unobserve if we only want the animation to run once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Product category filter for the E-shop page
 */
function initCategoryFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const products = document.querySelectorAll('.product-item');
  if (filterButtons.length === 0 || products.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Deactivate all buttons, activate clicked
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const selectedCategory = button.getAttribute('data-category');

      products.forEach(product => {
        const productCategory = product.getAttribute('data-category');

        if (selectedCategory === 'all' || productCategory === selectedCategory) {
          // Show product
          product.style.display = 'flex';
          // Force reflow
          void product.offsetHeight;
          // Apply opacity transition
          product.style.opacity = '1';
          product.style.transform = 'translateY(0)';
        } else {
          // Hide product with a smooth transition
          product.style.opacity = '0';
          product.style.transform = 'translateY(20px)';
          // Wait for transition to complete before setting display none
          setTimeout(() => {
            if (button.getAttribute('data-category') !== 'all' && product.getAttribute('data-category') !== button.getAttribute('data-category')) {
              product.style.display = 'none';
            }
          }, 300); // matches style transitions
        }
      });
    });
  });
}
