// Renglón "COSTO $X   CIERRE: ..." en un canvas a la resolución de la imagen; uso: Banda.iniciar(cierre, medidas) y Banda.precio(total).
var Banda = (function () {
    var canvas, ctx, cierre, m, total = 0;

    function fuente(px) { return "bold " + px + "px Calibri, Carlito, sans-serif"; }

    function dibujar() {
        if (!ctx) return;
        canvas.width = m.ancho;     // también borra lo dibujado
        canvas.height = Math.round(m.ancho * canvas.offsetHeight / canvas.offsetWidth);

        // Desde 4 dígitos el precio se achica un 8% por cada dígito más, sin quedar más chico que las letras blancas
        var espacio = cierre ? m.letra * m.espacio : 0;
        var precio = "$" + String(total).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var partes = [["COSTO ", "#ffffff", m.letra],
                      [precio, "#ffff00", m.letra * Math.max(1, m.precio * Math.pow(0.92, Math.max(0, String(total).length - 3)))]];
        if (cierre) partes.push(["CIERRE: " + cierre, "#ffffff", m.letra]);
        canvas.setAttribute("aria-label", "Costo " + precio + (cierre ? ", cierre: " + cierre : ""));

        // Si la línea no cabe, se achica toda para que el cierre conserve su espacio
        var ancho = espacio, i;
        for (i = 0; i < partes.length; i++) { ctx.font = fuente(partes[i][2]); ancho += ctx.measureText(partes[i][0]).width; }
        var escala = Math.min(1, m.ancho * 0.94 / ancho);

        var x = m.ancho * (0.5 + m.centro) - ancho * escala / 2;
        ctx.lineWidth = 0.4;    // lo que se borra del contorno: el texto de la imagen tiene el trazo un poco más delgado
        for (i = 0; i < partes.length; i++) {
            if (i === 2) x += espacio * escala;
            ctx.font = fuente(partes[i][2] * escala);
            ctx.fillStyle = partes[i][1];
            ctx.globalCompositeOperation = "source-over";
            ctx.fillText(partes[i][0], x, m.base);
            ctx.globalCompositeOperation = "destination-out";
            ctx.strokeText(partes[i][0], x, m.base);
            x += ctx.measureText(partes[i][0]).width;
        }
    }

    // Un error al dibujar nunca debe tumbar la página: se quita la franja y queda el renglón de la imagen
    function redibujar() {
        try { dibujar(); }
        catch (e) { ctx = null; if (canvas.parentNode) canvas.parentNode.removeChild(canvas); }
    }

    return {
        iniciar: function (textoCierre, medidas) {
            canvas = document.createElement("canvas");
            canvas.id = "banda";
            canvas.setAttribute("role", "img");
            ctx = canvas.getContext("2d");
            if (!ctx) throw new Error("Sin canvas");
            cierre = textoCierre;
            m = medidas;
            var texto = document.getElementById("text");
            texto.parentNode.insertBefore(canvas, texto);
            window.addEventListener("resize", redibujar);
            // Sin Calibri se usa Carlito (Google Fonts): al terminar de cargar la página se pide y se vuelve a dibujar
            window.addEventListener("load", function () {
                if (document.fonts) document.fonts.load("bold 10px Carlito").then(redibujar, redibujar);
                else { redibujar(); setTimeout(redibujar, 2000); }      // navegadores sin document.fonts (iOS 9)
            });
        },
        precio: function (n) {
            total = n;
            redibujar();
        }
    };
})();

window.addEventListener("load", function () {
    var texto = document.getElementById("text"), caja = texto.parentNode, img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
        var c = document.createElement("canvas").getContext("2d"), w = caja.offsetWidth, h = Math.round(img.height * w / img.width);
        c.canvas.width = w;
        c.canvas.height = h;
        c.drawImage(img, 0, 0, w, h);
        function color(y) {
            var d = c.getImageData(Math.round(w * 0.02), Math.max(0, Math.min(Math.round(y), h - 1)), Math.max(1, Math.round(w * 0.04)), 1).data, canal = [[], [], []], i, j;
            for (i = 0; i < d.length; i += 4) for (j = 0; j < 3; j++) canal[j].push(d[i + j]);
            return canal.map(function (v) { v.sort(function (a, b) { return a - b; }); return v[v.length >> 1]; });
        }
        function luz(p) { return 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]; }
        function degradado(arriba, abajo) { return "linear-gradient(180deg,rgb(" + arriba + "),rgb(" + abajo + "))"; }
        try {
            var banda = document.getElementById("banda"), base = banda || texto, y = base.getBoundingClientRect().top - caja.getBoundingClientRect().top;
            var a = color(y + 3), b = color(y + base.offsetHeight - 3);
            if (!banda) { texto.style.backgroundImage = degradado(a, b); return; }
            banda.style.backgroundImage = degradado(a, b);
            var raiz = document.documentElement.style, tinta = luz(a) <= luz(b) ? a : b;
            raiz.setProperty("--pg-auto", degradado(a, b));
            raiz.setProperty("--pg-tinta", "rgb(" + tinta + ")");
            raiz.setProperty("--pg-suave", "rgb(" + tinta.map(function (v) { return Math.round(v * 0.08 + 255 * 0.92); }) + ")");
            var fin = color(h - 5), abajo = luz(fin) < luz(a) ? fin : a;
            texto.style.backgroundImage = degradado(b, luz(abajo) <= luz(b) ? abajo : b);
        } catch (e) {}
    };
    img.src = (/url\(["']?([^"')]+)/.exec(getComputedStyle(caja).backgroundImage) || [])[1] || "";
});
