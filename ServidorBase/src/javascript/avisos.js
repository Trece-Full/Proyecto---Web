const estadoFiltros = {
  categoria: "todos",
  carrera: "todas",
};

function aplicarFiltros() {
  const avisos = document.querySelectorAll(".aviso");
  let visibles = 0;

  avisos.forEach((aviso) => {
    const categoria = aviso.dataset.categoria;
    const carrera = aviso.dataset.carrera || "todas";

    const coincideCategoria =
      estadoFiltros.categoria === "todos" || categoria === estadoFiltros.categoria;

    const coincideCarrera =
      estadoFiltros.carrera === "todas" || carrera === estadoFiltros.carrera;

    const visible = coincideCategoria && coincideCarrera;
    aviso.style.display = visible ? "flex" : "none";
    if (visible) visibles++;
  });

  document.getElementById("mensajeVacio").hidden = visibles !== 0;
  actualizarFiltrosActivos();
}

const ETIQUETAS_CATEGORIA = {
  academicos: "Académicos",
  administrativos: "Administrativos",
  servicios: "Servicios",
  becas: "Becas",
  seguridad: "Seguridad",
};

function actualizarFiltrosActivos() {
  const contenedor = document.getElementById("filtrosActivos");
  const chipCategoria = document.getElementById("chipCategoria");
  const chipCarrera = document.getElementById("chipCarrera");

  const hayCategoria = estadoFiltros.categoria !== "todos";
  const hayCarrera = estadoFiltros.carrera !== "todas";

  chipCategoria.hidden = !hayCategoria;
  if (hayCategoria) {
    chipCategoria.textContent = ETIQUETAS_CATEGORIA[estadoFiltros.categoria];
  }

  chipCarrera.hidden = !hayCarrera;
  if (hayCarrera) {
    const item = document.querySelector(
      `.lista-carreras li[data-carrera="${estadoFiltros.carrera}"]`
    );
    chipCarrera.textContent = item ? item.querySelector("span").textContent : "";
  }

  contenedor.hidden = !(hayCategoria || hayCarrera);
}

function limpiarFiltros() {
  estadoFiltros.categoria = "todos";
  estadoFiltros.carrera = "todas";

  document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  document.querySelector('.tab[data-filtro="todos"]').classList.add("active");

  document.querySelectorAll(".lista-carreras li").forEach((i) => i.classList.remove("activo"));
  document.querySelector('.lista-carreras li[data-carrera="todas"]').classList.add("activo");

  aplicarFiltros();
}

function initLimpiarFiltros() {
  const boton = document.getElementById("btnLimpiarFiltros");
  if (!boton) return;

  boton.addEventListener("click", limpiarFiltros);
}

function initVerDetalles() {
  const link = document.getElementById("linkVerDetalles");
  if (!link) return;

  link.addEventListener("click", (e) => {
    e.preventDefault();
    const destino = document.getElementById("aviso-suspension-clases");
    if (!destino) return;

    limpiarFiltros();

    destino.scrollIntoView({ behavior: "smooth", block: "center" });
    destino.classList.remove("aviso--resaltado");
    void destino.offsetWidth;
    destino.classList.add("aviso--resaltado");
  });
}

const FECHA_ACTUAL_DEMO = new Date(2025, 4, 25);

function initVigencia() {
  document.querySelectorAll(".aviso[data-vence]").forEach((aviso) => {
    const fechaVence = new Date(aviso.dataset.vence);
    const msPorDia = 1000 * 60 * 60 * 24;
    const diasRestantes = Math.ceil((fechaVence - FECHA_ACTUAL_DEMO) / msPorDia);

    const badge = document.createElement("span");
    badge.className = "aviso__vigencia";

    if (diasRestantes < 0) {
      badge.classList.add("aviso__vigencia--vencido");
      badge.textContent = "Vencido";
    } else if (diasRestantes <= 7) {
      badge.classList.add("aviso__vigencia--pronto");
      badge.textContent = diasRestantes === 0 ? "Vence hoy" : `Vence en ${diasRestantes} días`;
    } else {
      badge.classList.add("aviso__vigencia--ok");
      badge.textContent = `Vence en ${diasRestantes} días`;
    }

    const meta = aviso.querySelector(".aviso__meta");
    meta.insertBefore(badge, meta.firstChild);
  });
}

