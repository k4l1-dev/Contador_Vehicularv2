const datos = [
  { etiqueta: "AUTO", imagen: "img/auto.png" },
  { etiqueta: "STATION_WAGON", imagen: "img/station_wagon.png" },
  { etiqueta: "PICK_UP", imagen: "img/pick_up.png" },
  { etiqueta: "PANEL", imagen: "img/panel.png" },
  { etiqueta: "RURAL_COMBI", imagen: "img/rural_combi.png" },
  { etiqueta: "MICRO", imagen: "img/micro.png" },
  { etiqueta: "BUS_2E", imagen: "img/bus_2e.png" },
  { etiqueta: "BUS_3E", imagen: "img/bus_3e.png" },
  { etiqueta: "CAMION_2E", imagen: "img/camion_2e.png" },
  { etiqueta: "CAMION_3E", imagen: "img/camion_3e.png" },
  { etiqueta: "CAMION_4E", imagen: "img/camion_4e.png" },
  { etiqueta: "ST:2S1/2S2", imagen: "img/2s12s2.png" },
  { etiqueta: "ST:2S3", imagen: "img/2s3.png" },
  { etiqueta: "ST:3S1/3S2", imagen: "img/3s13s2.png" },
  { etiqueta: "ST:3S3", imagen: "img/3s3.png" },
  { etiqueta: "T:2T2", imagen: "img/2t2.png" },
  { etiqueta: "T:2T3", imagen: "img/2t3.png" },
  { etiqueta: "T:3T2", imagen: "img/3t2.png" },
  { etiqueta: "T:3T3", imagen: "img/3t3.png" }
];



const contadores = new Array(datos.length).fill(0);


const historial = [];


const mosaicos = document.getElementById("mosaicos");
const tablaContadores = document.getElementById("tabla-contadores");

datos.forEach((dato, index) => {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.innerHTML = `<img src="${dato.imagen}" alt="${dato.etiqueta}">`;
  tile.addEventListener("click", () => {
    incrementarContador(index);
    registrarClic(index);
  });
  mosaicos.appendChild(tile);

  
  const fila = document.createElement("tr");
  fila.id = `fila-${index}`;
  fila.innerHTML = `
    <td><img src="${dato.imagen}" alt="${dato.etiqueta}" style="width: 40px; height: 40px; border-radius: 5px;"></td>
    <td>${dato.etiqueta}</td>
    <td id="contador-${index}">0</td>
  `;
  tablaContadores.appendChild(fila);
});


function incrementarContador(index) {
  contadores[index]++;
  const contadorElemento = document.getElementById(`contador-${index}`);
  contadorElemento.textContent = contadores[index];
}

// Registrar el clic con fecha, hora y día
function registrarClic(index) {
  const fecha = new Date();
  const registro = {
    etiqueta: datos[index].etiqueta,
    fecha: fecha.toLocaleDateString(),
    hora: fecha.toLocaleTimeString(),
    dia: fecha.toLocaleString("es-ES", { weekday: "long" }),
  };

  historial.push(registro);
  console.log("Clic registrado:", registro);
}


document.getElementById("resetear-btn").addEventListener("click", () => {
  
  for (let i = 0; i < contadores.length; i++) {
    contadores[i] = 0;
    document.getElementById(`contador-${i}`).textContent = "0";
  }
  console.log("Todos los contadores se han reseteado.");
});


document.getElementById("exportar-btn").addEventListener("click", () => {
  if (historial.length === 0) {
    alert("No hay datos para exportar.");
    return;
  }

  
  let csvContent = "Etiqueta,Fecha,Hora,Día\n";
  historial.forEach((registro) => {
    csvContent += `${registro.etiqueta},${registro.fecha},${registro.hora},${registro.dia}\n`;
  });

  
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "historial_clics.csv");
  link.style.display = "none";
  document.body.appendChild(link);

  
  link.click();

  
  document.body.removeChild(link);

  console.log("Historial exportado.");
});
