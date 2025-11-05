// Script para insertar luces navideñas en cualquier página
(function() {
  // ======== CONFIGURACIÓN ========
  const lightSize = 0.4; // Cambia este valor: 0.5 = mitad, 1 = normal, 1.5 = 50% más grande, 2 = doble, etc.
  // ===============================

  // Cálculos automáticos basados en el tamaño
  const lightWidth = 12 * lightSize;
  const lightHeight = 28 * lightSize;
  const lightSpacing = 20 * lightSize;
  const socketWidth = 10 * lightSize;
  const socketHeight = 9.33 * lightSize;
  const cableLength = 52 * lightSize;
  const cableCurve = 18.67 * lightSize;
  const cableThickness = 2 * lightSize;
  const topMargin = -15 * lightSize;
  const glowSize = 24 * lightSize;
  const glowSpread = 3 * lightSize;
  const numberOfLights = 42;

  // Crear el HTML de las luces
  const lightsHTML = `
    <ul class="lightrope">
      ${Array(numberOfLights).fill('<li></li>').join('')}
    </ul>
  `;

  // Crear el CSS con las variables calculadas
  const style = document.createElement('style');
  style.textContent = `
    .lightrope {
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      position: fixed;
      z-index: 9999;
      margin: ${topMargin}px 0 0 0;
      padding: 0;
      pointer-events: none;
      width: 100%;
      top: 0;
      left: 0;
    }
    .lightrope li {
      position: relative;
      animation-fill-mode: both;
      animation-iteration-count: infinite;
      list-style: none;
      margin: 0;
      padding: 0;
      display: block;
      width: ${lightWidth}px;
      height: ${lightHeight}px;
      border-radius: 50%;
      margin: ${lightSpacing}px;
      display: inline-block;
      background: rgba(0, 247, 165, 1);
      box-shadow: 0px ${lightHeight/6}px ${glowSize}px ${glowSpread}px rgba(0, 247, 165, 1);
      animation-name: flash-1;
      animation-duration: 2s;
    }
    .lightrope li:nth-child(2n+1) {
      background: rgba(0, 247, 255, 1);
      box-shadow: 0px ${lightHeight/6}px ${glowSize}px ${glowSpread}px rgba(0, 255, 255, 0.5);
      animation-name: flash-2;
      animation-duration: 0.4s;
    }
    .lightrope li:nth-child(4n+2) {
      background: rgba(247, 0, 148, 1);
      box-shadow: 0px ${lightHeight/6}px ${glowSize}px ${glowSpread}px rgba(247, 0, 148, 1);
      animation-name: flash-3;
      animation-duration: 1.1s;
    }
    .lightrope li:nth-child(odd) {
      animation-duration: 1.8s;
    }
    .lightrope li:nth-child(3n+1) {
      animation-duration: 1.4s;
    }
    .lightrope li:before {
      content: "";
      position: absolute;
      background: #222;
      width: ${socketWidth}px;
      height: ${socketHeight}px;
      border-radius: 3px;
      top: -${socketHeight/2}px;
      left: 1px;
    }
    .lightrope li:after {
      content: "";
      top: -${socketHeight * 1.5}px;
      left: ${lightWidth * 0.75}px;
      position: absolute;
      width: ${cableLength}px;
      height: ${cableCurve}px;
      border-bottom: solid #222 ${cableThickness}px;
      border-radius: 50%;
    }
    .lightrope li:last-child:after {
      content: none;
    }
    .lightrope li:first-child {
      margin-left: -40px;
    }
    @keyframes flash-1 {
      0%, 100% {
        background: rgba(0, 247, 165, 1);
        box-shadow: 0px ${lightHeight/6}px ${glowSize}px ${glowSpread}px rgba(0, 247, 165, 1);
      }
      50% {
        background: rgba(0, 247, 165, 0.4);
        box-shadow: 0px ${lightHeight/6}px ${glowSize}px ${glowSpread}px rgba(0, 247, 165, 0.2);
      }
    }
    @keyframes flash-2 {
      0%, 100% {
        background: rgba(0, 255, 255, 1);
        box-shadow: 0px ${lightHeight/6}px ${glowSize}px ${glowSpread}px rgba(0, 255, 255, 1);
      }
      50% {
        background: rgba(0, 255, 255, 0.4);
        box-shadow: 0px ${lightHeight/6}px ${glowSize}px ${glowSpread}px rgba(0, 255, 255, 0.2);
      }
    }
    @keyframes flash-3 {
      0%, 100% {
        background: rgba(247, 0, 148, 1);
        box-shadow: 0px ${lightHeight/6}px ${glowSize}px ${glowSpread}px rgba(247, 0, 148, 1);
      }
      50% {
        background: rgba(247, 0, 148, 0.4);
        box-shadow: 0px ${lightHeight/6}px ${glowSize}px ${glowSpread}px rgba(247, 0, 148, 0.2);
      }
    }
  `;

  // Función para insertar las luces
  function insertLights() {
    // Agregar el CSS
    document.head.appendChild(style);
    
    // Crear y agregar el HTML
    const container = document.createElement('div');
    container.innerHTML = lightsHTML;
    document.body.insertBefore(container.firstElementChild, document.body.firstChild);
  }

  // Insertar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertLights);
  } else {
    insertLights();
  }
})();