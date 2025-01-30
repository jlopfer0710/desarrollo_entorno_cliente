document.addEventListener("DOMContentLoaded", function () {
  let colorSeleccionado = "";
  let pintando = false;
  const tabla = document.querySelector(".tablerodibujo");
  const filas = 30;
  const columnas = 30;

  const colores = {
    "Amarillo": "rgb(255, 255, 0)",
    "Verde": "rgb(0, 128, 0)",
    "Negro": "rgb(0, 0, 0)",
    "Rojo": "rgb(255, 0, 0)",
    "Azul": "rgb(0, 0, 255)",
    "Blanco": "rgb(255, 255, 255)"
  };

  for (let i = 0; i < filas; i++) {
    let fila = document.createElement("tr");
    for (let j = 0; j < columnas; j++) {
      let celda = document.createElement("td");
      celda.addEventListener("click", function () {
        if (colorSeleccionado) {
          if (this.style.backgroundColor !== colorSeleccionado) {
            this.style.backgroundColor = colorSeleccionado;
            pintando = true;
          } else {
            pintando = false;
          }
        }
      });

      celda.addEventListener("mouseover", function () {
        if (pintando) {
          this.style.backgroundColor = colorSeleccionado;
        }
      });

      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }

  document.querySelectorAll("#colores td").forEach(td => {
    td.addEventListener("click", function () {
      const color = this.getAttribute("data-color");
      if (colorSeleccionado === colores[color]) {
        colorSeleccionado = "";
        pintando = false;
        document.querySelectorAll("#colores td").forEach(c => c.classList.remove("seleccionado"));
        document.getElementById("pincel").textContent = "Pincel desactivado";
      } else {
        colorSeleccionado = colores[color];
        pintando = false;
        document.querySelectorAll("#colores td").forEach(c => c.classList.remove("seleccionado"));
        this.classList.add("seleccionado");
        document.getElementById("pincel").textContent = `Pincel: ${color}`;
      }
    });
  });

  document.getElementById("limpiar").addEventListener("click", function () {
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

  document.getElementById("enviar").addEventListener("click", pdf);
});
