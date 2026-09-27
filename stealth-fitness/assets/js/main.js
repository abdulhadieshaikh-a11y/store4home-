/* ==========================================================================
   STEALTH FITNESS — interactions
   No dependencies. Progressive enhancement: everything works without JS.
   ========================================================================== */

/* ---- Site settings: edit here -------------------------------------------
   INSTAGRAM_URL: paste the official Instagram profile URL to show the
   "Follow Stealth" buttons. Left empty on purpose: the handle has not been
   confirmed, so nothing links to a guessed account.                        */
const SITE = {
  INSTAGRAM_URL: '',
  PHONE_E164: '+923378031654',
  PHONE_DISPLAY: '0337 8031654',
  TIMEZONE: 'Asia/Karachi',
  // 0 = Sunday … 6 = Saturday. [open, close] in minutes after midnight.
  HOURS: { 1: [540, 1350], 2: [540, 1350], 3: [540, 1350], 4: [540, 1350], 5: [540, 1350], 6: [540, 1350] }
};

(() => {
  const doc = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  doc.classList.remove('no-js');
  doc.classList.add('js');

  /* ---------- page reveal & transitions ---------- */
  const curtain = $('.curtain');
  const ready = () => requestAnimationFrame(() => requestAnimationFrame(() => doc.classList.add('is-ready')));
  if (document.readyState === 'complete') ready(); else window.addEventListener('load', ready, { once: true });
  // safety: never keep the curtain down longer than necessary
  setTimeout(() => doc.classList.add('is-ready'), 1600);

  // restore when navigating back (bfcache)
  window.addEventListener('pageshow', e => {
    if (e.persisted && curtain) { curtain.classList.remove('is-covering'); doc.classList.add('is-ready'); }
  });

  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a || !curtain || reduceMotion) return;
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (a.target && a.target !== '_self') return;
    if (a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname)) return;
    if (url.pathname === location.pathname && url.hash) return; // same-page anchor
    e.preventDefault();
    closeMenu();
    curtain.classList.add('is-reset');
    void curtain.offsetWidth;
    curtain.classList.remove('is-reset');
    curtain.classList.add('is-covering');
    setTimeout(() => { location.href = url.href; }, 620);
  });

  /* ---------- navigation ---------- */
  const nav = $('.nav');
  const toggle = $('.nav__toggle');
  const menu = $('#menu');
  let lastY = window.scrollY;

  function closeMenu() {
    if (!doc.classList.contains('menu-open')) return;
    doc.classList.remove('menu-open');
    toggle && toggle.setAttribute('aria-expanded', 'false');
    toggle && (toggle.querySelector('.txt').textContent = 'Menu');
    menu && menu.setAttribute('aria-hidden', 'true');
    menu && menu.setAttribute('inert', '');
  }
  function openMenu() {
    doc.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.querySelector('.txt').textContent = 'Close';
    menu.setAttribute('aria-hidden', 'false');
    menu.removeAttribute('inert');
    const first = menu.querySelector('a');
    first && setTimeout(() => first.focus(), 350);
  }
  if (menu) menu.setAttribute('inert', '');
  toggle && toggle.addEventListener('click', () => doc.classList.contains('menu-open') ? closeMenu() : openMenu());
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && doc.classList.contains('menu-open')) { closeMenu(); toggle.focus(); }
  });
  window.matchMedia('(min-width: 1081px)').addEventListener('change', e => e.matches && closeMenu());

  /* ---------- scroll-driven state (single rAF loop) ---------- */
  const actionBar = $('.action-bar');
  const footer = $('.footer');
  const parallax = reduceMotion ? [] : $$('[data-parallax]');
  const hscroll = $('.hscroll');
  const track = hscroll && $('.hscroll__track', hscroll);
  const progress = hscroll && $('.hscroll__progress span', hscroll);
  const desktopH = window.matchMedia('(min-width: 1024px)');
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    const vh = window.innerHeight;
    if (nav) {
      nav.classList.toggle('is-scrolled', y > 40);
      const goingDown = y > lastY && y > vh * 0.9;
      nav.classList.toggle('is-hidden', goingDown && !doc.classList.contains('menu-open'));
    }
    if (actionBar) {
      const nearFooter = footer && footer.getBoundingClientRect().top < vh;
      actionBar.classList.toggle('is-on', y > vh * 0.6 && !nearFooter);
    }
    for (const el of parallax) {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) continue;
      const speed = parseFloat(el.dataset.parallax) || 0.12;
      const center = r.top + r.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
    }
    if (track && desktopH.matches && !reduceMotion) {
      const r = hscroll.getBoundingClientRect();
      const total = hscroll.offsetHeight - vh;
      const p = Math.min(1, Math.max(0, -r.top / total));
      const dist = track.scrollWidth - window.innerWidth;
      track.style.transform = `translate3d(${(-p * dist).toFixed(1)}px, 0, 0)`;
      progress && (progress.style.transform = `scaleX(${p.toFixed(3)})`);
    } else if (track) {
      track.style.transform = '';
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', () => requestAnimationFrame(onScroll));
  onScroll();

  /* ---------- reveal on view ---------- */
  const revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.01 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- program rows: cursor-follow preview (desktop) ---------- */
  const rows = $('.rows');
  if (rows && finePointer && !reduceMotion) {
    const pv = document.createElement('div');
    pv.className = 'cursor-preview'; pv.setAttribute('aria-hidden', 'true');
    const img = document.createElement('img'); img.alt = ''; pv.appendChild(img);
    document.body.appendChild(pv);
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    const loop = () => {
      cx += (tx - cx) * 0.14; cy += (ty - cy) * 0.14;
      pv.style.left = cx + 'px'; pv.style.top = cy + 'px';
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.3 ? requestAnimationFrame(loop) : null;
    };
    rows.addEventListener('pointermove', e => { tx = e.clientX + 40; ty = e.clientY; if (!raf) raf = requestAnimationFrame(loop); });
    $$('.row', rows).forEach(row => {
      const src = row.querySelector('.row__media img');
      row.addEventListener('pointerenter', e => {
        if (!src) return;
        img.src = src.currentSrc || src.src;
        if (!pv.classList.contains('is-on')) { cx = tx = e.clientX + 40; cy = ty = e.clientY; }
        pv.classList.add('is-on');
      });
    });
    rows.addEventListener('pointerleave', () => pv.classList.remove('is-on'));
    window.addEventListener('scroll', () => pv.classList.remove('is-on'), { passive: true });
  }

  /* ---------- lightbox gallery ---------- */
  const lb = $('#lightbox');
  const items = $$('[data-lightbox]');
  if (lb && items.length && typeof lb.showModal === 'function') {
    const lbImg = $('.lightbox__stage img', lb);
    const lbCap = $('[data-lb-caption]', lb);
    const lbCount = $('[data-lb-count]', lb);
    let idx = 0, opener = null;
    const show = i => {
      idx = (i + items.length) % items.length;
      const it = items[idx];
      lbImg.src = it.dataset.full;
      lbImg.alt = it.querySelector('img').alt;
      lbImg.style.animation = 'none'; void lbImg.offsetWidth; lbImg.style.animation = '';
      lbCap.textContent = it.dataset.caption || '';
      lbCount.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    };
    items.forEach((it, i) => it.addEventListener('click', e => { e.preventDefault(); opener = it; show(i); lb.showModal(); }));
    $('[data-lb-prev]', lb).addEventListener('click', () => show(idx - 1));
    $('[data-lb-next]', lb).addEventListener('click', () => show(idx + 1));
    $('[data-lb-close]', lb).addEventListener('click', () => lb.close());
    lb.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
    });
    lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lightbox__stage')) lb.close(); });
    lb.addEventListener('close', () => opener && opener.focus());
    let sx = null;
    lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => {
      if (sx === null) return; const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); sx = null;
    });
  }

  /* ---------- open / closed status (Karachi time) ---------- */
  const statusEls = $$('[data-status]');
  if (statusEls.length) {
    const update = () => {
      let day, mins;
      try {
        const parts = new Intl.DateTimeFormat('en-GB', { timeZone: SITE.TIMEZONE, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
        const get = t => parts.find(p => p.type === t).value;
        day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
        mins = parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10);
      } catch (_) { return; }
      const today = SITE.HOURS[day];
      const open = !!today && mins >= today[0] && mins < today[1];
      let text;
      if (open) {
        const left = today[1] - mins;
        text = left <= 60 ? 'Open now · closes 10:30 PM' : 'Open now · until 10:30 PM';
      } else if (today && mins < today[0]) {
        text = 'Closed · opens 9:00 AM today';
      } else {
        text = day === 6 || day === 0 ? 'Closed · opens Monday 9:00 AM' : 'Closed · opens 9:00 AM tomorrow';
      }
      statusEls.forEach(el => { el.textContent = text; el.classList.toggle('is-open', open); });
    };
    update(); setInterval(update, 60000);
  }

  /* ---------- Instagram links (only when a real URL is configured) ---------- */
  $$('[data-instagram]').forEach(el => {
    if (SITE.INSTAGRAM_URL) { el.href = SITE.INSTAGRAM_URL; el.hidden = false; }
    else { el.hidden = true; }
  });

  /* ---------- deferred map (no third-party requests until asked) ---------- */
  $$('[data-map-load]').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.locate__map');
      const iframe = document.createElement('iframe');
      iframe.src = wrap.dataset.mapSrc;
      iframe.title = 'Map showing Stealth Fitness, Khayaban-e-Rahat, DHA Phase 6, Karachi';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.allowFullscreen = true;
      wrap.querySelector('.map-load').remove();
      wrap.prepend(iframe);
    });
  });

  /* ---------- enquiry: compose a text message to the gym ---------- */
  const form = $('#enquiry');
  if (form) {
    const result = $('.form__result', form);
    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      $$('[required]', form).forEach(f => {
        const err = form.querySelector(`#${f.id}-err`);
        const bad = !f.value.trim() || (f.type === 'tel' && f.value.replace(/\D/g, '').length < 10);
        f.setAttribute('aria-invalid', bad ? 'true' : 'false');
        if (err) err.textContent = bad ? (f.type === 'tel' ? 'Please enter a valid phone number.' : 'This field is required.') : '';
        if (bad && ok) { f.focus(); ok = false; }
      });
      if (!ok) return;
      const d = new FormData(form);
      const msg = [
        'Hi Stealth Fitness — I’d like to start training.',
        `Name: ${d.get('name')}`,
        `Phone: ${d.get('phone')}`,
        d.get('interest') ? `Interested in: ${d.get('interest')}` : '',
        d.get('time') ? `Best time to visit: ${d.get('time')}` : '',
        d.get('message') ? `Note: ${d.get('message')}` : ''
      ].filter(Boolean).join('\n');
      const sms = `sms:${SITE.PHONE_E164}?&body=${encodeURIComponent(msg)}`;
      result.hidden = false;
      result.innerHTML = '';
      const p = document.createElement('p');
      p.textContent = 'Your message is ready. Send it by text, or call the front desk directly.';
      const row = document.createElement('div'); row.className = 'btn-row'; row.style.marginTop = '1.25rem';
      row.innerHTML = `<a class="btn" href="${sms}">Send text message</a><a class="btn btn--ghost" href="tel:${SITE.PHONE_E164}">Call ${SITE.PHONE_DISPLAY}</a>`;
      result.append(p, row);
      result.setAttribute('tabindex', '-1'); result.focus();
      if (window.matchMedia('(pointer: coarse)').matches) location.href = sms;
    });
  }

  /* ---------- year ---------- */
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
