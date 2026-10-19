// "Cuentas para pagar": botón en <section id="pagos"> que abre un modal con las cuentas del vendedor (cuentas / cuentasm de var.js).
// data-tipo="media" en la sección usa las de media semana. Sin cuentas configuradas, la sección queda oculta.
// Tocar una cuenta copia el número sin espacios.
(function () {
    // Imágenes relativas a este archivo (los demás sitios lo cargan desde Registro-1)
    var BASE = document.currentScript ? document.currentScript.src : location.href;
    var box = document.getElementById("pagos");
    if (!box) return;
    var tipo = box.getAttribute("data-tipo") || "fin";
    var lista = tipo === "media" ? window.cuentasm : window.cuentas;
    if (!lista || !lista.length) return;

    // Color y texto corto del logo del banco; el que no esté aquí usa gris y su primera palabra
    var BANCOS = {
        "bbva": ["bbva", "BBVA"], "hsbc": ["hsbc", "HSBC"],
        "spin": ["spin", "SPIN"], "spin oxxo": ["spin", "SPIN"], "oxxo": ["spin", "OXXO"],
        "bancoppel": ["coppel", "Coppel"], "coppel": ["coppel", "Coppel"],
        "banorte": ["banorte", "Banorte"], "santander": ["santander", "Sant."], "banamex": ["banamex", "Bnmx"],
        "azteca": ["azteca", "Azteca"], "banco azteca": ["azteca", "Azteca"], "nu": ["nu", "nu"], "mercado pago": ["mp", "MP"],
        "scotiabank": ["scotia", "Scotia"]
    };

    var ICON_CARD = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>';
    var ICON_COPY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"/></svg>';
    var ICON_OK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>';
    var ICON_X = '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M368 368L144 144M368 144L144 368" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="40"/></svg>';

    function esc(s) {
        return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
    }
    function digitos(c) { return String(c.num || "").replace(/\D/g, ""); }

    function copiar(texto, ok) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(texto).then(ok, function () { copiarViejo(texto) && ok(); });
        } else if (copiarViejo(texto)) {
            ok();
        }
    }

    // Respaldo para navegadores dentro de apps (Facebook, etc.) que no dejan usar navigator.clipboard
    function copiarViejo(texto) {
        var t = document.createElement("textarea");
        t.value = texto;
        t.setAttribute("readonly", "");
        t.style.position = "fixed";
        t.style.opacity = "0";
        document.body.appendChild(t);
        t.select();
        t.setSelectionRange(0, texto.length);
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(t);
        return ok;
    }

    var tarjetas = lista.map(function (c, i) {
        var banco = String(c.banco || "");
        var b = BANCOS[banco.toLowerCase()] || ["", banco.split(" ")[0]];
        return '<button type="button" class="pg-cuenta" data-i="' + i + '" aria-label="Copiar ' + esc(banco) + '">'
            + '<span class="pg-logo ' + b[0] + '">' + esc(b[1]) + '</span>'
            + '<span class="pg-info">'
            +   '<span class="pg-banco">' + esc(banco) + (c.uso ? ' <span class="pg-uso">· ' + esc(c.uso) + '</span>' : '') + '</span>'
            +   '<span class="pg-num">' + digitos(c).replace(/(\d{4})(?=\d)/g, "$1 ") + '</span>'
            +   (c.titular ? '<span class="pg-titular">' + esc(c.titular) + '</span>' : '')
            +   (c.aviso ? '<span class="pg-aviso">' + esc(c.aviso) + '</span>' : '')
            + '</span>'
            + '<span class="pg-copiar">' + ICON_COPY + '</span>'
            + '</button>';
    }).join("");

    box.innerHTML = '<button type="button" class="pg-abrir" aria-haspopup="dialog">'
        + ICON_CARD + '<span class="pg-titulo">CUENTAS PARA PAGAR</span></button>';
    box.hidden = false;

    // El modal va directo en <body> para que nada de la página lo recorte
    var modal = document.createElement("div");
    modal.className = "pg-modal";
    modal.setAttribute("data-tipo", tipo);
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "pg-modal-titulo");
    modal.innerHTML = '<div class="pg-caja">'
        + '<div class="pg-head"><div><div id="pg-modal-titulo">Cuentas para pagar</div>'
        + '<div class="pg-sub">Toca una cuenta para copiar el número</div></div>'
        + '<button type="button" class="pg-cerrar" aria-label="Cerrar">' + ICON_X + '</button></div>'
        + '<div class="pg-lista">' + tarjetas + '</div>'
        + '<div class="pg-confirma"><img src="' + new URL("assets/whatsapp-logo-5.png", BASE).href + '" alt="" width="22" height="22">'
        + '<p>Una vez realizado tu pago, <b>envía tus quinielas y comprobante por WhatsApp</b> para confirmar tu participación</p></div>'
        + '<div class="pg-toast" role="status">' + ICON_OK + '<span>Número copiado</span></div>'
        + '</div>';
    document.body.appendChild(modal);
    var toast = modal.querySelector(".pg-toast");

    function abrir() {
        modal.classList.add("abierto");
        document.body.classList.add("pg-sin-scroll");
        modal.querySelector(".pg-cerrar").focus();
    }
    function cerrar() {
        modal.classList.remove("abierto");
        document.body.classList.remove("pg-sin-scroll");
    }

    box.querySelector(".pg-abrir").addEventListener("click", abrir);
    modal.querySelector(".pg-cerrar").addEventListener("click", cerrar);
    // Tocar fuera de la caja cierra
    modal.addEventListener("click", function (e) { if (e.target === modal) cerrar(); });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("abierto")) cerrar();
    });

    modal.querySelector(".pg-lista").addEventListener("click", function (e) {
        var btn = e.target.closest(".pg-cuenta");
        if (!btn) return;
        copiar(digitos(lista[btn.getAttribute("data-i")]), function () {
            var prev = modal.querySelector(".pg-cuenta.copiado");
            if (prev && prev !== btn) marcar(prev, false);
            marcar(btn, true);
            toast.classList.add("visible");
            clearTimeout(btn._t);
            btn._t = setTimeout(function () { marcar(btn, false); }, 1800);
            clearTimeout(toast._t);
            toast._t = setTimeout(function () { toast.classList.remove("visible"); }, 1800);
        });
    });

    function marcar(btn, copiado) {
        btn.classList.toggle("copiado", copiado);
        btn.querySelector(".pg-copiar").innerHTML = copiado ? ICON_OK : ICON_COPY;
    }
})();
