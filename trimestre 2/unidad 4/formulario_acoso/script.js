
function enviar(event) {
    event.preventDefault();
    var mensaje=document.getElementById("mensaje");
    var cont=0;
    var cont_respuestas=0;
    var valor=document.getElementsByTagName("input");
    for(var i=0;i<valor.length;i++){
        if(valor[i].checked){
            cont++;
            if(valor[i].value==1){
                cont_respuestas+=parseInt(valor[i].value);
            }
        }
    }
    if(cont_respuestas==0){
        mensaje.innerHTML="<strong>No sufres acoso.</strong>";
    }else if(cont_respuestas >=1 &&cont_respuestas<=5){
        mensaje.innerHTML="<strong>Hay indicios de acoso actue con discreción.</strong>";
    }else if(cont_respuestas>=6 &&cont_respuestas<=10){
        mensaje.innerHTML="<strong>Sufres acoso, por favor, contacte con sus padres/tutores legales y con su profesorado. </strong>";
    }
    if(cont<10){
        alert("No puedes dejarte preguntas sin responder");
        mensaje.innerHTML="";
        return;
    }else{
        alert("Formulario enviado correctamente");
        document.getElementById("form").submit();
        
    }
}
var form=document.getElementById("form");
form.addEventListener('submit',enviar);

