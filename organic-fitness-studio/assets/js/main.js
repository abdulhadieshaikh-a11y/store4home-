/* ==========================================================================
   ORGANIC FITNESS STUDIO — interactions
   Vanilla JS, no dependencies. Every effect is progressive: the page is
   complete without JavaScript and respects prefers-reduced-motion.
   ========================================================================== */
(function () {
  'use strict';

  var STUDIO_PHONE = '+923358229378';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Image fade-in once decoded ---------- */
  $$('.media img').forEach(function (img) {
    var done = function () { img.classList.add('is-loaded'); };
    if (img.complete && img.naturalWidth) done();
    else img.addEventListener('load', done);
  });

  /* ---------- Hero intro ---------- */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { document.body.classList.add('is-ready'); });
  });

  /* ---------- Navigation: scrolled state + hide on scroll down ---------- */
  var nav = $('[data-nav]');
  var lastY = window.scrollY;
  function onNavScroll() {
    var y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    var goingDown = y > lastY && y > window.innerHeight * 0.9;
    if (!document.documentElement.classList.contains('menu-open')) nav.classList.toggle('is-hidden', goingDown);
    lastY = y;
  }

  /* ---------- Mobile menu ---------- */
  var menu = $('[data-menu]');
  var toggle = $('[data-menu-toggle]');
  function setMenu(open) {
    var root = document.documentElement;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.visually-hidden').textContent = open ? 'Close menu' : 'Open menu';
    if (open) {
      menu.hidden = false;
      root.classList.add('menu-open');
      nav.classList.remove('is-hidden');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(function () { menu.classList.add('is-open'); });
      setTimeout(function () { var first = menu.querySelector('a'); first && first.focus(); }, 400);
    } else {
      menu.classList.remove('is-open');
      root.classList.remove('menu-open');
      document.body.style.overflow = '';
      setTimeout(function () { if (!menu.classList.contains('is-open')) menu.hidden = true; }, reduceMotion ? 0 : 900);
    }
  }
  toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
  $$('[data-menu-link]').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
  });
  window.addEventListener('resize', function () { if (window.innerWidth > 1023 && menu.classList.contains('is-open')) setMenu(false); });

  /* ---------- Reveal on scroll ---------- */
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    $$('.reveal, .reveal-img').forEach(function (el, i) {
      // gentle stagger for siblings revealed together
      var sibs = el.parentElement ? $$(':scope > .reveal, :scope > .reveal-img', el.parentElement) : [];
      var idx = sibs.indexOf(el);
      if (idx > 0) el.style.transitionDelay = Math.min(idx * 0.09, 0.45) + 's';
      io.observe(el);
    });
  } else {
    $$('.reveal, .reveal-img').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Parallax + statement drift (one rAF loop, transforms only) ---------- */
  // Uses the independent `translate` property so it never fights reveal/zoom transforms.
  var speedEls = $$('[data-speed]');
  var parallaxImgs = $$('.parallax-img');
  var driftEls = $$('[data-drift]');
  var statement = $('.statement');
  var ticking = false;

  function inView(rect, pad) { return rect.bottom > -pad && rect.top < window.innerHeight + pad; }

  function renderMotion() {
    ticking = false;
    var vh = window.innerHeight;
    speedEls.forEach(function (el) {
      var r = el.parentElement.getBoundingClientRect();
      if (!inView(r, 200)) return;
      var offset = (r.top + r.height / 2 - vh / 2) * -parseFloat(el.dataset.speed);
      el.style.translate = '0 ' + offset.toFixed(1) + 'px';
    });
    parallaxImgs.forEach(function (img) {
      var box = img.parentElement.getBoundingClientRect();
      if (!inView(box, 100)) return;
      var p = (box.top + box.height / 2 - vh / 2) / (vh + box.height); // ~ -0.5..0.5
      img.style.translate = '0 ' + (p * -box.height * 0.1 - box.height * 0.05).toFixed(1) + 'px';
    });
    if (statement) {
      var sr = statement.getBoundingClientRect();
      if (inView(sr, 0)) {
        var prog = (vh - sr.top) / (vh + sr.height) - 0.5; // -0.5..0.5
        var amt = Math.min(window.innerWidth * 0.05, 70);
        driftEls.forEach(function (el) {
          el.style.translate = (prog * amt * 2 * parseFloat(el.dataset.drift)).toFixed(1) + 'px 0';
        });
      }
    }
    renderEquip();
  }
  function requestTick() { if (!ticking) { ticking = true; requestAnimationFrame(renderMotion); } }

  /* ---------- Equipment: pinned horizontal scroll on large screens ---------- */
  var equip = $('[data-equip]');
  var track = $('[data-equip-track]');
  var bar = $('[data-equip-bar]');
  var pinned = false;
  var travel = 0;

  function setupEquip() {
    if (!equip) return;
    var shouldPin = !reduceMotion && window.innerWidth >= 1024;
    equip.classList.toggle('is-pinned', shouldPin);
    pinned = shouldPin;
    if (!pinned) { equip.style.height = ''; track.style.transform = ''; return; }
    travel = Math.max(0, track.scrollWidth - window.innerWidth);
    equip.style.height = (window.innerHeight + travel) + 'px';
  }
  function renderEquip() {
    if (!equip) return;
    var r = equip.getBoundingClientRect();
    var total = r.height - window.innerHeight;
    var p;
    if (pinned) {
      p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      track.style.transform = 'translate3d(' + (-p * travel).toFixed(1) + 'px,0,0)';
    } else {
      var max = track.scrollWidth - track.clientWidth;
      p = max > 0 ? track.scrollLeft / max : 0;
    }
    if (bar) bar.style.transform = 'scaleX(' + Math.max(0.06, p).toFixed(3) + ')';
  }
  if (track) track.addEventListener('scroll', function () { if (!pinned) renderEquip(); }, { passive: true });

  window.addEventListener('scroll', function () { onNavScroll(); if (!reduceMotion) requestTick(); else renderEquip(); }, { passive: true });
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { setupEquip(); requestTick(); }, 150);
  });
  window.addEventListener('load', function () { setupEquip(); requestTick(); });
  setupEquip();
  onNavScroll();
  requestTick();

  /* ---------- Experience: hover / focus switches the sticky image ---------- */
  var expItems = $$('[data-exp-item]');
  var expFrames = $$('[data-exp-media]');
  var expCount = $('[data-exp-count]');
  var expCurrent = 0;
  function setExp(i) {
    if (i === expCurrent) return;
    var prev = expCurrent;
    expCurrent = i;
    expItems.forEach(function (li, k) {
      li.classList.toggle('is-active', k === i);
      li.querySelector('.exp__trigger').setAttribute('aria-pressed', String(k === i));
    });
    expFrames.forEach(function (f, k) {
      f.classList.remove('is-leaving');
      if (k === prev) f.classList.add('is-leaving');
      f.classList.toggle('is-active', k === i);
    });
    if (expCount) expCount.textContent = '0' + (i + 1);
  }
  expItems.forEach(function (li, i) {
    var btn = li.querySelector('.exp__trigger');
    btn.addEventListener('mouseenter', function () { setExp(i); });
    btn.addEventListener('focus', function () { setExp(i); });
    btn.addEventListener('click', function () { setExp(i); });
  });

  /* ---------- Facilities lightbox ---------- */
  var lightbox = $('[data-lightbox]');
  var galleryItems = $$('[data-gallery] .gallery__item');
  var lbImg = $('[data-lightbox-img]');
  var lbCap = $('[data-lightbox-cap]');
  var lbCount = $('[data-lightbox-count]');
  var lbIndex = 0;
  var lbReturn = null;

  function showLightbox(i) {
    lbIndex = (i + galleryItems.length) % galleryItems.length;
    var src = galleryItems[lbIndex].querySelector('img');
    var photo = src.dataset.photo;
    lbImg.style.animation = 'none'; void lbImg.offsetWidth; lbImg.style.animation = '';
    lbImg.src = 'https://images.unsplash.com/photo-' + photo + '?auto=format&fit=max&q=80&w=' + (window.innerWidth > 1400 ? 2400 : 1600);
    lbImg.alt = src.alt;
    lbCap.textContent = galleryItems[lbIndex].dataset.caption;
    lbCount.textContent = String(lbIndex + 1).padStart(2, '0') + ' / ' + String(galleryItems.length).padStart(2, '0');
  }
  if (lightbox && typeof lightbox.showModal === 'function') {
    galleryItems.forEach(function (item, i) {
      item.addEventListener('click', function () {
        lbReturn = item;
        showLightbox(i);
        lightbox.showModal();
        document.body.style.overflow = 'hidden';
      });
    });
    $('[data-prev]', lightbox).addEventListener('click', function () { showLightbox(lbIndex - 1); });
    $('[data-next]', lightbox).addEventListener('click', function () { showLightbox(lbIndex + 1); });
    $('[data-close]', lightbox).addEventListener('click', function () { lightbox.close(); });
    lightbox.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') showLightbox(lbIndex - 1);
      if (e.key === 'ArrowRight') showLightbox(lbIndex + 1);
    });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) lightbox.close(); });
    lightbox.addEventListener('close', function () { document.body.style.overflow = ''; lbReturn && lbReturn.focus(); });
    // swipe
    var sx = null;
    lightbox.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) showLightbox(lbIndex + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }

  /* ---------- Book a visit dialog ---------- */
  var book = $('[data-book-dialog]');
  var bookReturn = null;
  if (book && typeof book.showModal === 'function') {
    $$('[data-book]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        bookReturn = a;
        var open = function () { book.showModal(); document.body.style.overflow = 'hidden'; };
        if (menu.classList.contains('is-open')) setTimeout(open, 350); else open();
      });
    });
    $('[data-close]', book).addEventListener('click', function () { book.close(); });
    book.addEventListener('click', function (e) { if (e.target === book) book.close(); });
    book.addEventListener('close', function () { document.body.style.overflow = ''; bookReturn && bookReturn.focus(); });

    var form = $('[data-book-form]');
    var err = $('[data-book-error]');
    var dateInput = form.elements.date;
    var today = new Date();
    dateInput.min = today.toISOString().slice(0, 10);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var date = dateInput.value;
      if (!name || !date) {
        err.textContent = !name ? 'Please add your name.' : 'Please choose a preferred day.';
        err.hidden = false;
        (!name ? form.elements.name : dateInput).focus();
        return;
      }
      err.hidden = true;
      var d = new Date(date + 'T12:00:00');
      var nice = d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
      var interest = form.elements.interest.value;
      var msg = 'Hello Organic Fitness Studio, I would like to book a visit.\n' +
        'Name: ' + name + '\nPreferred day: ' + nice + ' (' + form.elements.time.value.toLowerCase() + ')' +
        (interest ? '\nInterested in: ' + interest : '');
      var sep = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent) ? '&' : '?';
      window.location.href = 'sms:' + STUDIO_PHONE + sep + 'body=' + encodeURIComponent(msg);
    });
  } else {
    // No <dialog> support: fall back to the contact section
    $$('[data-book]').forEach(function (a) { a.setAttribute('href', '#contact'); });
  }

  /* ---------- Opening status (studio's local time, Asia/Karachi) ---------- */
  (function () {
    var status = $('[data-open-status]');
    var parts;
    try {
      parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
        .formatToParts(new Date()).reduce(function (o, p) { o[p.type] = p.value; return o; }, {});
    } catch (e) { return; }
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday);
    var mins = parseInt(parts.hour, 10) * 60 + parseInt(parts.minute, 10);
    var sunday = day === 0;
    var open = sunday ? 17 * 60 : 7 * 60;
    var close = sunday ? 20 * 60 : 23 * 60 + 30;
    var hoursText = sunday ? '5:00 PM – 8:00 PM' : '7:00 AM – 11:30 PM';
    var isOpen = mins >= open && mins < close;

    $$('[data-hours] > div').forEach(function (row) {
      var d = row.dataset.days;
      row.classList.toggle('is-today', sunday ? d === '0' : d === '1-6');
    });
    if (status) {
      status.innerHTML = '';
      var dot = document.createElement('span');
      dot.className = 'dot';
      dot.setAttribute('aria-hidden', 'true');
      if (!isOpen) dot.style.background = 'rgba(242,236,225,0.45)';
      status.appendChild(dot);
      status.appendChild(document.createTextNode((isOpen ? 'Open now · ' : 'Today · ') + hoursText));
    }
  })();

  /* ---------- Testimonials (activates automatically when real ones are added) ---------- */
  (function () {
    var list = $('[data-testimonials]');
    if (!list) return;
    var items = $$('.voice:not(.voices__empty)', list);
    if (items.length < 2) return;
    var nav2 = $('[data-testimonial-nav]');
    var i = 0;
    function show(n) {
      i = (n + items.length) % items.length;
      items.forEach(function (it, k) { it.setAttribute('aria-hidden', String(k !== i)); });
    }
    nav2.hidden = false;
    $('[data-prev]', nav2).addEventListener('click', function () { show(i - 1); });
    $('[data-next]', nav2).addEventListener('click', function () { show(i + 1); });
    show(0);
  })();

  /* ---------- Lazy map (only when near the viewport) ---------- */
  var mapFrame = $('[data-map] iframe');
  if (mapFrame) {
    var loadMap = function () { if (!mapFrame.src) mapFrame.src = mapFrame.dataset.src; };
    if ('IntersectionObserver' in window) {
      var mio = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { loadMap(); mio.disconnect(); } }, { rootMargin: '400px' });
      mio.observe(mapFrame);
    } else loadMap();
  }

  /* ---------- Year ---------- */
  var y = $('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
