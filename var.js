// Configuración de todos los sitios (Registro-1 ... Registro-17). Todos cargan este mismo archivo desde Registro-1:
// para cambiar un teléfono, precio o partido suspendido se edita aquí y se hace push de Registro-1 (llega en unos minutos).
//
// global:
//   price / pricem            precio de la quiniela / de media semana
//   suspIndex / suspIndexm    partidos suspendidos, contando desde 0 (partido 1 = 0). Ej. [0, 4] = partidos 1 y 5
//   sendBlockFrom / To        horario sin envíos a WhatsApp (hora de México), para los vendedores con sendBlock
// vendors (la clave es el N de Registro-N):
//   tel / telm                WhatsApp de la quiniela / de media semana, con lada de país (52...)
//   min2 / min2m              pedir mínimo 2 quinielas
//   sendBlock                 aplicar el horario sin envíos
//   disableRedirect, hideBottomInfo
//   price / pricem            opcional: precio distinto al global solo para ese vendedor
//   cuentas / cuentasm        opcional: cuentas para pagar de la quiniela / de media semana (sección "Cuentas para pagar").
//                             Lista de {banco, num, uso, titular, aviso}; solo banco y num son obligatorios.
//                             num con o sin espacios (se copia sin ellos). Sin cuentas, la sección no aparece.
var QJ_CONFIG = {
    "global": {"price":25,"pricem":20,"suspIndex":[],"suspIndexm":[],"sendBlockFrom":2,"sendBlockTo":7},
    "vendors": {
        "1": {"tel":"5213330335106","telm":"5213313265676","min2":true,"min2m":true,"sendBlock":false,"disableRedirect":false,"hideBottomInfo":false,
            "cuentas": [
                {"banco":"BBVA","num":"4152 3145 2178 7229","uso":"Solo transferencias","titular":"Eduardo Garcia Valenzuela"},
                {"banco":"Spin OXXO","num":"4217 4702 7189 4913","uso":"Solo depósitos en OXXO"},
                {"banco":"Spin OXXO","num":"4217 4701 6624 5981","uso":"Solo depósitos en OXXO"},
                {"banco":"BanCoppel","num":"4169 1606 5032 3992","uso":"Depósito en sucursal o transferencia BanCoppel","titular":"Eduardo Garcia Valenzuela","aviso":"No depositar en OXXO a esta cuenta"}
            ],
            "cuentasm": [
                {"banco":"HSBC","num":"4213 1661 8559 8962","uso":"Transferencias o depósitos","titular":"Luis Angel Romero Garcia"},
                {"banco":"Spin OXXO","num":"4217 4701 6624 5981","uso":"Solo depósitos en OXXO"},
                {"banco":"Spin OXXO","num":"4217 4701 8488 5602","uso":"Solo depósitos en OXXO"},
                {"banco":"BanCoppel","num":"4169 1604 8119 3747","uso":"Depósito en sucursal o transferencia BanCoppel","titular":"Jorge Salvador Becerra","aviso":"No depositar en OXXO a esta cuenta"}
            ]},
        "2": {"tel":"5213314457066","telm":"5213317917329","min2":true,"min2m":true,"sendBlock":false,"disableRedirect":true,"hideBottomInfo":false,
            "cuentas": [
                {"banco":"BBVA","num":"4152 3139 4305 8227","uso":"Solo transferencias, practicaja y sucursal","titular":"Jessica Jesus Garcia"},
                {"banco":"Scotiabank","num":"4043 1300 1149 8421","uso":"Solo depósitos en OXXO","aviso":"No transferencias"},
                {"banco":"Spin OXXO","num":"4217 4700 3895 4554","uso":"Solo depósitos en OXXO","aviso":"No transferencias"},
                {"banco":"Banco Azteca","num":"5512 3823 8870 7525","uso":"Depósitos únicamente en sucursal"}
            ],
            "cuentasm": [
                {"banco":"BBVA","num":"4152 3139 5152 9119","uso":"Solo transferencias, practicaja y sucursal"},
                {"banco":"HSBC","num":"4213 1693 0981 9702","uso":"Solo depósitos en OXXO","aviso":"No transferencias"},
                {"banco":"Spin OXXO","num":"4217 4700 7638 8954","uso":"Solo depósitos en OXXO","aviso":"No transferencias"}
            ]},
        "3": {"tel":"5213318920664","telm":"5213333059683","min2":false,"min2m":false,"sendBlock":false,"disableRedirect":false,"hideBottomInfo":false},
        "4": {"tel":"5213314444345","telm":"5213319128966","min2":true,"min2m":true,"sendBlock":false,"disableRedirect":false,"hideBottomInfo":false,
            "cuentas": [
                {"banco":"BBVA","num":"4152 3139 8638 9133","uso":"Solo transferencias y practicaja"},
                {"banco":"Scotiabank","num":"4043 1300 2648 1347","uso":"Solo depósitos en OXXO","aviso":"No transferencias"},
                {"banco":"Spin OXXO","num":"4217 4700 6139 6806","uso":"Solo depósitos en OXXO","aviso":"No transferencias"},
                {"banco":"BanCoppel","num":"4169 1604 7415 2031","uso":"Transferencias desde BanCoppel y pagos en sucursal"}
            ],
            "cuentasm": [
                {"banco":"BBVA","num":"4152 3139 7513 8558","uso":"Solo transferencias, practicaja y sucursal"},
                {"banco":"Scotiabank","num":"5579 2091 4869 6062","uso":"Solo depósitos en OXXO","aviso":"No transferencias"},
                {"banco":"Spin OXXO","num":"4217 4700 8275 2441","uso":"Solo depósitos en OXXO","aviso":"No transferencias"},
                {"banco":"BanCoppel","num":"4169 1604 7415 2031","uso":"Depósitos únicamente en sucursal"}
            ]},
        "5": {"tel":"5213317816346","telm":"5213313265676","min2":false,"min2m":true,"sendBlock":false,"disableRedirect":false,"hideBottomInfo":false},
        "6": {"tel":"5213326253916","telm":"5213131913863","min2":false,"min2m":false,"sendBlock":false,"disableRedirect":false,"hideBottomInfo":false},
        "7": {"tel":"5217353896464","telm":"5217351815573","min2":false,"min2m":false,"sendBlock":false,"disableRedirect":false,"hideBottomInfo":false},
        "8": {"tel":"5213151159505","telm":"5213151143524","min2":false,"min2m":false,"sendBlock":false,"disableRedirect":false,"hideBottomInfo":false},
        "9": {"tel":"5213337713027","telm":"5213336263393","min2":false,"min2m":false,"sendBlock":false,"disableRedirect":false,"hideBottomInfo":false},
        "10": {"tel":"5213122982947","telm":"5213313265676","min2":false,"min2m":true,"sendBlock":false,"disableRedirect":false,"hideBottomInfo":false},
        "11": {"tel":"5218120030657","telm":"5218115912541","min2":false,"min2m":false,"sendBlock":false,"disableRedirect":false,"hideBottomInfo":false},
        "12": {"tel":"523317160015","telm":"523317160015","min2":false,"min2m":false,"sendBlock":false,"disableRedirect":false,"hideBottomInfo":false},
        "13": {"tel":"524777869030","telm":"524777869030","min2":false,"min2m":false,"sendBlock":false,"disableRedirect":false,"hideBottomInfo":false},
        "14": {"tel":"523339459207","telm":"523325365796","min2":false,"min2m":false,"sendBlock":false,"disableRedirect":false,"hideBottomInfo":false},
        "15": {"tel":"523881016980","telm":"523881016980","min2":false,"min2m":false,"sendBlock":false,"disableRedirect":false,"hideBottomInfo":false},
        "16": {"tel":"528132768851","telm":"528132768851","min2":false,"min2m":false,"sendBlock":false,"disableRedirect":false,"hideBottomInfo":false},
        "17": {"tel":"527555577360","telm":"527555577360","min2":false,"min2m":false,"sendBlock":false,"disableRedirect":false,"hideBottomInfo":false}
    }
};

