const quantStorage = "quantity10m";
const resultStorage = "results10m";
const aliasStorage = "aliasM";

var hideBottomInfo = false
var prefix = null
var pricem = 20
//var tel = "5213317816346";
//var suspIndexm = 1;
const nPartidos = 10;

let quantity = localStorage.getItem(quantStorage);
let name = localStorage.getItem(aliasStorage);
let combinations = false;
var aux;
var id = 0;
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
    nameInput.addEventListener('input', function() {this.value = this.value.replace(/[&()%$#@]/g, '');;});
    recovername();
    for (var w = 0; w<suspIndexm.length; w++){
        if (suspIndexm[w]<=res.length)
            res[suspIndexm[w]] = 'X';
    }

    var lista = document.getElementById("lista");
    var container = document.getElementById("text");
    container.innerHTML = res.join("\xa0\xa0");

    if (quantity) sendBtnQuantityLabel.textContent = quantity;

    if (hideBottomInfo) {
        container.style.marginTop = '0'
        document.getElementsByClassName('controles')[0].style.marginTop = '0'
    }

    var results = localStorage.getItem(resultStorage);
    if (!results) return
    results = results.split("*");

    for (var i = 0; i < quantity; i++){
        if (!results[i]) break;

        var fila = lista.insertRow(i);
        //Resultados
        if (results[i].split("\xa0\xa0")[0][0]!="L" && results[i].split("\xa0\xa0")[0][0]!="E" && results[i].split("\xa0\xa0")[0][0]!="V")
            results[i] = results[i].slice(1);

        for (var j =0; j < nPartidos; j++) {
            cell1 = fila.insertCell(j)
            if (suspIndexm.includes(j))
                cell1.innerHTML += 'X';
            else
            cell1.innerHTML += results[i].split("\xa0\xa0")[j];
            cell1.style.width = "6.3%";
            if (results[i].split("\xa0\xa0")[j].length == 2)
                cell1.style.fontSize = "small";
            if (results[i].split("\xa0\xa0")[j].length == 3)
                cell1.style.fontSize = "x-small";
        }

        //Nombre
        var cell2 = fila.insertCell(nPartidos);
        cell2.innerHTML += results[i].split("\xa0\xa0")[nPartidos];
        cell2.style.fontSize = "small";
        cell2.style.overflow = "hidden";
        cell2.style.overflowY = "hidden";
        cell2.style.border = "none";
        cell2.className = "cellname";
        cell2.scrollTo(80,0);

        if(results[i].split("\xa0\xa0")[nPartidos].length > 15)
            cell2.style.fontSize = "xx-small";
        else if(results[i].split("\xa0\xa0")[nPartidos].length > 11)
            cell2.style.fontSize = "x-small";

        //Boton borrar
        var cell3 = fila.insertCell(nPartidos+1);
        cell3.innerHTML += '<ion-icon name="close-circle" class="deleteIcon"></ion-icon>';
        cell3.style.width = "6.3%";
        cell3.id = "x" + i;
        cell3.className = "deleter"
        cell3.addEventListener('click', function(){remove(this);  this.replaceWith(this.cloneNode(true));});
    }

    id = i;
    document.getElementById("botonenviar").style.filter = "none";
    document.getElementById("total").innerHTML = "Total: $" + quantity*pricem +"\n";
}

function updatelista(modo){
    var lista = document.getElementById("lista");
    var lastIndex = lista.getElementsByTagName("tr").length;

    if (modo == 1){ //Agregar
        if (aux == undefined) aux=0;
        
        var fila = lista.insertRow(lastIndex);

        for (var j =0; j < nPartidos; j++) {
            cell1 = fila.insertCell(j)
            cell1.innerHTML += res[j];
            cell1.style.width = "7%";
            if (res[j].length == 2)
                cell1.style.fontSize = "small";
            if (res[j].length == 3)
                cell1.style.fontSize = "x-small";
        }

        if (aux>1){
            var cellname = fila.insertCell(nPartidos);
            cellname.innerHTML += name + " (" + aux + ")";
        } else{
            var cellname = fila.insertCell(nPartidos);
            cellname.innerHTML += name;
        }

        cellname.style.fontSize = "small";
        cellname.style.overflow = "hidden";
        cellname.style.overflowY = "hidden";
        cellname.style.border = "none";
        cellname.className = "cellname";
        cellname.scrollTo(80,0);

        if(name.length > 15) cellname.style.fontSize = "xx-small";
        else if(name.length > nPartidos) cellname.style.fontSize = "x-small";

        var cell3 = fila.insertCell(nPartidos+1);
        cell3.innerHTML += '<ion-icon name="close-circle" class="deleteIcon"></ion-icon>';
        cell3.style.width = "6.3%";
        cell3.id = "x" + id;
        cell3.className = "deleter";
        cell3.addEventListener('click', function(){remove(this); this.replaceWith(this.cloneNode(true));});
        id++;
        aux = 1;
    }
    else if (modo == 2){ //Eliminar
        id = 0;
        deleters = lista.getElementsByClassName("deleter");
        for (var i = 0; i < lastIndex ;i++) {
            deleters[i].id = "x" + id;
            id++;
        }

    }
    document.getElementById("total").innerHTML = "Total: $" + quantity*pricem;
}

function selection(element){        //Pinta la casilla y actualiza el texto de la quiniela.
    var index = parseInt(element.id.slice(1)) - 1;
    if (suspIndexm.includes(index)) return;
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
            console.log(res[index].length);
            if (res[index] != "_" && res[index].length>1)
                res[index] = res[index].split(element.id.slice(0,1)).join('');
            else    
                res[index] = "_";
        }
    }
    costoactual();
    container.innerHTML = res.join("\xa0\xa0");
    if (res.join("\xa0\xa0").length>35){
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
        if ((!quantity || quantity == 0) && !res.includes("_"))
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

function number(){              //Actualiza el número del boton "Enviar"
    quantity = localStorage.getItem(quantStorage);
    if (quantity)
        localStorage.setItem(quantStorage, ++quantity);
    else{
        localStorage.setItem(quantStorage, 1);
        quantity = localStorage.getItem(quantStorage);
    }
    sendBtnQuantityLabel.textContent = quantity;
    localStorage.setItem(aliasStorage, name);
}

function result(){              //Actualiza el localstorage cuando se añade una nueva quiniela
    results = localStorage.getItem(resultStorage);
    name = nameInput.value;
    name = name.split('*').join('').trim().replace(/[&()%$#@]/g, '');
    if (prefix != null && prefix !== '') name = prefix + ' ' + name
    if (results){
        if (aux > 1)
        localStorage.setItem(resultStorage, results + "\n" + res.join("\xa0\xa0") + "\xa0\xa0" + name + " (" + aux + ")" + "*");
        else
            localStorage.setItem(resultStorage, results + "\n" + res.join("\xa0\xa0") + "\xa0\xa0" + name + "*");
    } else {
        if (aux > 1)
        localStorage.setItem(resultStorage,res.join("\xa0\xa0") + "\xa0\xa0" + name + " (" + aux + ")" +  "*");
        else    
            localStorage.setItem(resultStorage,res.join("\xa0\xa0") + "\xa0\xa0" + name+ "*");
    }       
}

function save(){                //Se añade la quiniela actual a la lista 
    if (id > 150) {
        return alert("Envía tus quinielas guardadas antes de agregar más");
    }

    if (res.join("\xa0\xa0").includes("_")) {
        return alert("Debes llenar todos los partidos");
    }
        
    name = nameInput.value.trim().replace(/[&()%$#@]/g, '');
    if (!name){
        nameInput.focus();
        return alert("Debes elegir un nombre");
    }
    //Se actualizan los iconos de ayuda
    touchIconDiv2.style.display = "none";

    if (combinations) calculate();
    else number();

    result();
    updatelista(1);
    clean();
}

function clean(){               //Boton para limpiar la quinela
    res = Array(nPartidos).fill("_");
    for (var w = 0; w<suspIndexm.length; w++){
        if (suspIndexm[w]<=res.length)
            res[suspIndexm[w]] = 'X';
    }
    var container = document.getElementById("text");
    container.innerHTML = res.join("\xa0\xa0");
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
    name = localStorage.getItem(aliasStorage);
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

function calculate(){
    aux = 1;
    for (var i=0;i<nPartidos;i++){
        aux*= res[i].length;
    }
    quantity = localStorage.getItem(quantStorage);
    if (quantity){
        localStorage.setItem(quantStorage, parseInt(quantity)+aux);
        quantity = localStorage.getItem(quantStorage);
    } else {
        localStorage.setItem(quantStorage, aux);
        quantity = localStorage.getItem(quantStorage);}
    sendBtnQuantityLabel.textContent = quantity;

    localStorage.setItem(aliasStorage, name);
}

function random(){
    clean();
    //Se actualizan los iconos de ayuda
    if (nombre == "")
        touchIconDivName.style.display = "block";
    else{
        touchIconDivName.style.display = "none";
        if (!quantity || quantity == 0) touchIconDiv2.style.display = "block";
    }

    if (touchIcon){
        touchIcon = false;
        document.getElementById("touchIconDiv").style.display = "none";
    }
    
    var container = document.getElementById("text");
    var partidos = document.getElementsByClassName("partido");
    for (var i = 0; i < nPartidos; i++){
        if(suspIndexm.includes(i)) continue;
        var r = getRandomInt(0,2);
        partidos[i].getElementsByTagName("span")[r].className = "opcion-active";
        res[i] = ["L","E","V"][r];
        }
    container.innerHTML = res.join("\xa0\xa0");
    costoactual();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function costoactual(){
    var aux2 = 1;
    for (var i=0;i<nPartidos;i++){
            aux2*= res[i].length;
    }
    document.getElementById("costo").innerHTML = "Costo: $" + aux2*pricem;
    document.getElementById("numquinielas").innerHTML = aux2 + " Quiniela(s)";
}

function remove(e){
    lista = document.getElementById("lista");
    eindex = e.id.slice(1);
    tr = lista.getElementsByTagName("tr")[eindex];

    lista.deleteRow(eindex);

    results = localStorage.getItem(resultStorage);
    results = results.split("*");

    removing = results[eindex].split("\xa0\xa0");
    if (removing[0][0]!="L" && removing[0][0]!="E" && removing[0][0]!="V")
        removing[0] = removing[0].slice(1);
    var aux3 = 1;
    for (var i=0;i<nPartidos;i++)
        aux3*= removing[i].length;
    quantity -= aux3;
    localStorage.setItem(quantStorage,quantity);
    results.splice(eindex,1);
    results = results.join("*");
    localStorage.setItem(resultStorage,results);

    sendBtnQuantityLabel.textContent = quantity;
    document.getElementById("total").innerHTML = "Total: $" + quantity*pricem +"\n";

    nombre = nameInput.value.trim();
    //Se actualizan los iconos de ayuda
    if ((!quantity || quantity == 0) && !res.includes("_") && nombre != ""){
        touchIconDiv2.style.display = "block";
    }
    else
         touchIconDiv2.style.display = "none";

    updatelista(2);
}

function deleteall(){
    if(!confirm("Se borrará todo")) return
    
    localStorage.setItem(quantStorage,"");
    localStorage.setItem(resultStorage,"");
    location.reload();
}

function send(){                //Envia la quiniela al whatsapp 
    if (!quantity || quantity < 1){
        alert("La lista está vacía\r\nPresiona [AGREGAR] para añadir una quiniela");
        touchIconDiv2.style.display = "block";
        return;
    }
    if (quantity < 2 && min2telsm.includes(telm)){
        alert("La participación mínima es de 2 Quinielas.")
        return;
    }
    if (quantity > 0) {
        const storageResults = localStorage.getItem(resultStorage);
        const splittedResults = storageResults.split("*");  
        const whatsappText = splittedResults.join('').replace(/#/g,'');
        openWhatsApp(telm, whatsappText);
    }
}

function updateIcons(element){
    if (element.value.trim() != ""){
        touchIconDivName.style.display = "none";
        if ((!quantity || quantity == 0) && !res.includes("_"))
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

window.addEventListener("load",start,false);