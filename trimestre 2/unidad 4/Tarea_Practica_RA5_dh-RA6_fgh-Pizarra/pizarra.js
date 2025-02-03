document.addEventListener("DOMContentLoaded", function () {//ejecutamos el código cuando el DOM esté completamente cargado
  let colorSeleccionado = "";
  let pintando = false;//booleano para saber si estamos pintando o no
  const tabla = document.querySelector(".tablerodibujo");
  const filas = 30;
  const columnas = 30;

  const colores = {//objeto que almacena los colores para poder seleccionarlos
    "Amarillo": "rgb(255, 255, 0)",
    "Verde": "rgb(0, 128, 0)",
    "Negro": "rgb(0, 0, 0)",
    "Rojo": "rgb(255, 0, 0)",
    "Azul": "rgb(0, 0, 255)",
    "Blanco": "rgb(255, 255, 255)"
  };

  for (let i = 0; i < filas; i++) {//creamos una tabla de 30x30
    let fila = document.createElement("tr");
    for (let j = 0; j < columnas; j++) {
      let celda = document.createElement("td");
      celda.addEventListener("click", function () {//cada vez que le demos click empezamos a pintar si le volvemos a dar se para de colorear
        if (colorSeleccionado) {
          if (this.style.backgroundColor !== colorSeleccionado) {
            this.style.backgroundColor = colorSeleccionado;
            pintando = true;
          } else {
            pintando = false;
          }
        }
      });

      celda.addEventListener("mouseover", function () {//si se está pintando y pasamos el ratón por otras celdas esas celdas también se colorean
        if (pintando) {
          this.style.backgroundColor = colorSeleccionado;//el color de fondo de las celdas se cambia al del color seleccionado
        }
      });

      fila.appendChild(celda);//añadimos las celdas a las filas
    }
    tabla.appendChild(fila);//añdimos las filas a la tabla
  }

  document.querySelectorAll("#colores td").forEach(td => {
    td.addEventListener("click", function () {//si acemos click a una celda de la paleta de colores se selecciona el color 
      const color = this.getAttribute("data-color");
      if (colorSeleccionado === colores[color]) {//con este condicional hacemos que si volvemos a pinchar en un color ya seleccionado se desctive el pincel
        colorSeleccionado = "";
        pintando = false;
        document.querySelectorAll("#colores td").forEach(c => c.classList.remove("seleccionado"));
        document.getElementById("pincel").textContent = "Pincel desactivado";//se cambia el texto del pincel a pincel desactivado 
      } else {//sino, se selecciona el color en el que has pinchado
        colorSeleccionado = colores[color];
        pintando = false;
        document.querySelectorAll("#colores td").forEach(c => c.classList.remove("seleccionado"));
        this.classList.add("seleccionado");
        document.getElementById("pincel").textContent = `Pincel: ${color}`; //el texto se cambia a Pincel: y el color seleccionado
      }
    });
  });

  document.getElementById("limpiar").addEventListener("click", function () {//cuando hacemos click en el botón de limpiar hacemos que todos los fondos de las celdas se cambien a blanco para poder borrar todo de una
      const celdas = document.querySelectorAll(".tablerodibujo td");
      celdas.forEach(celda => {
        celda.style.backgroundColor = colores["Blanco"];
      });
  });

  async function pdf() {//función para epxportar la tabla a pdf
    const { jsPDF } = window.jspdf;
    const element = document.querySelector(".tablerodibujo");
    // Estilo para asegurar que el canvas captura correctamente la tabla
    element.style.border = "1px solid black";

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save("dibujo.pdf");
    alert("Imagen exportada correctamente");
  }

  document.getElementById("enviar").addEventListener("click", pdf);//cuando hacemos click en el botón enviar se activa la funciín pdf para exportar el dibujo
});