// Vendedor según la URL:
//   ?registro=N                          -> "N" (para pruebas, también en local)
//   registro-N.pages.dev (y sus previews abc123.registro-N.pages.dev) -> "N"
//   quinielajal.github.io/Registro-N/   -> "N"
// Cualquier otra URL (local, otro dominio) usa Registro-1.
var vendorSlug = (function () {
    try {
        var m = /[?&]registro=(\d+)/i.exec(location.search)
             || /(?:^|\.)registro-(\d+)\.pages\.dev$/i.exec(location.hostname)
             || /^\/Registro-(\d+)(\/|$)/i.exec(location.pathname);
        if (m) return m[1];
    } catch (e) {}
    return "1";
})();

// Variables que usan main11.js, mainm.js, whatsapp-utils.js, pagos.js y las páginas de contacto
var tel, telm, price, pricem, suspIndex, suspIndexm, min2tels, min2telsm, hideBottomInfo, disableRedirect, cuentas, cuentasm;

(function () {
    var g = QJ_CONFIG.global;
    var v = QJ_CONFIG.vendors[vendorSlug] || {};   // Vendedor que no está en la lista: queda sin teléfono
    function pick(key) { return v[key] !== undefined && v[key] !== null ? v[key] : g[key]; }

    tel = String(v.tel || "");
    telm = String(v.telm || "");
    price = Number(pick("price"));
    pricem = Number(pick("pricem"));
    suspIndex = g.suspIndex || [];
    suspIndexm = g.suspIndexm || [];
    min2tels = v.min2 ? [tel] : [];
    min2telsm = v.min2m ? [telm] : [];
    hideBottomInfo = !!v.hideBottomInfo;
    disableRedirect = !!v.disableRedirect;
    cuentas = v.cuentas || [];
    cuentasm = v.cuentasm || [];
    if (typeof setSendBlock === "function") setSendBlock(!!v.sendBlock, g.sendBlockFrom, g.sendBlockTo);
})();
