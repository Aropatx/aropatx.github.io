/* =========================================================
   Efekty wizualne: tło z cyfr 0/1, poświata kursora,
   paralaksa banera i wyróżnień, magnetyczny przycisk pobierania.
   ========================================================= */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

  window.addEventListener('pointermove', (e) => { mouse.tx = e.clientX; mouse.ty = e.clientY; }, { passive: true });
  document.addEventListener('pointerleave', () => { mouse.tx = -9999; mouse.ty = -9999; });

  /* ---------------- Binary rain (0/1) ---------------- */
  const canvas = document.getElementById('binary');
  if (canvas) {
    const ctx = canvas.getContext('2d', { alpha: true });
    const FONT = 14;          // px, character size
    const COL_W = 24;         // px, column spacing
    const LINE = FONT + 5;
    let W = 0, H = 0, dpr = 1, cols = [];

    function makeCol(initial) {
      return {
        y: initial ? Math.random() * H : -Math.random() * H * 0.6,
        speed: 0.5 + Math.random() * 1.3,
        len: 6 + Math.floor(Math.random() * 16),
        chars: Array.from({ length: 40 }, () => (Math.random() > 0.5 ? '1' : '0')),
        active: Math.random() > 0.45,
      };
    }
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.ceil(W / COL_W);
      cols = Array.from({ length: n }, (_, i) => cols[i] || makeCol(true));
    }

    // Static faint field of digits underneath the rain
    let field = null;
    function buildField() {
      field = document.createElement('canvas');
      field.width = canvas.width; field.height = canvas.height;
      const f = field.getContext('2d');
      f.setTransform(dpr, 0, 0, dpr, 0, 0);
      f.font = `500 ${FONT - 3}px "Geist Mono", ui-monospace, monospace`;
      f.textBaseline = 'top';
      for (let x = 0; x < W; x += COL_W) {
        for (let y = 0; y < H; y += LINE + 1) {
          if (Math.random() > 0.5) continue;
          f.fillStyle = `rgba(212, 175, 55, ${0.02 + Math.random() * 0.045})`;
          f.fillText(Math.random() > 0.5 ? '1' : '0', x + 4, y);
        }
      }
    }

    let last = 0;
    function frame(now) {
      requestAnimationFrame(frame);
      if (document.hidden) return;
      if (now - last < 1000 / 30) return; // 30 fps is plenty
      last = now;

      if (!W || !H) return;
      ctx.clearRect(0, 0, W, H);
      if (field && field.width && field.height) ctx.drawImage(field, 0, 0, W, H);
      ctx.font = `600 ${FONT}px "Geist Mono", ui-monospace, monospace`;
      ctx.textBaseline = 'top';

      const mx = mouse.x, my = mouse.y;
      for (let i = 0; i < cols.length; i++) {
        const c = cols[i];
        if (!c.active) { if (Math.random() < 0.002) c.active = true; continue; }
        const x = i * COL_W + 4;
        for (let k = 0; k < c.len; k++) {
          const y = c.y - k * LINE;
          if (y < -FONT || y > H) continue;
          const fade = 1 - k / c.len;
          const dx = x - mx, dy = y - my;
          const near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 240);
          const a = (k === 0 ? 0.5 : 0.16 * fade) + near * 0.55 * fade;
          ctx.fillStyle = k === 0 ? `rgba(255, 238, 180, ${a})` : `rgba(212, 175, 55, ${a})`;
          if (Math.random() < 0.015) c.chars[k] = c.chars[k] === '1' ? '0' : '1';
          ctx.fillText(c.chars[k], x, y);
        }
        c.y += c.speed * 2;
        if (c.y - c.len * LINE > H) Object.assign(c, makeCol(false));
      }
    }

    resize(); buildField();
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { resize(); buildField(); }, 150); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildField);

    if (reduceMotion) {
      requestAnimationFrame(() => { ctx.clearRect(0, 0, W, H); if (field && field.width && field.height) ctx.drawImage(field, 0, 0, W, H); });
    } else {
      requestAnimationFrame(frame);
    }
  }

  /* ---------------- Cursor glow + smoothed mouse ---------------- */
  const glow = document.getElementById('cursorGlow');
  function tick() {
    mouse.x += (mouse.tx - mouse.x) * 0.18;
    mouse.y += (mouse.ty - mouse.y) * 0.18;
    if (glow) glow.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
    requestAnimationFrame(tick);
  }
  if (fineHover && !reduceMotion) { document.body.classList.add('has-glow'); requestAnimationFrame(tick); }
  else { mouse.x = mouse.tx; mouse.y = mouse.ty; }

  if (fineHover && !reduceMotion) {
    /* ---------------- Banner / spotlight parallax ---------------- */
    let lastPar = null;
    document.addEventListener('pointermove', (e) => {
      const el = e.target.closest && e.target.closest('.banner, .spot__slide.is-active');
      if (lastPar && lastPar !== el) { lastPar.style.setProperty('--px', 0); lastPar.style.setProperty('--py', 0); }
      lastPar = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    }, { passive: true });

    /* ---------------- Magnetic download button ---------------- */
    document.addEventListener('pointermove', (e) => {
      const b = e.target.closest && e.target.closest('.btn--xl');
      document.querySelectorAll('.btn--xl.is-magnet').forEach((x) => { if (x !== b) { x.classList.remove('is-magnet'); x.style.translate = ''; } });
      if (!b) return;
      const r = b.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.1;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.22;
      b.classList.add('is-magnet');
      b.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
    }, { passive: true });
  }

  /* ---------------- Click ripple on buttons ---------------- */
  document.addEventListener('pointerdown', (e) => {
    const el = e.target.closest && e.target.closest('.btn, .tile__dl');
    if (!el || reduceMotion) return;
    const r = el.getBoundingClientRect();
    const s = document.createElement('span');
    s.className = 'ripple';
    const size = Math.max(r.width, r.height) * 2;
    s.style.width = s.style.height = size + 'px';
    s.style.left = (e.clientX - r.left - size / 2) + 'px';
    s.style.top = (e.clientY - r.top - size / 2) + 'px';
    el.appendChild(s);
    setTimeout(() => s.remove(), 700);
  });
})();
