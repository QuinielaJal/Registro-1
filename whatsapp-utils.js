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
