const quantStorage = "quantity11";
const resultStorage = "results11";
const aliasStorage = "alias";

var hideBottomInfo = false
var prefix = null
var price = 25;
//var tel = "5213317816346";
//var suspIndex = 1;
const nPartidos = 11;
const SEP = "\xa0\xa0";
const MAX_GUARDADAS = 150;

// El dibujo está definido una sola vez (<symbol id="i-close-circle"> en el HTML); cada fila solo lo referencia con <use>.
// Se pone xlink:href además de href porque navegadores viejos solo entienden xlink:href.
const CLOSE_CIRCLE_ICON = '<svg class="ico deleteIcon" viewBox="0 0 512 512" width="1em" height="1em" aria-hidden="true"><use xlink:href="#i-close-circle" href="#i-close-circle"></use></svg>';

// localStorage puede no existir o lanzar error (WebViews de apps sin almacenamiento, Safari con cookies
// bloqueadas, modo privado viejo). En ese caso se guarda en memoria para que la página siga funcionando.
const store = (function(){
    try {
        var ls = window.localStorage;
        ls.setItem("__test", "1");
        ls.removeItem("__test");
        return ls;
    } catch (e) {
        var memory = {};
        return {
            getItem: function(key){ return Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null; },
            setItem: function(key, value){ memory[key] = String(value); }
        };
    }
})();

let quantity = 0;   // Nunca se suma/resta a mano: siempre se recalcula desde la lista guardada (ver renderList).
let name = store.getItem(aliasStorage);
let combinations = false;
var touchIcon = true;

let touchIconDivName, touchIconDiv2, sendBtnQuantityLabel, nameInput

var res = Array(nPartidos).fill("_");

function getHtmlElements() {
    touchIconDivName = document.getElementById("touchIconDivName")
    touchIconDiv2 = document.getElementById("touchIconDiv2")
    sendBtnQuantityLabel = document.querySelector('#botonenviar span')
    nameInput = document.getElementById("nombre")
}

