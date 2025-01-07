
var cont=0;
var patron = /^[0-9]{4}$/;//patrón para controlar que el valor introducido es válido
var cont_poker = 0, cont_pareja_doble = 0, cont_trio = 0, cont_escalera_simp = 0, cont_escalera_completa = 0;//todos los contadores necesarios
var inputValor, figura = "";
var prob_poker = 0, prob_trio = 0, prob_pareja = 0, prob_escalera_simp = 0, prob_escalera_comp = 0,ventana;
 // Función para establecer una cookie
 function setCookie(nombre, valor, dias) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000)); // Tiempo de expiración
    document.cookie = `${nombre}=${valor}; expires=${fecha.toUTCString()}; path=/`;
}
// Función para obtener una cookie
function getCookie(nombre) {
    const name = `${nombre}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}
function jugar() {
    if (!inputValor.match(patron)) {
        alert("Recuerda que debes introducir una mano de 4 cartas compuesta por números del 0 al 9");
    } else {
        cont=getCookie("contador");
        cont = cont ? parseInt(cont) + 1 : 1; // Incrementar el conteo
                setCookie("contador", cont, 7); // Guardar cookie con duración de 7 días
                console.log(`Veces introducido correctamente: ${cont}`);//se muestra la cookie por consola
        var num_aux = inputValor.split("");//pasamos el número introducido a array
        num_aux.sort((a, b) => a - b);//ordenamos el array
        if (num_aux.every(element => element === num_aux[0])) {//condición para que sea poker
            figura = "Es un poker";
        } else if ((num_aux[0] === num_aux[1] && num_aux[2] === num_aux[3]) || (num_aux[0] === num_aux[2] && num_aux[1] === num_aux[3]) || (num_aux[0] === num_aux[3] && num_aux[1] === num_aux[2])) {//condición para que sea una doble pareja
            figura = "Es una doble pareja";
        } else if ((num_aux[0] === num_aux[1] && num_aux[0] === num_aux[2]) || (num_aux[0] === num_aux[1] && num_aux[0] === num_aux[3]) || (num_aux[1] === num_aux[2] && num_aux[1] === num_aux[3])) {//condición para que sea un trío
            figura = "Es un trío";
        } else if ((parseInt(num_aux[0]) + 1) === parseInt(num_aux[1]) && parseInt(num_aux[0]) + 2 === parseInt(num_aux[2]) && (parseInt(num_aux[0]) + 3) === parseInt(num_aux[3])) {//condición para que sea una escalera completa
            figura = "Es una escalera completa";
        } else if (
            (parseInt(num_aux[0]) + 1 === parseInt(num_aux[1]) && parseInt(num_aux[1]) + 1 === parseInt(num_aux[2])) ||
            (parseInt(num_aux[1]) + 1 === parseInt(num_aux[2]) && parseInt(num_aux[2]) + 1 === parseInt(num_aux[3])) ||
            (parseInt(num_aux[0]) + 1 === parseInt(num_aux[1]) && parseInt(num_aux[1]) + 1 === parseInt(num_aux[3])) ||
            (parseInt(num_aux[0]) + 1 === parseInt(num_aux[2]) && parseInt(num_aux[2]) + 1 === parseInt(num_aux[3]))    //condiciones para que sea una escalera simple
        ) {
            figura = "Es una escalera simple";
        }
        probabilidades();
    }
}
function probabilidades() {
    for (let i = 0; i < 10000; i++) {//recorremos las 10000 posibilidades de baraja
        var aux = [];
        if (i < 10) {//añadimos 0 a la izquierda para que sewa válida la baraja y la ordenamos
            let i_aux = i.toString();
            aux = i_aux.split("");
            aux.unshift("0");
            aux.unshift("0");
            aux.unshift("0");
            aux.sort((a, b) => a - b)
        } else if (i < 100) {//añadimos 0 a la izquierda para que sewa válida la baraja y la ordenamos
            let i_aux = i.toString();
            aux = i_aux.split("");
            aux.unshift("0");
            aux.unshift("0");
            aux.sort((a, b) => a - b)
        } else if (i <= 999) {//añadimos 0 a la izquierda para que sewa válida la baraja y la ordenamos
            let i_aux = i.toString();
            aux = i_aux.split("");
            aux.unshift("0");
            aux.sort((a, b) => a - b)
        } else {//aquí como cumple con la longitud solo se ordena
            let i_aux = i.toString();
            aux = i_aux.split("");
            aux.sort((a, b) => a - b)
        }
        if (esPoker(aux)) {//si es alguna de las figuras se aumenta en 1 un contador para después poder calcular las probabilidades
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
function esPoker(aux) {//función para comprobar si es poker
    let res;
    if (aux.every(element => element === aux[0])) {
        res = true;
    } else {
        res = false;
    }
    return res;
}
function esParejaDoble(aux) {//función para comprobar si es pareja doble
    let res;
    if ((aux[0] === aux[1] && aux[2] === aux[3]) || (aux[0] === aux[2] && aux[1] === aux[3]) || (aux[0] === aux[3] && aux[1] === aux[2])) {
        res = true;
    } else {
        res = false;
    }
    return res;
}
function esTrio(aux) {//función para comprobar si es trío
    let res;
    if ((aux[0] === aux[1] && aux[0] === aux[2]) || (aux[0] === aux[1] && aux[0] === aux[3]) || (aux[1] === aux[2] && aux[1] === aux[3])) {
        res = true;
    } else {
        res = false;
    }
    return res;
}
function esEscaleraSimp(aux) {//función para comprobar si es escalera simple
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
function esEscaleraComp(aux) {//función para comprobar si es completa
    let res;
    if ((parseInt(aux[0]) + 1) === parseInt(aux[1]) && parseInt(aux[0]) + 2 === parseInt(aux[2]) && (parseInt(aux[0]) + 3) === parseInt(aux[3])) {
        res = true;
    } else {
        res = false;
    } return res;
}
function capturarvalor() {//función para conseguir el valor del elemento introducido mediante el input
    inputValor = document.getElementById("put").value;
    if (inputValor.trim() === "") {
        alert("¡Por favor, ingresa un valor en el campo!");
    } else {
        jugar();
    }
}
function abrirVentana() {//función para abrir la ventana
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
