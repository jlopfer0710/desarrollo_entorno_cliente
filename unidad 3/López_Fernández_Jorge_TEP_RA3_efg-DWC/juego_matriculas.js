
var patron = /^[0-9]{4}$/;
var cont_poker = 0, cont_pareja_doble = 0, cont_trio = 0, cont_escalera_simp = 0, cont_escalera_completa = 0;
var inputValor, figura = "";
var prob_poker = 0, prob_trio = 0, prob_pareja = 0, prob_escalera_simp = 0, prob_escalera_comp = 0,ventana;
function jugar() {
    if (!inputValor.match(patron)) {
        alert("Recuerda que debes introducir una mano de 4 cartas compuesta por números del 0 al 9");
    } else {
        var num_aux = inputValor.split("");
        num_aux.sort((a, b) => a - b);
        if (num_aux.every(element => element === num_aux[0])) {
            figura = "Es un poker";
        } else if ((num_aux[0] === num_aux[1] && num_aux[2] === num_aux[3]) || (num_aux[0] === num_aux[2] && num_aux[1] === num_aux[3]) || (num_aux[0] === num_aux[3] && num_aux[1] === num_aux[2])) {
            figura = "Es una doble pareja";
        } else if ((num_aux[0] === num_aux[1] && num_aux[0] === num_aux[2]) || (num_aux[0] === num_aux[1] && num_aux[0] === num_aux[3]) || (num_aux[1] === num_aux[2] && num_aux[1] === num_aux[3])) {
            figura = "Es un trío";
        } else if ((parseInt(num_aux[0]) + 1) === parseInt(num_aux[1]) && parseInt(num_aux[0]) + 2 === parseInt(num_aux[2]) && (parseInt(num_aux[0]) + 3) === parseInt(num_aux[3])) {
            figura = "Es una escalera completa";
        } else if (
            (parseInt(num_aux[0]) + 1 === parseInt(num_aux[1]) && parseInt(num_aux[1]) + 1 === parseInt(num_aux[2])) ||
            (parseInt(num_aux[1]) + 1 === parseInt(num_aux[2]) && parseInt(num_aux[2]) + 1 === parseInt(num_aux[3])) ||
            (parseInt(num_aux[0]) + 1 === parseInt(num_aux[1]) && parseInt(num_aux[1]) + 1 === parseInt(num_aux[3])) ||
            (parseInt(num_aux[0]) + 1 === parseInt(num_aux[2]) && parseInt(num_aux[2]) + 1 === parseInt(num_aux[3]))
        ) {
            figura = "Es una escalera simple";
        }
        probabilidades();
    }
}
function probabilidades() {
    var poker = document.getElementById("poker");
    var doble = document.getElementById("doble");
    var trio = document.getElementById("trio");
    var simp = document.getElementById("simp");
    var comp = document.getElementById("comp");
    for (let i = 0; i < 10000; i++) {
        var aux = [];
        if (i < 10) {
            let i_aux = i.toString();
            aux = i_aux.split("");
            aux.unshift("0");
            aux.unshift("0");
            aux.unshift("0");
            aux.sort((a, b) => a - b)
            console.log(aux);
        } else if (i < 100) {
            let i_aux = i.toString();
            aux = i_aux.split("");
            aux.unshift("0");
            aux.unshift("0");
            aux.sort((a, b) => a - b)
            console.log(aux);
        } else if (i <= 999) {
            let i_aux = i.toString();
            aux = i_aux.split("");
            aux.unshift("0");
            aux.sort((a, b) => a - b)
            console.log(aux);
        } else {
            let i_aux = i.toString();
            aux = i_aux.split("");
            aux.sort((a, b) => a - b)
            console.log(aux);
        }
        if (esPoker(aux)) {
            cont_poker++;
        } else if (esParejaDoble(aux)) {
            cont_pareja_doble++;
        } else if (esTrio(aux)) {
            cont_trio++;
        } else if (esEscaleraComp(aux)) {
            cont_escalera_completa++;
        } else if (esEscaleraSimp(aux)) {
            cont_escalera_simp++;
        }
    }
    prob_poker = (cont_poker / 10000) * 100;
    prob_poker = prob_poker.toFixed(2);
    prob_trio = (cont_trio / 10000) * 100;
    prob_trio = prob_trio.toFixed(2);
    prob_pareja = (cont_pareja_doble / 10000) * 100;
    prob_pareja = prob_pareja.toFixed(2);
    prob_escalera_simp = (cont_escalera_simp / 10000) * 100;
    prob_escalera_simp = prob_escalera_simp.toFixed(2);
    prob_escalera_comp = (cont_escalera_completa / 10000) * 100;
    prob_escalera_comp = prob_escalera_comp.toFixed(2);
    abrirVentana();
}
function esPoker(aux) {
    let res;
    if (aux.every(element => element === aux[0])) {
        res = true;
    } else {
        res = false;
    }
    return res;
}
function esParejaDoble(aux) {
    let res;
    if ((aux[0] === aux[1] && aux[2] === aux[3]) || (aux[0] === aux[2] && aux[1] === aux[3]) || (aux[0] === aux[3] && aux[1] === aux[2])) {
        res = true;
    } else {
        res = false;
    }
    return res;
}
function esTrio(aux) {
    let res;
    if ((aux[0] === aux[1] && aux[0] === aux[2]) || (aux[0] === aux[1] && aux[0] === aux[3]) || (aux[1] === aux[2] && aux[1] === aux[3])) {
        res = true;
    } else {
        res = false;
    }
    return res;
}
function esEscaleraSimp(aux) {
    let res;
    if (
        (parseInt(aux[0]) + 1 === parseInt(aux[1]) && parseInt(aux[1]) + 1 === parseInt(aux[2])) ||
        (parseInt(aux[1]) + 1 === parseInt(aux[2]) && parseInt(aux[2]) + 1 === parseInt(aux[3])) ||
        (parseInt(aux[0]) + 1 === parseInt(aux[1]) && parseInt(aux[1]) + 1 === parseInt(aux[3])) ||
        (parseInt(aux[0]) + 1 === parseInt(aux[2]) && parseInt(aux[2]) + 1 === parseInt(aux[3]))
    ) {
        res = true;
    } else {
        res = false;
    }
    return res;
}
function esEscaleraComp(aux) {
    let res;
    if ((parseInt(aux[0]) + 1) === parseInt(aux[1]) && parseInt(aux[0]) + 2 === parseInt(aux[2]) && (parseInt(aux[0]) + 3) === parseInt(aux[3])) {
        res = true;
    } else {
        res = false;
    } return res;
}
function capturarvalor() {
    inputValor = document.getElementById("put").value;
    if (inputValor.trim() === "") {
        alert("¡Por favor, ingresa un valor en el campo!");
    } else {
        jugar();
    }
}
function abrirVentana() {
    var ancho = 400;  // Ancho de la ventana
    var alto = 400;   // Alto de la ventana

    // Calculamos las posiciones para centrar la ventana
    var x = (window.innerWidth - ancho) / 2;  // Centrado horizontal
    var y = (window.innerHeight - alto) / 2;  // Centrado vertical

    // Abrir la ventana centrada
    ventana = window.open("", "Probabilidades", `width=${ancho},height=${alto},top=${y},left=${x}`);
    
    // Asegurarse de que el contenido está cargado antes de intentar manipularlo
    ventana.document.write('<style>body{ background-color: rgb(185, 185, 185); display: flex; justify-content: center; align-items: center; flex-direction: column;}</style>');
    ventana.document.write('<h2>Figura:</h2><p>' + figura + '</p><h2>Probabilidades:</h2><p>Poker: '+prob_poker+'%</p><p>Doble Pareja: '+prob_pareja+'%</p><p>Trío: '+prob_trio+'%</p><p>Escalera simple: '+prob_escalera_simp+'%</p><p>Escalera completa: '+prob_escalera_comp+'%</p>');
    setTimeout(cerrarVentana,10000);
}
function cerrarVentana() {
        ventana.close();  // Cierra la ventana emergente
}