var nombre = document.getElementById("nombre");
var apellidos = document.getElementById("apellidos");
var errores = document.getElementById("errores");
var edad = document.getElementById("edad");
var nif = document.getElementById("nif");
var email = document.getElementById("email");
var provincia=document.getElementById("provincia");
var fecha=document.getElementById("fecha");
var telefono=document.getElementById("telefono");
var hora=document.getElementById("hora");
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
    let horaValidada=validarHora();
    let telefonoValidado=validaTlfno();
    let fechaValidada=validarFecha();
    let provinciaValidada=validarProvincia();
    let emailValidado = validarEmail();
    let nifValidado = validarNIF();
    let edadValidada = validarEdad();
    let nombreValidado = validarNombreApellidos();
    if (!horaValidada || !telefonoValidado || !fechaValidada || !provinciaValidada ||!emailValidado || !nifValidado ||!edadValidada ||!nombreValidado) {
        return;  // Si alguna validación falla, no se envía el formulario
    } else {

        /*Apartado 12.Pedir confirmación de envío del formulario. Si se confirma el envío realizará el envío de los datos; en otro caso cancelará el envío */
        let confirmacion=confirm("¿Estás seguro de que desea enviar el formulario?");
        if(confirmacion){
            alert("El fomulario ha sido enviado correctamente");
            document.getElementById("formulario").submit();
        }else{
            alert("El envío ha sido cancelado");
        }
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
    let regex = /^[0-9]{8}-[A-Za-z]{1}$/;/*En esta expresión regular decimos que se debe introducir un patrón que sea igual a 8 dígitos del 0-9 seguido de - y de una letra de la  a-z independientemente de que sea mayúscula o minúscula  */
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
    let regex = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]+$/;/*En esta expresión regular decimos que se debe introducir un patrón que sea igual a 1 o más letras de la a-z (insensitivo) o números del 0-9 seguidos de @ después una o más letras de a-z segido de . y seguido de una o más letras de a-z*/
    let res = regex.test(emailValue);

    if (!res) {
        errores.innerHTML += "EMAIL no válido<br>";
        email.focus();  // Pone el foco en el campo EMAIL
        valido = false;
    }

    return valido;
}

/*Apartado 8.Validar que se haya seleccionado alguna de las 8 PROVINCIAS de Andalucia. Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo PROVINCIA.*/
//ya que faltan el resto de provincias las añadimos con la siguiente función
window.addEventListener("load",provincias);
function provincias(){
    escribirPlaceHolder();
    var provincia=document.getElementById("provincia");
    provincia.innerHTML+=`
        <option value="G">Granada</option>
        <option value="M">Málaga</option>
        <option value="H">Huelva</option>
        <option value="C">Cádiz</option>
        <option value="Z">Córdoba</option>
        <option value="S">Sevilla</option>
        <option value="J">Jaén</option>
    `;
}
//Función para validar las provincias
function validarProvincia(){
    let valido=true;
    var provinciaValue=document.getElementById("provincia").value;
    if(provinciaValue!="G" && provinciaValue!="H" && provinciaValue!="M" && provinciaValue!="C" && provinciaValue!="Z" && provinciaValue!="S" && provinciaValue!="J" && provinciaValue!="A"){
        errores.innerHTML+="PROVINCIA no válida<br>";
        provincia.focus();
        valido=false;
    }
    return valido
}
//Función para escribir placeholders en el formulario y que así tenga mayor claridad
function escribirPlaceHolder(){
    nombre.placeholder="Introduce su nombre";
    apellidos.placeholder="Introduce su apellido";
    edad.placeholder="Introduce su edad 0-105";
    nif.placeholder="Introduce su NIF";
    email.placeholder="Introduce su email";
    fecha.placeholder="Fecha de nacimiento";
    telefono.placeholder="Introduce su teléfono";
    hora.placeholder="Introduce la hora";
}

/*Apartado 9.Validar el campo FECHA utilizando una expresión regular. Debe cumplir alguno de los siguientes formatos: dd/mm/aaaa o dd-mm-aaaa. No se pide validar que sea una fecha de calendario correcta. Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo FECHA. Explicar las partes de la expresión regular mediante comentarios.  */
function validarFecha(){
    let valido=true;
    let fechaValue=fecha.value;
    let regex1=/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,4}$/;/*En esta expresión regular decimos que se debe introducir un patrón compuesto de 1 o 2 números del 0-9 seguidos de / después otros 1 o 2 números de 0-9 seguidos de / y por ultimo 4 números del 0-9*/
    let regex2=/^[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,4}$/;/*Esta expresión regular es igual a la anterior sustituyendo / por -*/
    let res1=regex1.test(fechaValue);
    let res2=regex2.test(fechaValue);
    if(!res1 &&!res2){
        errores.innerHTML+="FECHA no válida<br>";
        fecha.focus();
    }
    return valido
}

/*Apartado 10.Validar el campo TELEFONO utilizando una expresión regular. Debe permitir 9 dígitos obligatorios. Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo TELEFONO. Explicar las partes de la expresión regular mediante comentarios. */
function validaTlfno(){
    let valido=true;
    let telefonoValue=telefono.value;
    let regex=/^\d{9}$/;/*En esta expresión regular se dice que se debe introducir 9 dígitos*/
    let res=regex.test(telefonoValue);
    if(!res){
        valido=false;
        errores.innerHTML+="TELÉFONO no válido<br>";
        telefono.focus();
    }
    return valido
}

/*Apartado  11.Validar el campo HORA utilizando una expresión regular. Debe seguir el patrón de hh:mm. No es necesario validar que sea una hora correcta. Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo HORA. Explicar las partes de la expresión regular mediante comentarios. */
function validarHora(){
    errores.innerHTML="";
    let valido=true;
    let horaValue=hora.value;
    let regex=/^[0-9]{2}:[0-9]{2}$/;/*En esta expresión regular se dice que se debe introducir un patrón compuesto por 2 número del 0-9 seguido de : y después otros 2 números del 0-9*/
    let res=regex.test(horaValue);
    if(!res){
        valido=false;
        errores.innerHTML+="HORA no válida<br>";
        hora.focus();
    }
    return valido;
}
// Asociamos la validación al evento submit del formulario
var formulario = document.getElementById("formulario");
formulario.addEventListener('submit', validar);
