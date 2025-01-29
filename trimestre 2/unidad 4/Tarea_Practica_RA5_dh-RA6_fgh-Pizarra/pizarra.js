document.addEventListener("DOMContentLoaded", function () {
    let colorSeleccionado = ""; // Al principio no hay color seleccionado
    let pintando = false; // Modo de pintura desactivado por defecto
    const tabla = document.querySelector(".tablerodibujo");
    const filas = 30;
    const columnas = 30;

    // Mapeo de colores a sus valores en formato RGB
    const colores = {
      "Amarillo": "rgb(255, 255, 0)",
      "Verde": "rgb(0, 128, 0)",
      "Negro": "rgb(0, 0, 0)",
      "Rojo": "rgb(255, 0, 0)",
      "Azul": "rgb(0, 0, 255)",
      "Blanco": "rgb(255, 255, 255)"
    };

    // Crear la tabla 30x30 
    for (let i = 0; i < filas; i++) {
      let fila = document.createElement("tr");
      for (let j = 0; j < columnas; j++) {
        let celda = document.createElement("td");

        // Agregar evento para colorear al hacer click
        celda.addEventListener("click", function () {
          if (colorSeleccionado) {
            if (this.style.backgroundColor !== colorSeleccionado) {
              this.style.backgroundColor = colorSeleccionado;
              pintando = true; // Activar el modo de pintar al hacer clic en una celda
            } else {
              pintando = false; // Desactivar el modo de pintar si ya está pintada
            }
          }
        });

        // Agregar evento para pintar mientras movemos el ratón
        celda.addEventListener("mouseover", function () {
          if (pintando) {
            this.style.backgroundColor = colorSeleccionado;
          }
        });

        fila.appendChild(celda);
      }
      tabla.appendChild(fila);
    }

    // Seleccionar color de la paleta
    document.querySelectorAll("#colores td").forEach(td => {
      td.addEventListener("click", function () {
        const color = this.getAttribute("data-color");

        // Si el color ya está seleccionado, desactivamos el pincel
        if (colorSeleccionado === colores[color]) {
          // Desactivamos el modo de pintar
          colorSeleccionado = "";
          pintando = false;
          // Desmarcamos el color seleccionado
          document.querySelectorAll("#colores td").forEach(c => c.classList.remove("seleccionado"));
          // Ponemos el texto de "Pincel desactivado"
          document.getElementById("pincel").textContent = "Pincel desactivado";
        } else {
          // Si es un nuevo color, lo seleccionamos
          colorSeleccionado = colores[color];
          pintando = false; // Por defecto no estamos pintando
          // Desmarcamos el color anterior y marcamos el nuevo
          document.querySelectorAll("#colores td").forEach(c => c.classList.remove("seleccionado"));
          this.classList.add("seleccionado");
          document.getElementById("pincel").textContent = `Pincel: ${color}`;
        }
      });
    });

    document.getElementById("limpiar").addEventListener("click", function () {//función para limpiar la pizarra
        // Recorremos todas las celdas y las ponemos de color blanco
        const celdas = document.querySelectorAll(".tablerodibujo td");
        celdas.forEach(celda => {
          celda.style.backgroundColor = colores["Blanco"]; // Ponemos el color blanco
        });
      });
  });