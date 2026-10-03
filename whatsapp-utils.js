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

function whatsAppUrl(phone, message, userAgent) {
    var ua = userAgent || navigator.userAgent;
    var encodedText = encodeURIComponent(message);
    return isAndroidBrowser(ua)
        ? androidIntentUrl(phone, encodedText)
        : waMeUrl(phone, encodedText);
}
