// Navegadores internos / WebViews (Instagram, Facebook, TikTok, etc.): ahí los intent:// no funcionan
var IN_APP_BROWSER = /FBAN|FBAV|FB_IAB|FBIOS|Instagram|Messenger|TikTok|musical_ly|Bytedance|Snapchat|Twitter|Line\/|; wv\)/i;

function isAndroidBrowser(userAgent) {
    return /Android/i.test(userAgent) && !IN_APP_BROWSER.test(userAgent);
}

function waMeUrl(phone, encodedText) {
    return "https://wa.me/" + phone + "?text=" + encodedText;
}

// Intent de Android: fuerza abrir la app de WhatsApp; si no se puede, cae al enlace wa.me
function androidIntentUrl(phone, encodedText) {
    return "intent://send?phone=" + phone + "&text=" + encodedText +
        "#Intent;scheme=whatsapp;S.browser_fallback_url=" +
        encodeURIComponent(waMeUrl(phone, encodedText)) + ";end";
}

// Esquema directo de la app: en WebViews de Android (Facebook, Instagram...) evita que wa.me caiga en WhatsApp Web
function whatsAppSchemeUrl(phone, encodedText) {
    return "whatsapp://send?phone=" + phone + "&text=" + encodedText;
}

function isAndroidInApp(userAgent) {
    return /Android/i.test(userAgent) && IN_APP_BROWSER.test(userAgent);
}

function whatsAppUrl(phone, message, userAgent) {
    var ua = userAgent || navigator.userAgent;
    var encodedText = encodeURIComponent(message);
    if (isAndroidBrowser(ua)) return androidIntentUrl(phone, encodedText);
    if (isAndroidInApp(ua)) return whatsAppSchemeUrl(phone, encodedText);
    return waMeUrl(phone, encodedText);
}

// Abre WhatsApp; en WebViews de Android, si la app no tomó el control, cae a wa.me
function openWhatsApp(phone, message) {
    if (isSendBlocked()) {
        if (sendBlockFrom === sendBlockTo) alert("La quiniela está cerrada.\r\nEspera la próxima jornada.");
        else alert("El registro virtual se encuentra en mantenimiento de " + formatHour(sendBlockFrom) + " a " + formatHour(sendBlockTo) + " (hora de México).");
        updateSendButton();
        return;
    }
    var ua = navigator.userAgent;
    window.location.href = whatsAppUrl(phone, message, ua);
    if (isAndroidInApp(ua)) {
        setTimeout(function () {
            if (!document.hidden) {
                window.location.href = waMeUrl(phone, encodeURIComponent(message));
            }
        }, 1500);
    }
}

// Bloqueo de envíos en un horario (por defecto 2am a 7am). Todo va en try/catch: si algo falla, solo se pierde el bloqueo y la página sigue normal.

// Diferencia entre la hora del servidor y el reloj del dispositivo (0 si no se pudo obtener)
var serverOffset = 0;
var serverTimeRequested = false;

// Lo activa la configuración de cada vendedor (var.js llama a setSendBlock); los demás sitios cargan este mismo archivo
var sendBlockEnabled = false;
var sendBlockFrom = 2;
var sendBlockTo = 7;

function setSendBlock(enabled, from, to) {
    try {
        sendBlockEnabled = !!enabled;
        if (from >= 0 && from <= 23) sendBlockFrom = from;
        if (to >= 0 && to <= 23) sendBlockTo = to;
        requestServerTime();
        updateSendButton();
    } catch (e) {}
}

// Envíos desactivados de sendBlockFrom a sendBlockTo hora de México (UTC-6 fijo: México no tiene horario de verano desde 2022).
// Si "desde" es mayor que "hasta" el horario cruza la medianoche (ej. 23 a 7).
function isSendBlocked() {
    try {
        if (!sendBlockEnabled) return false;
        if (sendBlockFrom === sendBlockTo) return true;
        var h = (new Date(Date.now() + serverOffset).getUTCHours() + 18) % 24;
        if (sendBlockFrom <= sendBlockTo) return h >= sendBlockFrom && h < sendBlockTo;
        return h >= sendBlockFrom || h < sendBlockTo;
    } catch (e) {
        return false;
    }
}

function formatHour(h) {
    return (h % 12 || 12) + ":00 " + (h < 12 ? "am" : "pm");
}

// Toma la hora del servidor (encabezado Date) para no depender del reloj del dispositivo. Una sola vez y solo si hay bloqueo.
function requestServerTime() {
    if (serverTimeRequested || !sendBlockEnabled || !window.fetch) return;
    serverTimeRequested = true;
    fetch(location.href, { method: "HEAD", cache: "no-store" }).then(function (r) {
        var t = Date.parse(r.headers.get("Date"));
        if (!isNaN(t)) {
            serverOffset = t - Date.now();
            updateSendButton();
        }
    }).catch(function () {});
}

// Pone el botón de enviar en gris mientras los envíos están desactivados
function updateSendButton() {
    try {
        var btn = document.getElementById("botonenviar");
        if (!btn) return;
        if (isSendBlocked()) {
            btn.style.setProperty("filter", "grayscale(1)", "important");
        } else {
            btn.style.removeProperty("filter");
        }
    } catch (e) {}
}

try {
    document.addEventListener("DOMContentLoaded", updateSendButton);
    setInterval(updateSendButton, 60000);
} catch (e) {}
