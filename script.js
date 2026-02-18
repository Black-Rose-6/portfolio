(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Cursor spotlight + small light (only for pointer devices; foreground untouched)
  var spotlight = document.getElementById('cursor-spotlight');
  var cursorDot = document.getElementById('cursor-dot');
  var mouseX = 0;
  var mouseY = 0;
  var spotlightX = 0;
  var spotlightY = 0;
  var dotX = 0;
  var dotY = 0;
  var raf = null;
  var pointerFine = window.matchMedia('(pointer: fine)').matches;

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot && !cursorDot.classList.contains('active')) {
      cursorDot.classList.add('active');
      if (spotlight) spotlight.classList.add('active');
    }
  }
  function onMouseLeave() {
    if (cursorDot) cursorDot.classList.remove('active');
    if (spotlight) spotlight.classList.remove('active');
  }
  function tick() {
    spotlightX += (mouseX - spotlightX) * 0.12;
    spotlightY += (mouseY - spotlightY) * 0.12;
    dotX += (mouseX - dotX) * 0.35;
    dotY += (mouseY - dotY) * 0.35;
    if (spotlight) {
      spotlight.style.left = spotlightX + 'px';
      spotlight.style.top = spotlightY + 'px';
    }
    if (cursorDot) {
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';
    }
    raf = requestAnimationFrame(tick);
  }
  if (pointerFine && spotlight && cursorDot) {
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    raf = requestAnimationFrame(tick);
  }

  // Header scroll effect
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  function toggleMenu() {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  }
  navToggle.addEventListener('click', toggleMenu);
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) toggleMenu();
    });
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const timelineItems = document.querySelectorAll('.timeline-item');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  timelineItems.forEach(function (el, i) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = i * 0.12 + 's';
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    );
    observer.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
