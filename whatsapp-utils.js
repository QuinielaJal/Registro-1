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
        alert("Los envíos están desactivados de 2:00 am a 7:00 am (hora de México).");
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

// Bloqueo de envíos de 2am a 7am. Todo va en try/catch: si algo falla, solo se pierde el bloqueo y la página sigue normal.

// Diferencia entre la hora del servidor y el reloj del dispositivo (0 si no se pudo obtener)
var serverOffset = 0;

// Solo aplica en el sitio de 1Joel (quinielajal.github.io/Registro-1/); los demás sitios cargan este mismo archivo
var sendBlockEnabled = false;
try {
    sendBlockEnabled = /^\/Registro-1(\/|$)/i.test(location.pathname);
} catch (e) {}

// Envíos desactivados de 2am a 7am hora de México (UTC-6 fijo: México no tiene horario de verano desde 2022)
function isSendBlocked() {
    try {
        if (!sendBlockEnabled) return false;
        var h = (new Date(Date.now() + serverOffset).getUTCHours() + 18) % 24;
        return h >= 2 && h < 7;
    } catch (e) {
        return false;
    }
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

    // Toma la hora del servidor (encabezado Date) para no depender del reloj del dispositivo
    if (sendBlockEnabled && window.fetch) {
        fetch(location.href, { method: "HEAD", cache: "no-store" }).then(function (r) {
            var t = Date.parse(r.headers.get("Date"));
            if (!isNaN(t)) {
                serverOffset = t - Date.now();
                updateSendButton();
            }
        }).catch(function () {});
    }
} catch (e) {}
