// Detalles de Halloween: guirnalda de calabazas arriba, telarañas en las esquinas con una araña que baja,
// y una parvada de murciélagos que sale huyendo en 3D al abrir la página. Por ahora solo en los Registro-N de onlyRegistros
(function() {
  // Todo va dentro de try/catch: si algo falla aquí, la página sigue funcionando igual
  try {
    // ======== CONFIGURACIÓN ========
    const onlyRegistros = ['14']; // N de Registro-N donde se muestra (vacío = en todos)
    const showPumpkins = false; // guirnalda de calabazas arriba
    const showWebs = true;      // telarañas en las esquinas (y la araña)
    const numberOfBats = 6;
    const batSize = 28;       // px de ancho de un murciélago a media distancia (de lejos se ve más chico, de cerca más grande)
    const pumpkinSize = 20;    // px de ancho de cada calabaza
    const pumpkinSpacing = 46; // px aprox. entre calabazas
    const spiderDrop = 55;     // px que baja la araña desde arriba
    // ===============================

    // vendorSlug viene de var.js (se carga antes que este archivo); localmente se prueba con ?registro=14
    const slug = typeof vendorSlug !== 'undefined' ? vendorSlug : '1';
    if (onlyRegistros.length && onlyRegistros.indexOf(slug) === -1) return;

    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const style = document.createElement('style');
    style.textContent = `
      .hw-garland { position: relative; height: 34px; pointer-events: none; }
      .hw-garland > svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
      .hw-pumpkin { position: absolute; top: 3px; width: ${pumpkinSize}px; margin-left: -${pumpkinSize / 2}px;
        transform-origin: 50% 0; animation: hw-sway 2.6s ease-in-out infinite alternate; }
      .hw-pumpkin svg { display: block; width: 100%; height: auto; overflow: visible;
        filter: drop-shadow(0 0 4px rgba(255, 140, 0, .75)); }
      .hw-face { animation: hw-flicker 1.7s steps(1) infinite; }

      .hw-web { position: absolute; top: 0; width: min(15vw, 60px); height: auto; pointer-events: none; z-index: 9998; }
      .hw-web.left { left: 0; }
      .hw-web.right { right: 0; transform: scaleX(-1); }

      .hw-spider { position: absolute; top: 0; right: min(7vw, 28px); z-index: 9999; pointer-events: none;
        display: flex; flex-direction: column; align-items: center; transform-origin: 50% 0;
        animation: hw-swing 3.2s 3s infinite; }
      .hw-spider .hw-thread { width: 1px; height: ${spiderDrop}px; background: rgba(255, 255, 255, .55);
        animation: hw-drop 2.4s cubic-bezier(.3, 1.4, .5, 1) .6s both; }
      .hw-spider svg { width: 22px; height: auto; margin-top: -3px; }

      /* Escena 3D: los murciélagos se mueven en x, y, z y la perspectiva los hace crecer al acercarse */
      #hw-bats { position: fixed; inset: 0; overflow: hidden; pointer-events: none; z-index: 9999;
        perspective: 800px; perspective-origin: 50% 22%; }
      #hw-bats .hw-bat { position: absolute; left: 50%; top: 22%; width: ${batSize}px; height: ${batSize / 2}px;
        margin: -${batSize / 4}px 0 0 -${batSize / 2}px; will-change: transform, opacity; }
      #hw-bats .hw-wing { position: absolute; top: 0; width: 50%; height: 100%; }
      #hw-bats .hw-wing.l { left: 0; transform-origin: 100% 45%; animation: hw-flap-l var(--flap) ease-in-out infinite alternate; }
      #hw-bats .hw-wing.r { left: 50%; transform-origin: 0 45%; animation: hw-flap-r var(--flap) ease-in-out infinite alternate; }
      #hw-bats .hw-wing.r svg { transform: scaleX(-1); }
      #hw-bats svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }

      @keyframes hw-sway { from { transform: rotate(-5deg); } to { transform: rotate(5deg); } }
      /* Columpio de la araña: arranca desde colgada derecha (0°) para no dar un salto al terminar de bajar;
         como péndulo, va más rápido al pasar por en medio y frena en los extremos */
      @keyframes hw-swing {
        0%   { transform: rotate(0);     animation-timing-function: ease-out; }
        25%  { transform: rotate(5deg);  animation-timing-function: ease-in-out; }
        75%  { transform: rotate(-5deg); animation-timing-function: ease-in; }
        100% { transform: rotate(0); }
      }
      @keyframes hw-drop { from { height: 0; } to { height: ${spiderDrop}px; } }
      /* Aleteo en 3D: el ala sube y baja (rotateZ) y a la vez se pliega hacia el fondo (rotateY) */
      @keyframes hw-flap-l {
        from { transform: rotateZ(-38deg) rotateY(-5deg); }
        to   { transform: rotateZ(48deg) rotateY(-35deg); }
      }
      @keyframes hw-flap-r {
        from { transform: rotateZ(38deg) rotateY(5deg); }
        to   { transform: rotateZ(-48deg) rotateY(35deg); }
      }
      @keyframes hw-flicker { 0%, 100% { opacity: 1; } 47% { opacity: .55; } 52% { opacity: 1; } 80% { opacity: .8; } }

      @media (prefers-reduced-motion: reduce) {
        .hw-pumpkin, .hw-face, .hw-spider, .hw-spider .hw-thread { animation: none; }
      }
    `;

    const pumpkinSVG = `
      <svg viewBox="0 0 40 38" aria-hidden="true">
        <path d="M20 9 C20 5 21 2 24 1" fill="none" stroke="#3f7a1f" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="11" cy="23" rx="10" ry="13" fill="#e8650a"/>
        <ellipse cx="29" cy="23" rx="10" ry="13" fill="#e8650a"/>
        <ellipse cx="20" cy="23" rx="10" ry="14" fill="#ff8a1c"/>
        <g class="hw-face" fill="#ffe14d">
          <path d="M10 19 L15 14 L17 21 Z M30 19 L25 14 L23 21 Z"/>
          <path d="M9 26 Q20 35 31 26 L28 27 L26 30 L23 28 L20 31 L17 28 L14 30 L12 27 Z"/>
        </g>
      </svg>`;

    const spiderSVG = `
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <g fill="none" stroke="#1a1020" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 17 L9 10 L5 14 M16 20 L7 18 L3 23 M16 23 L8 26 L4 32 M17 26 L11 32 L9 38"/>
          <path d="M23 17 L31 10 L35 14 M24 20 L33 18 L37 23 M24 23 L32 26 L36 32 M23 26 L29 32 L31 38"/>
        </g>
        <circle cx="20" cy="13" r="4" fill="#1a1020"/>
        <circle cx="20" cy="23" r="7.5" fill="#1a1020"/>
        <circle cx="18.5" cy="12" r="1" fill="#ffb300"/>
        <circle cx="21.5" cy="12" r="1" fill="#ffb300"/>
      </svg>`;

    // Cada ala va en su propio div para poder plegarla en 3D; la derecha es la izquierda reflejada
    const wingSVG = `<svg viewBox="0 0 50 50" aria-hidden="true">
        <path d="M50 24 C42 12 26 8 4 14 C11 18 13 25 11 31 C17 27 23 29 27 35 C31 29 37 29 41 33 C43 29 46 27 50 28 Z" fill="#2b1a3a"/>
      </svg>`;
    const batHTML = `
      <div class="hw-wing l">${wingSVG}</div>
      <div class="hw-wing r">${wingSVG}</div>
      <svg viewBox="0 0 100 50" aria-hidden="true">
        <ellipse cx="50" cy="28" rx="6" ry="10" fill="#2b1a3a"/>
        <circle cx="50" cy="17" r="5.5" fill="#2b1a3a"/>
        <path d="M45.5 15 L44.5 8 L48.5 13 Z M54.5 15 L55.5 8 L51.5 13 Z" fill="#2b1a3a"/>
        <circle cx="48" cy="17" r="1.3" fill="#ffb300"/>
        <circle cx="52" cy="17" r="1.3" fill="#ffb300"/>
      </svg>`;

    const random = (min, max) => Math.random() * (max - min) + min;

    // Telaraña con la punta en la esquina (0,0): rayos y arcos que se cuelgan hacia la esquina
    function webSVG() {
      const angles = [0, 18, 36, 54, 72, 90].map(a => a * Math.PI / 180);
      const rings = [22, 40, 58, 76, 94];
      let d = '';
      angles.forEach(a => { d += `M0 0 L${(100 * Math.cos(a)).toFixed(1)} ${(100 * Math.sin(a)).toFixed(1)} `; });
      rings.forEach(r => {
        for (let i = 0; i < angles.length - 1; i++) {
          const a1 = angles[i], a2 = angles[i + 1], mid = (a1 + a2) / 2, rc = r * 0.82;
          d += `M${(r * Math.cos(a1)).toFixed(1)} ${(r * Math.sin(a1)).toFixed(1)} ` +
               `Q${(rc * Math.cos(mid)).toFixed(1)} ${(rc * Math.sin(mid)).toFixed(1)} ` +
               `${(r * Math.cos(a2)).toFixed(1)} ${(r * Math.sin(a2)).toFixed(1)} `;
        }
      });
      return `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="${d}" fill="none"
        stroke="rgba(255,255,255,.4)" stroke-width=".9"/></svg>`;
    }

    function insertGarland() {
      const garland = document.createElement('div');
      garland.className = 'hw-garland';
      document.body.insertBefore(garland, document.body.firstChild);

      const n = Math.max(4, Math.round(garland.clientWidth / pumpkinSpacing));
      // Cordón: cuelga entre cada punto de amarre (donde va una calabaza), en unidades de 10 por calabaza
      let cord = 'M0 6 ';
      for (let i = 0; i < n; i++) {
        const x = i * 10 + 5;
        cord += `Q${x - 5} 14 ${x} 4 `;
      }
      cord += `Q${n * 10} 14 ${n * 10} 6`;
      garland.innerHTML = `<svg viewBox="0 0 ${n * 10} 34" preserveAspectRatio="none" aria-hidden="true">
        <path d="${cord}" fill="none" stroke="#1a1020" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>`;

      for (let i = 0; i < n; i++) {
        const p = document.createElement('div');
        p.className = 'hw-pumpkin';
        p.style.left = ((i + 0.5) / n * 100) + '%';
        p.style.animationDelay = (-random(0, 2.6)).toFixed(2) + 's';
        p.innerHTML = pumpkinSVG;
        p.querySelector('.hw-face').style.animationDelay = (-random(0, 1.7)).toFixed(2) + 's';
        garland.appendChild(p);
      }
    }

    function insertWebs() {
      ['left', 'right'].forEach(side => {
        const web = document.createElement('div');
        web.className = 'hw-web ' + side;
        web.innerHTML = webSVG();
        document.body.appendChild(web);
      });
      const spider = document.createElement('div');
      spider.className = 'hw-spider';
      spider.innerHTML = '<div class="hw-thread"></div>' + spiderSVG;
      document.body.appendChild(spider);
    }

    // Huida: todos salen casi a la vez de un mismo punto arriba y se dispersan en direcciones distintas;
    // unos se acercan a la pantalla y salen por los lados (grandes), otros se pierden a lo lejos (chiquitos).
    // El camino se define en pantalla (sx, sy) y en profundidad (z); luego se convierte a coordenadas 3D
    // para que la perspectiva lo proyecte ahí.
    function releaseBats() {
      if (reducedMotion || !Element.prototype.animate) return;
      const container = document.createElement('div');
      container.id = 'hw-bats';
      document.body.appendChild(container);

      const W = window.innerWidth;
      const H = window.innerHeight;
      const P = 800; // = perspective del contenedor
      let pending = numberOfBats;

      for (let i = 0; i < numberOfBats; i++) {
        const bat = document.createElement('div');
        bat.className = 'hw-bat';
        bat.style.setProperty('--flap', random(.09, .13).toFixed(2) + 's'); // aleteo rápido, van asustados
        bat.innerHTML = batHTML;
        container.appendChild(bat);

        // Cada uno huye hacia un lado distinto (repartidos alrededor del punto de salida)
        const dir = (i / numberOfBats) * Math.PI * 2 + random(-0.4, 0.4);
        const towardViewer = i % 2 === 0;
        // s = tamaño aparente (1 = batSize); z se saca de s para que crezca/encoja parejo en todo el vuelo
        const from = { s: 1.2, sx: random(-0.06, 0.06) * W, sy: random(-0.03, 0.03) * H };
        const to = towardViewer
          ? { s: 2.5, sx: Math.cos(dir) * W, sy: Math.sin(dir) * 0.25 * H }
          : { s: 0.35, sx: Math.cos(dir) * 0.45 * W, sy: Math.sin(dir) * 0.15 * H - 0.05 * H };

        // Aleteo errático: dos ondas con frecuencias al azar
        const f1 = random(1.5, 2.5), f2 = random(3, 5), ph = random(0, 6);
        const path = t => {
          const e = 1 - Math.pow(1 - t, 1.8); // arrancan de golpe y luego se alejan
          const z = P - P / (from.s * Math.pow(to.s / from.s, e));
          const sx = from.sx + (to.sx - from.sx) * e + Math.sin(t * f1 * 6.28 + ph) * 0.05 * W;
          const sy = from.sy + (to.sy - from.sy) * e + Math.sin(t * f2 * 6.28 + ph) * 0.03 * H;
          return { sx, sy, z };
        };

        const steps = 30;
        const keyframes = [];
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const p = path(t);
          const q = path(Math.min(1, t + 0.02));
          const k = (P - p.z) / P;
          const dx = q.sx - p.sx, dy = q.sy - p.sy;
          const bank = Math.max(-40, Math.min(40, dx * 1.5));   // se ladea hacia donde gira
          const yaw = Math.max(-20, Math.min(20, dx * 1.2));    // voltea un poco el cuerpo hacia donde va
          const pitch = Math.max(-10, Math.min(10, dy * 1));
          const fade = Math.min(1, t * 10, (1 - t) * 5);
          keyframes.push({
            transform: `translate3d(${(p.sx * k).toFixed(1)}px, ${(p.sy * k).toFixed(1)}px, ${p.z.toFixed(1)}px) ` +
                       `rotateY(${yaw.toFixed(1)}deg) rotateX(${pitch.toFixed(1)}deg) rotateZ(${bank.toFixed(1)}deg)`,
            opacity: fade.toFixed(2)
          });
        }

        const anim = bat.animate(keyframes, {
          duration: random(2800, 3600),
          delay: 300 + random(0, 250),
          easing: 'linear',
          fill: 'both'
        });
        anim.onfinish = () => {
          try {
            bat.remove();
            if (--pending === 0) container.remove();
          } catch (e) {}
        };
      }
    }

    function insertHalloween() {
      try {
        document.head.appendChild(style);
        if (showPumpkins) insertGarland();
        if (showWebs) insertWebs();
        releaseBats();
      } catch (e) {
        console.warn('halloween.js', e);
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', insertHalloween);
    } else {
      insertHalloween();
    }
  } catch (e) {
    console.warn('halloween.js', e);
  }
})();
