// Detalles de Navidad: guirnalda con una esfera por equipo de la Liguilla en las esquinas de arriba, junto a "Bolsa estimada".
// Por ahora solo en los Registro-N de onlyRegistros
(function() {
  try {
    // ======== CONFIGURACIÓN ========
    const onlyRegistros = ['1','2','4','14']; // N de Registro-N donde se muestra (vacío = en todos)
    const showGuirnalda = true;
    const maxCornerWidth = 180; // px; en celular se ajusta al espacio libre junto a "Bolsa estimada"
    const leftItems = ['pachuca', 'atlas', 'america', 'estrella', 'toluca']; // de izquierda a derecha en pantalla
    const rightItems = ['leon', 'chivas', 'cruzazul', 'monterrey', 'estrella'];
    // ===============================

    const slug = typeof vendorSlug !== 'undefined' ? vendorSlug : '1';
    if (onlyRegistros.length && onlyRegistros.indexOf(slug) === -1) return;

    const style = document.createElement('style');
    style.textContent = `
      .nv-corner { position: absolute; top: 0; overflow: hidden; pointer-events: none; z-index: 998; }
      #bolsa { position: relative; z-index: 999; }
      .nv-corner > svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: visible; }
      .nv-orn { position: absolute; transform-origin: 50% 0;
        transform: rotate(var(--tilt)); animation: nv-swing var(--dur) ease-in-out var(--delay) infinite; }
      .nv-orn svg { display: block; width: 100%; height: auto; overflow: visible;
        filter: drop-shadow(0 1px 1.5px rgba(0, 0, 0, .45)); }
      .nv-corner.nv-in .nv-orn svg { animation: nv-drop .7s cubic-bezier(.3, 1.5, .5, 1) both; }
      .nv-tinsel { animation: nv-twinkle 2.4s ease-in-out infinite; }

      @keyframes nv-drop { from { transform: translateY(-60%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes nv-swing {
        0%, 100% { transform: rotate(calc(var(--tilt) - 4deg)); }
        50% { transform: rotate(calc(var(--tilt) + 4deg)); }
      }
      @keyframes nv-twinkle { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }

      @media (prefers-reduced-motion: reduce) {
        .nv-orn, .nv-orn svg, .nv-tinsel { animation: none; }
      }
    `;

    const defsSVG = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
      <clipPath id="nv-clip"><circle cx="10" cy="0" r="7"/></clipPath>
      <radialGradient id="nv-shade" cx="35%" cy="30%" r="75%">
        <stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/>
        <stop offset=".8" stop-color="#000" stop-opacity=".15"/><stop offset="1" stop-color="#000" stop-opacity=".5"/>
      </radialGradient>
      <radialGradient id="nv-gold" cx="35%" cy="30%" r="75%">
        <stop offset="0" stop-color="#fff2b3"/><stop offset=".55" stop-color="#e0b23a"/><stop offset="1" stop-color="#7a560c"/>
      </radialGradient></defs></svg>`;

    const polar = (cx, cy, r, deg) => {
      const a = deg * Math.PI / 180;
      return (cx + r * Math.cos(a)).toFixed(2) + ' ' + (cy + r * Math.sin(a)).toFixed(2);
    };
    const star = (cx, cy, r) => 'M' + Array.from({ length: 10 }, (_, k) => polar(cx, cy, k % 2 ? r * .45 : r, -90 + k * 36)).join('L') + 'Z';

    const stripes = (a, b, w) => `<rect x="3" y="-7" width="14" height="14" fill="${b}"/>` +
      Array.from({ length: Math.ceil(14 / (2 * w)) }, (_, k) => `<rect x="${(3 + k * 2 * w).toFixed(2)}" y="-7" width="${w}" height="14" fill="${a}"/>`).join('');

    const teams = {
      pachuca: { name: 'Pachuca', fill: `<rect x="3" y="-7" width="7" height="14" fill="#0b3d91"/><rect x="10" y="-7" width="7" height="14" fill="#fff"/>` },
      atlas: { name: 'Atlas', fill: stripes('#d0102b', '#111', 2.8) },
      america: { name: 'América', fill: `<rect x="3" y="-7" width="14" height="14" fill="#ffd200"/>` +
        `<ellipse cx="10" cy="0" rx="4.3" ry="6.3" fill="none" stroke="#14213d" stroke-width=".45"/>` +
        `<path d="M3.9 -2.6Q10 -4.2 16.1 -2.6" fill="none" stroke="#14213d" stroke-width=".45"/>` +
        `<path fill="#14213d" d="M8.26 -4.03L11.06 -5.13L13 -4.45L12.5 -3.18L11.48 -2.08L10.8 -.89L10.3 -.21L9.79 -.89L8.94 -2.08L8.09 -2.93Z` +
        ` M10.64 .13L12.16 .81L12.5 1.91L11.82 3.6L11.14 5.3L10.8 4.03L10.47 2.16L10.3 .81Z"/>` +
        `<path d="M8.48 2.08A2.1 2.1 0 1 1 8.48 -.88" fill="none" stroke="#14213d" stroke-width="1.6"/>` +
        `<path d="M8.48 2.08A2.1 2.1 0 1 1 8.48 -.88" fill="none" stroke="#e4002b" stroke-width="1"/>` +
        `<path fill-rule="evenodd" fill="#e4002b" stroke="#14213d" stroke-width=".35" paint-order="stroke" d="M11.6 3L13 -1.6H13.9L15.3 3H14.3L14 2H12.9L12.6 3Z M13.15 1.15H13.75L13.45 0Z"/>` +
        `<circle cx="10" cy="0" r="6.55" fill="none" stroke="#14213d" stroke-width=".9"/>` },
      toluca: { name: 'Toluca', fill: `<rect x="3" y="-7" width="14" height="14" fill="#fff"/>` +
        `<path d="M15.33 1.68A5.59 5.59 0 1 1 15.33 -1.68" fill="none" stroke="#ad1c2f" stroke-width=".95"/>` +
        `<path fill-rule="evenodd" fill="#ad1c2f" d="M10.03 -4.39A4.4 4.4 0 0 0 6.23 -2.22L6.78 -1.65V1.51L6.23 2.05A4.4 4.4 0 0 0 10.03 4.27Z M7.75 -2.37L8.73 -3.07V2.97L7.75 2.28Z` +
        ` M10.25 -4.39A4.4 4.4 0 0 1 13.99 -1.9H12.93L12.14 -2.69V3.88L10.83 4.27V-3.29H10.25Z"/>` },
      leon: { name: 'León', fill: `<rect x="3" y="-7" width="14" height="14" fill="#1b7a52"/>` +
        `<circle cx="10" cy="0" r="6.5" fill="none" stroke="#a07843" stroke-width=".9"/>` +
        `<circle cx="10" cy=".2" r="3.95" fill="#fff"/>` +
        `<circle cx="10" cy=".2" r="3.55" fill="none" stroke="#1b7a52" stroke-width=".25"/>` +
        `<circle cx="4.85" cy=".2" r=".4" fill="#a07843"/><circle cx="15.15" cy=".2" r=".4" fill="#a07843"/>` +
        `<path fill="#a07843" d="M8.6 -2.6L9.4 -3.2L10.6 -3.1L11.2 -2L11 -.6L12.2 -2.4L12.7 -2.6L12.4 -2L11.6 .2L11.8 1.6L12.4 3H11.6L11 2H10.2L9.2 3H8.5L9.4 1.4L9.2 .2L7.8 .6L7.6 .1L8.8 -.6L7.6 -1.2L7.5 -1.7L8.9 -1.4L8.7 -2.1Z"/>` +
        `<path fill="#a07843" d="M7.7 -4.5L7.4 -6Q8.7 -6.7 10 -5.9Q11.3 -6.7 12.6 -6L12.3 -4.5Z"/>` +
        `<circle cx="10" cy="-5.05" r=".38" fill="#1b7a52"/><circle cx="8.6" cy="-4.95" r=".26" fill="#1b7a52"/><circle cx="11.4" cy="-4.95" r=".26" fill="#1b7a52"/>` },
      chivas: { name: 'Guadalajara', fill: stripes('#d4002a', '#fff', 2.8) },
      cruzazul: { name: 'Cruz Azul', fill: `<rect x="3" y="-7" width="14" height="14" fill="#00449e"/>` +
        `<circle cx="10" cy="0" r="5.9" fill="none" stroke="#fff" stroke-width=".7" stroke-dasharray=".7 .45" opacity=".85"/>` +
        `<circle cx="10" cy="0" r="4.7" fill="#fff" stroke="#d0102b" stroke-width=".6"/>` +
        `<path fill="#00449e" stroke="#d0102b" stroke-width=".35" paint-order="stroke" d="M8.95 -3.5H11.05V3.5H8.95Z M6.5 -1.05H13.5V1.05H6.5Z"/>` },
      monterrey: { name: 'Monterrey', fill: stripes('#0b1f4f', '#fff', 1.4) }
    };

    function ornamentSVG(id, len) {
      const string = `<path d="M10 0V${len + .5}" stroke="rgba(245,235,210,.75)" stroke-width=".6"/>`;
      if (id === 'estrella') {
        const cy = len + 7;
        return `<svg viewBox="0 0 20 ${len + 15}" aria-hidden="true">${string}
          <path d="${star(10, cy, 7.6)}" fill="url(#nv-gold)" stroke="#7a560c" stroke-width=".4" stroke-linejoin="round"/>
          <path d="${star(10, cy, 3)}" fill="#fff8d6" opacity=".7"/></svg>`;
      }
      const team = teams[id];
      const cy = len + 3 + 6.6;
      return `<svg viewBox="0 0 20 ${len + 17}" role="img" aria-label="${team.name}"><title>${team.name}</title>${string}
        <rect x="7.8" y="${len}" width="4.4" height="3.2" rx=".6" fill="url(#nv-gold)" stroke="#7a560c" stroke-width=".3"/>
        <g transform="translate(0 ${cy})"><g clip-path="url(#nv-clip)">${team.fill}</g>
          <circle cx="10" cy="0" r="7" fill="url(#nv-shade)"/>
          <circle cx="10" cy="0" r="6.85" fill="none" stroke="rgba(0,0,0,.35)" stroke-width=".3"/>
          <ellipse cx="7.3" cy="-2.7" rx="1.9" ry="1.1" fill="#fff" opacity=".5" transform="rotate(-35 7.3 -2.7)"/></g></svg>`;
    }

    const lengths = [4, 9, 2, 7, 5];

    let cornersLayout = '', firstLayout = null;

    function cornerSpace() {
      const vw = document.documentElement.clientWidth;
      const bolsa = document.getElementById('bolsa');
      const quiniela = document.getElementById('quiniela');
      const q = quiniela ? quiniela.getBoundingClientRect() : { left: 0, right: vw, top: 40 };
      let left = q.width ? q.width * 0.3 : vw * 0.3, right = left;
      if (bolsa && bolsa.offsetWidth) {
        const r = bolsa.getBoundingClientRect(), cs = getComputedStyle(bolsa);
        const pad = /rgba\(.*,\s*0\)|transparent/.test(cs.backgroundColor) ? parseFloat(cs.paddingLeft) || 0 : 0;
        left = r.left + pad - q.left;
        right = q.right - r.right + pad;
      }
      return { left, right, start: q.left + window.pageXOffset, end: q.right + window.pageXOffset, bottom: q.top + window.pageYOffset,
        outLeft: Math.max(0, q.left), outRight: Math.max(0, vw - q.right) };
    }

    function layoutCorners() {
      if (firstLayout === null) firstLayout = Date.now();
      const elapsed = (Date.now() - firstLayout) / 1000;
      const space = cornerSpace();
      const maxH = Math.max(12, Math.min(20, space.bottom - 15));
      const tie = -4, base = 7, flat = 3, reach = 45, outward = 40, gap = 3;
      const cordY = t => tie + (base - tie) * (1 - Math.pow(Math.abs(2 * t - 1), flat));
      const cordSlope = t => -(base - tie) * flat * 2 * Math.sign(2 * t - 1) * Math.pow(Math.abs(2 * t - 1), flat - 1);
      const sides = [['left', leftItems.slice().reverse()], ['right', rightItems]].map(([side, items]) => {
        const out = Math.floor(Math.min(outward, side === 'left' ? space.outLeft : space.outRight));
        const width = out + Math.floor(Math.min(maxCornerWidth, space[side] + reach));
        const extra = outward - out;
        const span = width + extra;
        const size = maxH * .96;
        const near = Math.min(out + space[side] - gap + size * .6, .86 * span - extra);
        const far = Math.max(2, .2 * span - extra);
        const avail = near - far;
        const step = items.length > 1 ? Math.max(size * .85, Math.min(size * 2.2, (avail - size) / (items.length - 1))) : 0;
        const x = side === 'left' ? space.start - out : space.end + out - width;
        return { side, items, width, extra, span, near, size, step, x };
      });

      const key = sides.map(s => s.x.toFixed(0) + ':' + s.width + ':' + s.size.toFixed(1) + ':' + s.step.toFixed(1)).join(',');
      if (key === cornersLayout) return;
      cornersLayout = key;
      Array.prototype.forEach.call(document.querySelectorAll('.nv-corner'), el => el.parentNode.removeChild(el));

      sides.forEach(({ side, items, width, extra, span, near, size, step, x }, s) => {
        const mirror = side === 'right';
        const px = cx => mirror ? width - cx : cx;
        const scale = size / 20;
        const height = Math.ceil(size * 1.4 + 16);
        const cord = Array.from({ length: 41 }, (_, k) => px(k / 40 * span - extra).toFixed(1) + ' ' + cordY(k / 40).toFixed(2)).join('L');
        const corner = document.createElement('div');
        corner.className = 'nv-corner nv-in ' + side;
        corner.style.left = x.toFixed(1) + 'px';
        corner.style.width = width + 'px';
        corner.style.height = height + 'px';
        corner.innerHTML = `<svg viewBox="0 0 ${width} ${height}" aria-hidden="true">
          <path d="M${cord}" fill="none" stroke="#1d5c34" stroke-width="3.2" stroke-linecap="round"/>
          <path d="M${cord}" fill="none" stroke="#2f8a4e" stroke-width="1.6" stroke-dasharray="1.2 1.6" stroke-linecap="round"/>
          <path class="nv-tinsel" d="M${cord}" fill="none" stroke="#ffe08a" stroke-width="1.1" stroke-dasharray="0 6.5" stroke-linecap="round"/></svg>`;

        items.forEach((id, j) => {
          const cx = near - size / 2 - j * step, tc = Math.max(0, (cx + extra) / span);
          const orn = document.createElement('div');
          orn.className = 'nv-orn';
          orn.style.width = size.toFixed(1) + 'px';
          orn.style.left = (px(cx) - size / 2).toFixed(1) + 'px';
          orn.style.top = (cordY(tc) - .5).toFixed(1) + 'px';
          const slope = Math.atan2(cordSlope(tc), span) * 180 / Math.PI * .4;
          orn.style.setProperty('--tilt', ((mirror ? -slope : slope) + Math.sin(j * 2.3 + s) * 1.5).toFixed(1) + 'deg');
          orn.style.setProperty('--dur', (2.8 + (j * 7 + s * 3) % 5 * 0.3).toFixed(2) + 's');
          orn.style.setProperty('--delay', (-(j * 0.55 + s * 1.3)).toFixed(2) + 's');
          const len = lengths[(j + s * 2) % lengths.length];
          orn.innerHTML = ornamentSVG(id, len * scale > size * .6 ? Math.floor(size * .6 / scale) : len);
          orn.firstChild.style.animationDelay = (0.2 + j * 0.12 - elapsed).toFixed(2) + 's';
          corner.appendChild(orn);
        });
        document.body.appendChild(corner);
      });
    }

    function insertCorners() {
      if (!document.getElementById('nv-defs')) {
        const holder = document.createElement('div');
        holder.id = 'nv-defs';
        holder.innerHTML = defsSVG;
        document.body.appendChild(holder);
      }
      layoutCorners();
      window.addEventListener('load', () => { try { layoutCorners(); } catch (e) {} });
      window.addEventListener('resize', () => { try { layoutCorners(); } catch (e) {} });
      if (document.fonts) {
        document.fonts.ready.then(() => { try { layoutCorners(); } catch (e) {} });
        document.fonts.addEventListener && document.fonts.addEventListener('loadingdone', () => { try { layoutCorners(); } catch (e) {} });
      }
    }

    function insertNavidad() {
      try {
        document.head.appendChild(style);
        if (showGuirnalda) insertCorners();
      } catch (e) {
        console.warn('navidad.js', e);
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', insertNavidad);
    } else {
      insertNavidad();
    }
  } catch (e) {
    console.warn('navidad.js', e);
  }
})();
