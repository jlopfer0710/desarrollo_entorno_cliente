function enviar(event) {
    event.preventDefault();
    var cont=0;
    var valor=document.getElementsByTagName("input");
    for(var i=0;i<valor.length;i++){
        if(valor[i].checked){
            cont+=parseInt(valor[i].value);
        }
    }
    if(cont==10){
        alert("Sufres acoso");
    }
    alert("Hola el botón fue presionado");
}
