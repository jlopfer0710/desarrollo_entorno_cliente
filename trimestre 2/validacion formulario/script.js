var nombre = document.getElementById("nombre");
var apellidos = document.getElementById("apellidos");
var errores = document.getElementById("errores");
var edad = document.getElementById("edad");
var nif = document.getElementById("nif");
var email = document.getElementById("email");

/* Apartado 3. Cada vez que los campos NOMBRE y APELLIDOS pierdan el foco, el contenido que se haya escrito en esos campos se convertirá a mayúsculas. */
function pasarMayus(event) {
    event.target.value = event.target.value.toUpperCase();
}

nombre.addEventListener('blur', pasarMayus);
apellidos.addEventListener('blur', pasarMayus);

/* Apartado 4. Función para validar los campos de texto NOMBRE y APELLIDOS */
function validarNombreApellidos() {
    let valido = true;
    let valor_nombre = nombre.value.trim(); 
    let valor_apellidos = apellidos.value.trim();
    
    // Limpiar los errores antes de cada validación
    errores.innerHTML = "";

    if (valor_nombre === "") {
        errores.innerHTML += "El campo NOMBRE no puede estar vacío.<br>";
        nombre.focus();  // Pone el foco en el primer error
        valido = false;
    }

    if (valor_apellidos === "") {
        errores.innerHTML += "El campo APELLIDOS no puede estar vacío.<br>";
        if (valor_nombre !== "") {
            apellidos.focus();  // Si el nombre está completo, el foco va a apellidos
        }
        valido = false;
    }

    return valido;
}

/* Función para validar todas las condiciones del formulario */
function validar(event) {
    event.preventDefault();  // Evitar que el formulario se envíe automáticamente
    
    // Realizamos la validación de cada campo
    let nombreValidado = validarNombreApellidos();
    let edadValidada = validarEdad();
    let nifValidado = validarNIF();
    let emailValidado = validarEmail();

    // Si alguna validación falla, el foco se pondrá en el primer campo con error
    if (!nombreValidado || !edadValidada || !nifValidado || !emailValidado) {
        return;  // Si alguna validación falla, no se envía el formulario
    } else {
        document.getElementById("formulario").submit();  // Enviar el formulario si todas las validaciones pasan
    }
}

/* Apartado 5. Validar la EDAD que contenga solamente valores numéricos y esté en el rango de 0 a 105. */
function validarEdad() {
    let valido = true;
    let edadValue = edad.value;
    
    if (edadValue == "") {
        errores.innerHTML += "El campo EDAD no puede estar vacío.<br>";
        edad.focus();
        valido = false;
    } else if (isNaN(edadValue)) {
        errores.innerHTML += "La edad debe ser un NÚMERO.<br>";
        edad.focus();
        valido = false;
    } else if (edadValue < 0 || edadValue > 105) {
        errores.innerHTML += "La edad se debe encontrar en el rango 0-105.<br>";
        edad.focus();
        valido = false;
    }
    return valido;
}

/* Apartado 6. Validar el NIF utilizando expresión regular */
function validarNIF() {
    let valido = true;
    let nifValue = nif.value;
    let regex = /^[0-9]{8}-[A-Za-z]{1}$/;
    let res = regex.test(nifValue);

    if (!res) {
        errores.innerHTML += "NIF no válido<br>";
        nif.focus();  // Pone el foco en el campo NIF
        valido = false;
    }

    return valido;
}

/* Apartado 7. Validar el E-MAIL. */
function validarEmail() {
    let valido = true;
    let emailValue = email.value;
    let regex = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]+$/;
    let res = regex.test(emailValue);

    if (!res) {
        errores.innerHTML += "EMAIL no válido<br>";
        email.focus();  // Pone el foco en el campo EMAIL
        valido = false;
    }

    return valido;
}

// Asociamos la validación al evento submit del formulario
var formulario = document.getElementById("formulario");
formulario.addEventListener('submit', validar);
