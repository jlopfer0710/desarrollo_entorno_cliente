//Creamos 4 arrays para almacenar todas las posibles combinaciones
var rojo = ['Queridos compañeros  ', 'Por otra parte, y dados los condicionamientos actuales  ', 'Asimismo  ', 'Sin embargo no hemos de olvidar que  ', 'De igual manera,  ', 'La práctica de la vida cotidiana prueba que  ', 'No es indispensable argumentar el peso y la significación de estos problemas ya que,  ', 'Las experiencias ricas y diversas muestran que  ', 'El afán de organización, pero sobre todo  ', 'Los superiores principios ideológicos, condicionan que  ', 'Incluso, bien pudiéramos atrevernos a sugerir que  ', 'Es obvio señalar que  ', 'Pero pecaríamos de insinceros si soslayásemos que,  ', 'Y además, quedaríamos inmersos en la más abyecta de las estulticias si no fueramos consacientes de que,  '];
var azul = ["la realización de las premisas del programa ", "la complejidad de los estudios de los dirigentes ", "el aumento constante, en cantidad y en extensión, de nuestra actividad ", "la estructura actual de la organización ", "el nuevo modelo de actividad de la organización ", "el desarrollo continuo de distintas formas de actividad", "nuestra actividad de información y propaganda ", "el reforzamiento y desarrollo de las estructuras ", "la consulta con numerosos militantes ", "el inicio de la acción general de formación de las actitudes ", "un relanzamiento específico de todos los sectores implicados ", "la superación de experiencias periclitadas ", "una aplicación indiscriminada de los factores confluyentes ", "la condición sine qua non rectora del proceso "];
var verde = ["nos obliga a un exhaustivo análisis ", "cumple un rol esencial en la formación ", "exige la precisión y la determinación ", "ayuda a la preparación y a la realización ", "garantiza la participación de un grupo importante en la formación ", "cumple deberes importantes en la determinación ", "facilita la creación ", "obstaculiza la apreciación de la importancia ", "ofrece un ensayo interesante de verificación ", "implica el proceso de reestructuración y modernización ", "habrá de significar un auténtico y eficaz punto de partida ", "permite en todo caso explicitar las razones fundamentales ", "asegura, en todo caso, un proceso muy sensible de iversión ", "radica en una elaboración cuidadosa y sistemática de las estrategias adecuadas "];
var amarillo = ["de las condiciones financieras y administrativas.", "de las directivas de desarrollo para el futuro.", "del sistema de participación general.", "de las actitudes de los miembros hacia sus deberes ineludibles.", "de las nuevas proposiciones.", "de las direcciones directivas en el sentido del progreso.", "del sistema de formación de cuadros que corresponda a las necesidades.", "de las condiciones de las actividades apropiadas.", "del modelo de desarrollo.", "de las formas de acción.", "de las básicas premisas adoptadas.", "de toda una casuística de amplio espectro.", "de los elementos generadores.", "para configurar una interfaz amigable y coadyuvante a la reingeniería del sistema."];
var aux_indices = [];
function jugar() {
    var aux = [];//array auxiliar para almacenar los indices generados
    var div = document.getElementById("div");
    var num1 = Math.floor(Math.random() * rojo.length);/*Generamos 4 números aleatorios entre 0 y la longitud de los array*/
    var num2 = Math.floor(Math.random() * azul.length);
    var num3 = Math.floor(Math.random() * verde.length);
    var num4 = Math.floor(Math.random() * amarillo.length);
    var rojo_palabra = rojo[num1];
    var amarillo_palabra = amarillo[num4];
    var azul_palabra = azul[num2];
    var verde_palabra = verde[num3];
    //Almacenamos el valor de la celda elegida aleatoriamente de cada array y eliminamos dicha celda con el splice para que no se repita
    aux.push(num1, num2, num3, num4);
    aux = aux.join("");
    if (aux_indices.includes(aux)) {
        alert("Este fragmento de discurso ya está generado, por favor vuelva a generar");
    } else {
        let cont=parseInt(getCookie("contador_indices")|| "0");
        // Incrementar el contador y actualizar la cookie
        cont++;
        setCookie("contador_indices", cont, 365); // La cookie dura 365 días

        // Mostrar por consola el nuevo contador y el contenido del array
        console.log(`Contador de cookies actualizado: ${cont}`);
        aux_indices.push(aux);
        div.style.backgroundColor = "rgb(192, 192, 192)";
        div.style.border = "solid 2px black";
        div.style.textAlign = "left";
        div.style.fontSize = "15px";
        div.innerHTML += "<br><a style='color: red; ' >" + rojo_palabra + " </a><a style='color: blue;'>" + azul_palabra + " </a><a style='color: green;'>" + verde_palabra + " </a><a style='color: yellow;'>" + amarillo_palabra + "</a>";
    }
}
// Función para establecer una cookie
function setCookie(nombre, valor, dias) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000)); // Tiempo de expiración
    document.cookie = `${nombre}=${valor}; expires=${fecha.toUTCString()}; path=/`;
    console.log(`Cookie ${nombre} establecida con valor: ${valor}`);
}
// Función para obtener una cookie
function getCookie(nombre) {
    const name = `${nombre}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(name) === 0) {
            console.log(`Cookie ${nombre} encontrada: ${c.substring(name.length, c.length)}`);
            return c.substring(name.length, c.length);
        }
    }
    console.log(`Cookie ${nombre} no encontrada`);
    return null;
}