function actualizarContadoresCarrera() {
  const items = document.querySelectorAll(".lista-carreras li");
  const avisos = document.querySelectorAll(".aviso");

  items.forEach((item) => {
    const carrera = item.dataset.carrera;
    let total = 0;

    avisos.forEach((aviso) => {
      const carreraAviso = aviso.dataset.carrera || "todas";
      if (carrera === "todas" || carreraAviso === carrera) {
        total++;
      }
    });

    item.querySelector(".contador").textContent = total;
  });
}

function initFiltrosCategoria() {
  const tabs = document.querySelectorAll(".tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      estadoFiltros.categoria = tab.dataset.filtro;
      aplicarFiltros();
    });
  });
}

function initOrdenarPor() {
  const select = document.getElementById("orden");
  const lista = document.querySelector(".lista-avisos");
  if (!select || !lista) return;

  select.addEventListener("change", () => {
    const avisos = Array.from(lista.querySelectorAll(".aviso"));
    avisos.reverse().forEach((aviso) => lista.appendChild(aviso));
  });
}

function initCargarMas() {
  const boton = document.querySelector(".btn-cargar-mas");
  const lista = document.querySelector(".lista-avisos");
  if (!boton || !lista) return;

  const avisosExtra = [
    {
      categoria: "academicos",
      clase: "aviso--academico",
      icono: "🎓",
      etiqueta: "ACADÉMICO",
      titulo: "Inscripciones al segundo semestre",
      texto: "Las inscripciones para el segundo semestre estarán abiertas del 3 al 10 de junio.",
      tiempo: "Hace 3 días",
    },
    {
      categoria: "servicios",
      clase: "aviso--servicios",
      icono: "📶",
      etiqueta: "SERVICIOS",
      titulo: "Mantenimiento de la red WiFi",
      texto: "El sábado 31 de mayo habrá mantenimiento de la red WiFi de 6:00 a.m. a 10:00 a.m.",
      tiempo: "Hace 4 días",
    },
  ];

  let cargados = 0;

  boton.addEventListener("click", () => {
    if (cargados >= avisosExtra.length) {
      boton.textContent = "NO HAY MÁS AVISOS";
      boton.disabled = true;
      return;
    }

    const data = avisosExtra[cargados];
    const li = document.createElement("li");
    li.className = `aviso ${data.clase}`;
    li.dataset.categoria = data.categoria;
    li.dataset.carrera = "todas";
    li.innerHTML = `
      <div class="aviso__icono">${data.icono}</div>
      <div class="aviso__contenido">
        <span class="aviso__categoria">${data.etiqueta}</span>
        <h3>${data.titulo}</h3>
        <p>${data.texto}</p>
      </div>
      <div class="aviso__meta">
        <span class="aviso__tiempo">${data.tiempo}</span>
        <span class="aviso__punto"></span>
      </div>
    `;
    lista.appendChild(li);
    cargados++;
    actualizarContadoresCarrera();
  });
}

function initFiltroCarrera() {
  const items = document.querySelectorAll(".lista-carreras li");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      items.forEach((i) => i.classList.remove("activo"));
      item.classList.add("activo");

      estadoFiltros.carrera = item.dataset.carrera;
      aplicarFiltros();
    });
  });

  actualizarContadoresCarrera();
}

function initSuscripcion() {
  const boton = document.querySelector(".btn-suscribirme");
  const input = document.querySelector('.sidebar input[type="email"]');
  if (!boton || !input) return;

  boton.addEventListener("click", () => {
    const email = input.value.trim();

    if (!validarEmail(email)) {
      alert("Ingresa un correo electrónico válido para poder suscribirte.");
      return;
    }

    alert("¡Listo! Tu correo se registró correctamente.");
    input.value = "";
  });
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

initFiltrosCategoria();
initOrdenarPor();
initCargarMas();
initFiltroCarrera();
initSuscripcion();
initVerDetalles();
initLimpiarFiltros();
initVigencia();