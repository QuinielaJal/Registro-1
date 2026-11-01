// Detalles de Día de Muertos: papel picado en las esquinas de arriba, junto a "Bolsa estimada".
// Por ahora solo en los Registro-N de onlyRegistros
(function() {
  try {
    // ======== CONFIGURACIÓN ========
    const onlyRegistros = ['1','2','4','14']; // N de Registro-N donde se muestra (vacío = en todos)
    const showPapelPicado = true;
    const maxCornerWidth = 180; // px; en celular se ajusta al espacio libre junto a "Bolsa estimada"
    // ===============================

    const slug = typeof vendorSlug !== 'undefined' ? vendorSlug : '1';
    if (onlyRegistros.length && onlyRegistros.indexOf(slug) === -1) return;

    const style = document.createElement('style');
    style.textContent = `
      .dm-corner { position: absolute; top: 0; overflow: hidden; pointer-events: none; z-index: 9998; }
      #bolsa { position: relative; z-index: 9999; }
      .dm-corner.right { transform: scaleX(-1); }
      .dm-corner > svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
      .dm-flag { position: absolute; transform-origin: 50% 0;
        transform: rotate(var(--tilt)); animation: dm-breeze var(--dur) ease-in-out var(--delay) infinite; }
      .dm-flag svg { display: block; width: 100%; height: auto; transform-origin: 50% 0;
        filter: drop-shadow(0 1px 1px rgba(0, 0, 0, .35)); }
      .dm-corner.dm-in .dm-flag svg { animation: dm-unfold .6s ease-out both; }

      @keyframes dm-unfold { from { transform: scaleY(0); opacity: 0; } to { transform: scaleY(1); opacity: 1; } }
      @keyframes dm-breeze {
        0%, 100% { transform: rotate(calc(var(--tilt) - 2.6deg)) skewX(-1.5deg); }
        30% { transform: rotate(calc(var(--tilt) + 1deg)) skewX(.6deg) scaleY(.98); }
        55% { transform: rotate(calc(var(--tilt) + 2.8deg)) skewX(1.8deg); }
        80% { transform: rotate(calc(var(--tilt) - .6deg)) skewX(-.5deg) scaleY(.99); }
      }

      @media (prefers-reduced-motion: reduce) {
        .dm-flag, .dm-flag svg { animation: none; }
      }
    `;

    const flagColors = ['#7b2cbf', '#ff8c00'];

    const circle = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;

    const flagEdge = 'M-2 0H22V23L20 25L18 23L16 25L14 23L12 25L10 23L8 25L6 23L4 25L2 23L0 25L-2 23Z';
    const flagBorder = [0, 4, 8, 12, 16, 20].map(x => circle(x, 3, .7) + circle(x, 20.5, .7)).join('');
    const polar = (cx, cy, r, deg) => {
      const a = deg * Math.PI / 180;
      return (cx + r * Math.cos(a)).toFixed(2) + ' ' + (cy + r * Math.sin(a)).toFixed(2);
    };
    const star = (cx, cy, r) => 'M' + Array.from({ length: 10 }, (_, k) => polar(cx, cy, k % 2 ? r * .45 : r, -90 + k * 36)).join('L') + 'Z';
    const ball = (cx, cy, r) => {
      const p = r * .34, q = r * .53, e = r * .88, angles = [0, 1, 2, 3, 4].map(k => -90 + k * 72);
      const seam = a => {
        const ux = Math.cos(a * Math.PI / 180), uy = Math.sin(a * Math.PI / 180), w = .4;
        const pt = (d, side) => (cx + ux * d - uy * w * side).toFixed(2) + ' ' + (cy + uy * d + ux * w * side).toFixed(2);
        return `M${pt(p, 1)}L${pt(q, 1)}L${pt(q, -1)}L${pt(p, -1)}Z`;
      };
      return circle(cx, cy, r) +
        'M' + angles.map(a => polar(cx, cy, p, a)).join('L') + 'Z' +
        angles.map(a => `M${polar(cx, cy, q, a)}L${polar(cx, cy, r * .84, a - 27)}L${polar(cx, cy, e, a - 23)}` +
          `A${e} ${e} 0 0 1 ${polar(cx, cy, e, a + 23)}L${polar(cx, cy, r * .84, a + 27)}Z`).join('') +
        angles.map(seam).join('');
    };
    const motifs = [
      'M5.5 11.5a4.5 4.5 0 1 1 9 0c0 1.8-.7 2.8-1.8 3.3V18H7.3v-3.2C6.2 14.3 5.5 13.3 5.5 11.5Z' +
        circle(8.2, 11.6, 1.2) + circle(11.8, 11.6, 1.2) + 'M10 13l-.7 1.3h1.4Z' + 'M8.7 16h.6v2h-.6Z M10.7 16h.6v2h-.6Z',
      ball(10, 12.4, 6),
      'M5.5 7.6Q5.5 6.8 6.3 6.8H13.7Q14.5 6.8 14.5 7.6V9.2H5.5Z' +
        'M5.5 10.6H14.5V13Q14.5 16.6 10 19Q5.5 16.6 5.5 13Z' +
        'M7.5 10.6h.8v5.4h-.8Z M9.6 10.6h.8v6.6h-.8Z M11.7 10.6h.8v5.4h-.8Z' +
        star(7.2, 5.4, .9) + star(10, 4.9, .9) + star(12.8, 5.4, .9),
      'M6.98 4.3L7.54 4.3L8.13 4.56L8.35 4.82L8.54 5.3L8.54 5.52L8.35 5.37L8.35 5.89L8.13 6.34L7.76 6.67L7.35 6.89L7.35 6.97L7.54 7.04L7.39 7.08L7.06 7.45L7.02 7.67L7.09 7.82L7.39 8.08L7.46 8.08L7.46 7.97L7.28 7.74L7.28 7.49L12.72 7.49L12.76 7.67L12.54 8.04L12.76 8L12.98 7.71L12.94 7.45L12.61 7.08L11.83 6.52L12.06 6.45L11.69 6L11.65 5.49L11.46 5.63L11.5 5.19L11.69 4.78L11.94 4.52L12.46 4.3L13.06 4.3L13.65 4.56L14.13 5.04L14.57 5.93L14.72 6.71L14.72 8.11L14.65 8.86L14.24 10.56L13.8 11.93L13.61 11.78L12.69 14.41L11.69 16.23L11.54 16.82L11.24 17.19L11.17 17.45L11.2 17.78L11.46 18.11L12.54 18.6L12.8 18.82L12.87 19L12.8 19.3L7.17 19.26L7.17 18.93L7.43 18.63L8.31 18.26L8.72 17.93L8.83 17.67L8.83 17.37L8.72 17.11L8.54 16.97L8.46 16.49L8.31 16.19L7.43 14.63L6.39 11.78L6.2 11.89L5.5 9.56L5.28 8.08L5.28 6.74L5.54 5.67L5.83 5.11L6.31 4.6ZM7.13 5.04L6.87 5.11L6.5 5.45L6.24 5.89L6.06 6.52L6.02 7.49L6.06 8.52L6.2 9.26L6.17 10L6.72 11.89L6.57 10.86L6.5 9.37L7.09 9.04L7.35 8.74L7.35 8.52L7.02 8.11L6.87 8.26L6.69 8.08L6.5 7.71L6.46 7.23L6.69 6.71L6.98 6.41L7.09 6.37L7.06 6.49L7.17 6.56L7.65 6.23L7.94 5.74L7.94 5.37L7.76 5.45L7.72 5.26L7.54 5.08ZM12.61 5.04L12.31 5.23L12.28 5.49L12.06 5.49L12.13 5.93L12.39 6.23L12.5 6.04L13.17 6.52L13.43 6.86L13.57 7.3L13.54 7.63L13.35 8.04L13.13 8.26L13.02 8.08L12.65 8.56L12.65 8.71L12.83 8.97L13.5 9.37L13.5 10.19L13.28 11.93L13.83 10.19L13.8 9.37L13.98 8.04L13.98 6.78L13.83 6.04L13.46 5.37L13.06 5.08Z'
    ];
    const motifOrder = [[2, 3, 0, 1], [3, 0, 2, 1]];

    const flagSVG = (color, motif) => `<svg viewBox="-2 0 24 25" aria-hidden="true">
        <path fill-rule="evenodd" fill="${color}" d="${flagEdge}${flagBorder}${motif}"/></svg>`;

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
      const flagH = Math.max(12, Math.min(20, space.bottom - 15));
      const flagW = flagH * 0.96;
      const tie = -4, base = 7, flat = 3, reach = 45, outward = 40, gap = 4.5;
      const cordY = t => tie + (base - tie) * (1 - Math.abs(2 * t - 1) ** flat);
      const cordSlope = t => -(base - tie) * flat * 2 * Math.sign(2 * t - 1) * Math.abs(2 * t - 1) ** (flat - 1);
      const sides = ['left', 'right'].map(side => {
        const out = Math.floor(Math.min(outward, side === 'left' ? space.outLeft : space.outRight));
        const width = out + Math.floor(Math.min(maxCornerWidth, space[side] + reach));
        const extra = outward - out;
        const b = out + space[side] - 1 + flagW + gap;
        const n = Math.ceil(b / (flagW + gap));
        const x = side === 'left' ? space.start - out : space.end + out - width;
        return { side, width, extra, n, x, b };
      });

      const key = flagH.toFixed(0) + sides.map(s => s.x.toFixed(0) + ':' + s.width + ':' + s.n).join(',');
      if (key === cornersLayout) return;
      cornersLayout = key;
      document.querySelectorAll('.dm-corner').forEach(el => el.remove());

      sides.forEach(({ side, width, extra, n, x, b }, s) => {
        if (n < 1) return;
        const span = width + extra;
        const corner = document.createElement('div');
        corner.className = 'dm-corner dm-in ' + side;
        corner.style.left = x.toFixed(1) + 'px';
        corner.style.width = width + 'px';
        corner.style.height = (flagH + 14) + 'px';
        corner.innerHTML = `<svg viewBox="0 0 ${width} ${flagH + 14}" aria-hidden="true">
          <path d="M${Array.from({ length: 41 }, (_, k) => (k / 40 * span - extra).toFixed(1) + ' ' + cordY(k / 40).toFixed(2)).join('L')}" fill="none" stroke="rgba(245,240,230,.35)" stroke-width=".7"/></svg>`;

        for (let j = 0; j < n; j++) {
          const cx = b - flagW / 2 - j * (flagW + gap), tc = Math.max(0, (cx + extra) / span);
          if (cordY(tc) < 4) break;
          const flag = document.createElement('div');
          flag.className = 'dm-flag';
          flag.style.width = flagW.toFixed(1) + 'px';
          flag.style.left = (cx - flagW / 2).toFixed(1) + 'px';
          flag.style.top = (cordY(tc) - 1.5).toFixed(1) + 'px';
          flag.style.setProperty('--tilt', (Math.atan2(cordSlope(tc), span) * 180 / Math.PI + Math.sin(j * 2.3 + s) * 1.8).toFixed(1) + 'deg');
          flag.style.setProperty('--dur', (3.8 + (j * 7 + s * 3) % 5 * 0.25).toFixed(2) + 's');
          flag.style.setProperty('--delay', (-(j * 0.45 + s * 1.3)).toFixed(2) + 's');
          flag.innerHTML = flagSVG(flagColors[(j + s) % flagColors.length], motifs[motifOrder[s][j % 4]]);
          flag.firstChild.style.animationDelay = (0.2 + j * 0.12 - elapsed).toFixed(2) + 's';
          corner.appendChild(flag);
        }
        document.body.appendChild(corner);
      });
    }

    function insertCorners() {
      layoutCorners();
      window.addEventListener('load', () => { try { layoutCorners(); } catch (e) {} });
      window.addEventListener('resize', () => { try { layoutCorners(); } catch (e) {} });
      if (document.fonts) {
        document.fonts.ready.then(() => { try { layoutCorners(); } catch (e) {} });
        document.fonts.addEventListener && document.fonts.addEventListener('loadingdone', () => { try { layoutCorners(); } catch (e) {} });
      }
    }

    function insertMuertos() {
      try {
        document.head.appendChild(style);
        if (showPapelPicado) insertCorners();
      } catch (e) {
        console.warn('muertos.js', e);
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', insertMuertos);
    } else {
      insertMuertos();
    }
  } catch (e) {
    console.warn('muertos.js', e);
  }
})();