function start(){
    getHtmlElements()
    nameInput.addEventListener('input', function() {this.value = this.value.replace(/[&()%$#@]/g, '');});
    recovername();
    res = emptyQuiniela();

    var container = document.getElementById("text");
    container.innerHTML = res.join(SEP);

    if (hideBottomInfo) {
        container.style.marginTop = '0'
        document.getElementsByClassName('controles')[0].style.marginTop = '0'
    }

    renderList();
    // Si la lista cambia en otra pestaña, se vuelve a dibujar para no quedar desincronizada.
    window.addEventListener("storage", function(e){ if (e.key === resultStorage) renderList(); });
}

function emptyQuiniela(){
    var empty = Array(nPartidos).fill("_");
    suspIndex.forEach(function(i){ if (i < nPartidos) empty[i] = 'X'; });
    return empty;
}

// ---- Lista guardada ----
// store[resultStorage] es la única fuente de verdad. Se conserva el formato de siempre
// ("quiniela1*\nquiniela2*") para que versiones viejas del script en caché sigan funcionando.
// Cada quiniela es "L  E  V ...  Nombre" separada por SEP.

function getEntries(){
    var stored = store.getItem(resultStorage);
    if (!stored) return [];
    return stored.split("*")
        .map(function(entry){ return entry.replace(/^\n+/, ''); })
        .filter(function(entry){ return entry.trim() !== ''; });
}

function setEntries(entries){
    store.setItem(resultStorage, entries.map(function(entry){ return entry + "*"; }).join("\n"));
    store.setItem(quantStorage, countQuinielas(entries) || "");
}

function combinationsOf(picks){     //Número de quinielas que representa una selección (producto de opciones por partido)
    var total = 1;
    for (var i = 0; i < nPartidos; i++)
        total *= (picks[i] || "").length || 1;
    return total;
}

function countQuinielas(entries){
    return entries.reduce(function(sum, entry){ return sum + combinationsOf(entry.split(SEP)); }, 0);
}

function renderList(){              //Dibuja la tabla y actualiza el total y el botón "Enviar" desde lo guardado
    var entries = getEntries();
    var lista = document.getElementById("lista");
    lista.innerHTML = "";

    entries.forEach(function(entry, index){
        var parts = entry.split(SEP);
        var fila = lista.insertRow(-1);

        //Resultados
        for (var j = 0; j < nPartidos; j++) {
            var pick = suspIndex.includes(j) ? 'X' : (parts[j] || '');
            var cell = fila.insertCell(-1);
            cell.textContent = pick;
            cell.style.width = "6.3%";
            if (pick.length == 2) cell.style.fontSize = "small";
            if (pick.length == 3) cell.style.fontSize = "x-small";
        }

        //Nombre
        var entryName = parts.slice(nPartidos).join(SEP);
        var cellname = fila.insertCell(-1);
        cellname.textContent = entryName;
        cellname.className = "cellname";
        cellname.style.fontSize = entryName.length > 15 ? "xx-small" : entryName.length > 11 ? "x-small" : "small";
        cellname.style.overflow = "hidden";
        cellname.style.border = "none";
        cellname.scrollLeft = 80;   // scrollLeft funciona en todos los navegadores; Element.scrollTo no existe en WebViews viejos

        //Boton borrar
        var deleter = fila.insertCell(-1);
        deleter.innerHTML = CLOSE_CIRCLE_ICON;
        deleter.style.width = "6.3%";
        deleter.className = "deleter";
        deleter.addEventListener('click', function(){ remove(index); });
    });

    quantity = countQuinielas(entries);
    sendBtnQuantityLabel.textContent = quantity;
    document.getElementById("total").innerHTML = "Total: $" + quantity*price;
    return entries;
}

function selection(element){        //Pinta la casilla y actualiza el texto de la quiniela.
    var index = parseInt(element.id.slice(1)) - 1;
    if (suspIndex.includes(index)) return;
    var container = document.getElementById("text");
    if (element.className != "opcion-active"){
        if (!combinations){
            validation(element);
            res[index] = element.id.slice(0,1);
            }
        else{
            res[index] += element.id.slice(0,1);
            res[index] = res[index].split('_').join('');
        }
        element.className = "opcion-active";
    }
    else{
        if(combinations){
            element.className = "opcion";
            if (res[index] != "_" && res[index].length>1)
                res[index] = res[index].split(element.id.slice(0,1)).join('');
            else
                res[index] = "_";
        }
    }
    costoactual();
    container.innerHTML = res.join(SEP);
    if (res.join(SEP).length>35){
        container.className = "text-sm";
    }
    else{
        container.className = "text-lg";
    }

    //Se actualizan los iconos de ayuda
    nombre = nameInput.value.trim();
    if (nombre == "" && !res.includes("_")){
        touchIconDivName.style.display = "block";
    }
    else{
        touchIconDivName.style.display = "none";
        if (quantity == 0 && !res.includes("_"))
            touchIconDiv2.style.display = "block";
        else
            touchIconDiv2.style.display = "none";
    }
    if (touchIcon){
        touchIcon = false;
        document.getElementById("touchIconDiv").style.display = "none";
    }
}

function validation(element){    //Despinta todas las casillas y asigna el index con el número de la casilla seleccionada.
    var index = parseInt(element.id.slice(1));
    document.getElementById("L"+index).className = "opcion";
    document.getElementById("E"+index).className = "opcion";
    document.getElementById("V"+index).className = "opcion";
}

function save(){                //Se añade la quiniela actual a la lista
    var entries = getEntries();
    if (entries.length > MAX_GUARDADAS) {
        return alert("Envía tus quinielas guardadas antes de agregar más");
    }

    if (res.includes("_")) {
        return alert("Debes llenar todos los partidos");
    }

    name = nameInput.value.trim().replace(/[&()%$#@]/g, '');
    if (!name){
        nameInput.focus();
        return alert("Debes elegir un nombre");
    }
    //Se actualizan los iconos de ayuda
    touchIconDiv2.style.display = "none";
    store.setItem(aliasStorage, name);

    var entryName = name.split('*').join('');
    if (prefix != null && prefix !== '') entryName = prefix + ' ' + entryName;
    var count = combinationsOf(res);
    if (count > 1) entryName += " (" + count + ")";

    entries.push(res.join(SEP) + SEP + entryName);
    setEntries(entries);
    renderList();
    clean();
}

function clean(){               //Boton para limpiar la quinela
    res = emptyQuiniela();
    var container = document.getElementById("text");
    container.innerHTML = res.join(SEP);
    spans = document.querySelectorAll(".quiniela span");
    for (var i=0; i<nPartidos*3;i++)
        spans[i].className = "opcion";
    document.getElementById("costo").innerHTML = "Costo: $0";
    document.getElementById("numquinielas").innerHTML = "0 Quiniela(s)";
    container.className = "text-lg";

    //Se actualizan los iconos de ayuda
    nombre = nameInput.value.trim();
    if (nombre == "" && !res.includes("_")){
        touchIconDivName.style.display = "block";
    }
    else{
        touchIconDivName.style.display = "none";
    }
    touchIconDiv2.style.display = "none";
}

function recovername(){
    name = store.getItem(aliasStorage);
    if (name ==  null || name === "null") return
    nameInput.value = name.trim();
}

function clearname(){
    nameInput.value = "";
    if (!res.includes("_")) touchIconDivName.style.display = "block";
    touchIconDiv2.style.display = "none";
}

function allowcombination(){
    if (!combinations) {
        combinations = true;
        document.getElementById("checkcombinaciones").className = "boton allowcomb-active"
    } else {
        combinations= false;
        document.getElementById("checkcombinaciones").className = "boton allowcomb"
        clean();
    }
}

function random(){
    clean();
    //Se actualizan los iconos de ayuda
    if (nombre == "")
        touchIconDivName.style.display = "block";
    else{
        touchIconDivName.style.display = "none";
        if (quantity == 0) touchIconDiv2.style.display = "block";
    }

    if (touchIcon){
        touchIcon = false;
        document.getElementById("touchIconDiv").style.display = "none";
    }

    var container = document.getElementById("text");
    var partidos = document.getElementsByClassName("partido");
    for (var i = 0; i < nPartidos; i++){
        if(suspIndex.includes(i)) continue;
        var r = getRandomInt(0,2);
        partidos[i].getElementsByTagName("span")[r].className = "opcion-active";
        res[i] = ["L","E","V"][r];
        }
    container.innerHTML = res.join(SEP);
    costoactual();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function costoactual(){
    var count = combinationsOf(res);
    document.getElementById("costo").innerHTML = "Costo: $" + count*price;
    document.getElementById("numquinielas").innerHTML = count + " Quiniela(s)";
}

function remove(index){
    var entries = getEntries();
    entries.splice(index, 1);
    setEntries(entries);
    renderList();

    nombre = nameInput.value.trim();
    //Se actualizan los iconos de ayuda
    if (quantity == 0 && !res.includes("_") && nombre != "")
        touchIconDiv2.style.display = "block";
    else
        touchIconDiv2.style.display = "none";
}

function deleteall(){
    if(!confirm("Se borrará todo")) return

    setEntries([]);
    location.reload();
}

function send(){                //Envia la quiniela al whatsapp
    var entries = renderList();     //Se relee lo guardado para enviar exactamente lo que se ve
    if (quantity < 1){
        alert("La lista está vacía\r\nPresiona [AGREGAR] para añadir una quiniela");
        touchIconDiv2.style.display = "block";
        return;
    }
    if (quantity < 2 && min2tels.includes(tel)){
        alert("La participación mínima es de 2 Quinielas.")
        return;
    }
    openWhatsApp(tel, entries.join("\n").replace(/#/g,''));
}

function updateIcons(element){
    if (element.value.trim() != ""){
        touchIconDivName.style.display = "none";
        if (quantity == 0 && !res.includes("_"))
            touchIconDiv2.style.display = "block";
    }
    else{
        touchIconDiv2.style.display = "none";
    }
}

function nameIn(){
    touchIconDivName.style.display = "none";
}

function nameOut(element){
    if (element.value.trim() == "") touchIconDivName.style.display = "block";
}

// DOMContentLoaded (no "load"): no espera imágenes ni fuentes, así los botones funcionan aunque la red sea lenta.
// Los scripts son defer, así que var.js ya se ejecutó cuando se dispara este evento.
document.addEventListener("DOMContentLoaded",start,false);

// Si la pestaña estuvo oculta más de 5 min, al volver se recarga para traer var.js actualizado
// (teléfonos, suspendidos). No recarga si hay una quiniela a medio llenar; la lista guardada sobrevive porque está en store.
var hiddenSince = null;
document.addEventListener("visibilitychange", function(){
    if (document.hidden) { hiddenSince = Date.now(); return; }
    var midFill = res.join("") !== emptyQuiniela().join("");
    if (hiddenSince && Date.now() - hiddenSince > 5 * 60 * 1000 && !midFill) location.reload();
    hiddenSince = null;
});
