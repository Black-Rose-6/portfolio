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

  // ——— SARCATIC MODE (visibility toggle: no innerHTML for big sections) ———
  var sarcasticBtn = document.getElementById('sarcastic-btn');
  var sarcasticBtnText = document.getElementById('sarcastic-btn-text');
  var sarcasticOn = false;
  var originals = {};

  var sarcastic = {
    'hero-badge': 'Professional Number Wizard 🔮',
    'hero-title-line': "Hey, it's",
    'hero-title-name': 'Kartik Valecha',
    'hero-tagline': 'Data Scientist @ PlaySimple Games · I predict money so others don\'t have to. MMM, GenAI & telling people what their data is actually saying. You\'re welcome. 😏',
    'about-label': 'The legend begins 📜',
    'about-title': 'Making spreadsheets look smart',
    'about-para-1': "Hi, I'm Kartik Valecha — Data Scientist with <strong>2+ years</strong> of turning messy business problems into numbers that make sense. I do financial forecasting (company and product level), build ML pipelines from ingestion to deployment (because apparently one person can do it all 🙃), and ship solutions for LTV, churn, marketing optimization, and personalization. Pikachu, I choose you … and then we hit measurable gains in retention and ROI. At least revenue went up — can't say that for everyone. 📈",
    'about-para-2': "<strong>B.Tech (CSE)</strong> from JIIT, Noida · <strong>BSc Data Science & Applications</strong> from IIT Madras · and currently collecting another degree at <strong>BITS Pilani</strong> (M.Tech AI & ML). Yes, I like school. 🎓",
    'about-card-2': '<p>A few things about me:</p><p>I read (sometimes). I like numbers (obviously). I game—blame the job. I learn stuff: <strong>Deep Learning</strong>, <strong>AI</strong>, <strong>Web Dev</strong>, random universe facts. The usual. 🤷</p><code class="about-code">I AM LEARNING ALWAYS. (The models keep changing.)</code>',
    'exp-label': "Where I've been paid to think 💭",
    'exp-title': 'PlaySimple Games, Bengaluru (yes, we make games) 🎮',
    'edu-label': 'Piece of paper collection 📜',
    'edu-title': 'Institutions that had me 🏛️',
    'skills-label': 'Things I can put on LinkedIn',
    'skills-title': 'My digital weaponry ⚔️',
    'projects-label': 'Side quests 🎯',
    'projects-title': 'Things that actually shipped 🚀',
    'contact-label': 'Slide into my DMs 👀',
    'contact-title': "Or don't. I'll be here. ☕",
    'contact-location': '<i class="fas fa-map-marker-alt"></i> Delhi, India (chai & chaos) 🇮🇳',
    'footer-text': null
  };

  var swapIds = ['hero-badge', 'hero-title-line', 'hero-title-name', 'hero-tagline', 'about-label', 'about-title', 'about-para-1', 'about-para-2', 'about-card-2', 'exp-label', 'exp-title', 'edu-label', 'edu-title', 'skills-label', 'skills-title', 'projects-label', 'projects-title', 'contact-label', 'contact-title', 'contact-location', 'footer-text'];

  function saveOriginals() {
    swapIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && !originals[id]) originals[id] = el.innerHTML;
    });
  }
  function applySarcastic() {
    document.body.classList.add('sarcastic-mode');
    saveOriginals();
    swapIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (id === 'footer-text') {
        el.innerHTML = '© ' + new Date().getFullYear() + ' Kartik Valecha. Built with caffeine and sarcasm. 😌';
      } else if (sarcastic[id]) {
        el.innerHTML = sarcastic[id];
      }
    });
    if (sarcasticBtn) {
      sarcasticBtn.classList.add('active');
      sarcasticBtn.setAttribute('aria-pressed', 'true');
    }
    if (sarcasticBtnText) sarcasticBtnText.textContent = 'SARCATIC MODE OFF';
    if (document.getElementById('year')) document.getElementById('year').textContent = new Date().getFullYear();
    var dot = document.getElementById('cursor-dot');
    var spot = document.getElementById('cursor-spotlight');
    if (dot) dot.classList.add('glitch');
    if (spot) spot.classList.add('glitch');
    document.querySelectorAll('.cv-download-btn').forEach(function (btn) {
      btn.classList.remove('cv-hidden', 'cv-blown');
    });
  }
  function restoreOriginal() {
    document.body.classList.remove('sarcastic-mode');
    swapIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && originals[id]) el.innerHTML = originals[id];
    });
    if (sarcasticBtn) {
      sarcasticBtn.classList.remove('active');
      sarcasticBtn.setAttribute('aria-pressed', 'false');
    }
    if (sarcasticBtnText) sarcasticBtnText.textContent = 'SARCATIC MODE ON';
    yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    var dot = document.getElementById('cursor-dot');
    var spot = document.getElementById('cursor-spotlight');
    if (dot) dot.classList.remove('glitch');
    if (spot) spot.classList.remove('glitch');
    document.querySelectorAll('.cv-download-btn').forEach(function (btn) {
      btn.classList.remove('cv-hidden', 'cv-blown');
    });
  }
  function toggleSarcastic() {
    sarcasticOn = !sarcasticOn;
    if (sarcasticOn) applySarcastic();
    else restoreOriginal();
  }
  if (sarcasticBtn) sarcasticBtn.addEventListener('click', toggleSarcastic);
  document.querySelectorAll('.cv-download-btn').forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      if (!document.body.classList.contains('sarcastic-mode')) return;
      var all = document.querySelectorAll('.cv-download-btn');
      var alreadyBlown = Array.prototype.every.call(all, function (b) { return b.classList.contains('cv-blown'); });
      if (alreadyBlown) return;
      var self = this;
      self.classList.add('cv-blown');
      all.forEach(function (b) {
        if (b !== self) {
          setTimeout(function () { b.classList.add('cv-blown'); }, 340);
        }
      });
    });
  });
})();
