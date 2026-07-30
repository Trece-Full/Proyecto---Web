function iniciarPaginaEventos() {
  const CLAVE_STORAGE = "eventos";

  const EVENTS_INICIALES = [
    {
      id: 1, day: "28", month: "MAY", year: "2026",
      name: "Hackathon 2026: Competencia de Desarrollo",
      type: "Competencia",
      location: "Sala Magna, Ingeniería A",
      time: "9:00 AM - 9:00 PM",
      organizer: "Departamento de Ingeniería",
      attendees: 120,
      description: "Competencia de 24 horas donde equipos de estudiantes desarrollan soluciones tecnológicas para retos sociales. Premios en efectivo y mentoría de expertos de la industria.",
      image: "https://images.unsplash.com/photo-1719159381981-1327b22aff9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      featured: true,
    },
    {
      id: 2, day: "02", month: "JUN", year: "2026",
      name: "Conferencia: IA y el Futuro del Trabajo",
      type: "Conferencia",
      location: "Auditorio Central",
      time: "10:00 AM - 1:00 PM",
      organizer: "Vicerrectoría Académica",
      attendees: 250,
      description: "Panel de expertos en inteligencia artificial discutirán el impacto de la IA en el mercado laboral y las habilidades que los profesionales necesitarán en los próximos años.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      featured: true,
    },
    {
      id: 3, day: "05", month: "JUN", year: "2026",
      name: "Taller de Git y GitHub para Principiantes",
      type: "Taller",
      location: "Laboratorio Central, Planta Baja",
      time: "3:00 PM - 6:00 PM",
      organizer: "Club de Programación",
      attendees: 40,
      description: "Aprende a usar Git y GitHub desde cero. Control de versiones, ramas, pull requests y buenas prácticas de desarrollo colaborativo en equipo.",
      image: "https://images.unsplash.com/photo-1632910121591-29e2484c0259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      featured: false,
    },
    {
      id: 4, day: "10", month: "JUN", year: "2026",
      name: "Feria de Posgrados y Maestrías 2026",
      type: "Feria",
      location: "Explanada Principal",
      time: "9:00 AM - 4:00 PM",
      organizer: "Servicios Escolares",
      attendees: 500,
      description: "Más de 30 instituciones nacionales e internacionales presentarán sus programas de posgrado. Información sobre becas, financiamiento y procesos de admisión.",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      featured: false,
    },
    {
      id: 5, day: "15", month: "JUN", year: "2026",
      name: "Seminario Internacional de Ciencias Sociales",
      type: "Seminario",
      location: "Sala de Conferencias B",
      time: "8:00 AM - 5:00 PM",
      organizer: "Facultad de Humanidades",
      attendees: 80,
      description: "Seminario de dos días con ponentes internacionales que abordarán temas de sociología, política y economía global desde una perspectiva latinoamericana.",
      image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      featured: false,
    },
    {
      id: 6, day: "20", month: "JUN", year: "2026",
      name: "Taller de Diseño UX/UI con Figma",
      type: "Taller",
      location: "Laboratorio de Diseño Digital",
      time: "10:00 AM - 2:00 PM",
      organizer: "Coordinación de Diseño",
      attendees: 30,
      description: "Taller práctico de diseño de interfaces y experiencia de usuario utilizando Figma. Aprende a crear prototipos interactivos y sistemas de diseño.",
      image: "https://images.unsplash.com/photo-1581093577421-f561a654a353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      featured: false,
    },
  ];

  function cargarEventos() {
    const guardado = localStorage.getItem(CLAVE_STORAGE);

    if (guardado) {
      return JSON.parse(guardado);
    }

    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(EVENTS_INICIALES));
    return EVENTS_INICIALES;
  }

  function guardarEventos() {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(EVENTS));
  }

  let EVENTS = cargarEventos();

  const MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

  function partesDeFecha(valorFecha) {
    const fecha = new Date(`${valorFecha}T00:00:00`);
    return {
      day: String(fecha.getDate()).padStart(2, "0"),
      month: MESES[fecha.getMonth()],
      year: String(fecha.getFullYear()),
    };
  }

  function siguienteId() {
    if (EVENTS.length === 0) return 1;
    return Math.max(...EVENTS.map((e) => e.id)) + 1;
  }

  const TYPE_COLORS = {
    Competencia: "#c62828",
    Conferencia: "#1565C0",
    Taller: "#2e7d32",
    Feria: "#e65100",
    Seminario: "#6a1b9a",
  };

  const FILTERS = ["Todos", "Conferencia", "Taller", "Competencia", "Feria", "Seminario"];
  let activeFilter = "Todos";

  const ICON_MAPPIN = () => "◉";
  const ICON_CLOCK = () => "◷";
  const ICON_USERS = () => "◫";
  const ICON_CALENDAR = () => "▤";
  const ICON_CHEVRON = () => "›";

  function renderFeatured() {
    const wrap = document.getElementById("featured-grid");
    wrap.innerHTML = "";
    const featured = EVENTS.filter((e) => e.featured);

    featured.forEach((event) => {
      const card = document.createElement("div");
      card.className = "featured-card";
      const color = TYPE_COLORS[event.type] || "#555";

      const metaItems = `
  <div class="meta-item">${ICON_MAPPIN()} ${event.location}</div>
  <div class="meta-item">${ICON_CLOCK()} ${event.time}</div>
  <div class="meta-item">${ICON_USERS()} ${event.attendees} cupos</div>
  <div class="meta-item">${ICON_CALENDAR()} ${event.day} ${event.month} ${event.year}</div>
                `;
      card.innerHTML = `
      <div class="featured-image-wrap">
        <img class="featured-image" src="${event.image}" alt="${event.name}" />
        <div class="type-badge-wrap">
          <span class="type-badge" style="background-color:${color};">${event.type.toUpperCase()}</span>
        </div>
        <div class="date-badge">
          <div class="date-day">${event.day}</div>
          <div class="date-month">${event.month}</div>
        </div>
      </div>
      <div class="featured-body">
        <h3 class="featured-name">${event.name}</h3>
        <p class="featured-desc">${event.description}</p>
        <div class="featured-meta-grid">${metaItems}</div>
      </div>
    `;
      wrap.appendChild(card);
    });
  }

  function renderFilters() {
    const filtersEl = document.getElementById("filters");
    filtersEl.innerHTML = "";

    for (let i = 0; i < FILTERS.length; i++) {
      const nombreFiltro = FILTERS[i];

      const btn = document.createElement("button");
      btn.textContent = nombreFiltro;

      if (activeFilter === nombreFiltro) {
        btn.className = "filter-btn active";
      } else {
        btn.className = "filter-btn";
      }

      btn.addEventListener("click", function () {
        activeFilter = nombreFiltro;
        renderFilters();
        renderEventList();
      });

      filtersEl.appendChild(btn);
    }
  }

  function renderEventList() {
    const listEl = document.getElementById("event-list");
    listEl.innerHTML = "";
    const filtered = activeFilter === "Todos" ? EVENTS : EVENTS.filter((e) => e.type === activeFilter);

    filtered.forEach((event) => {
      const color = TYPE_COLORS[event.type] || "#555";
      const row = document.createElement("div");
      row.className = "event-row";

      const metaItems = `
  <span>${ICON_MAPPIN()} ${event.location}</span>
  <span>${ICON_CLOCK()} ${event.time}</span>
  <span>${ICON_USERS()} ${event.attendees} cupos</span>
`;

      row.innerHTML = `

      <style>
      .editar-btn:hover{
        background: green;
        color: white
      }
      </style>

      <div class="date-badge-small">
        <div class="date-day">${event.day}</div>
        <div class="date-month">${event.month}</div>
      </div>
      <div class="event-row-content">
        <div class="event-row-title-line">
          <span class="type-badge" style="background-color:${color};">${event.type.toUpperCase()}</span>
          <h3 class="event-row-title">${event.name}</h3>
        </div>
        <p class="event-row-desc">${event.description}</p>
        <div class="event-row-meta">${metaItems}</div>
      </div>
      <div class="event-row-actions">
        <button class="editar-btn" onclick="editarEvento(${event.id})">Editar</button>
        <button class="eliminar-btn" onclick="eliminarEvento(${event.id})">Eliminar</button>
      </div>
    `;
      listEl.appendChild(row);
    });
  }

  const formulario = document.getElementById("formulario-evento");
  const inputId = document.getElementById("evento-id");
  const inputNombre = document.getElementById("evento-nombre");
  const inputTipo = document.getElementById("evento-tipo");
  const inputFecha = document.getElementById("evento-fecha");
  const inputHora = document.getElementById("evento-hora");
  const inputUbicacion = document.getElementById("evento-ubicacion");
  const inputOrganizador = document.getElementById("evento-organizador");
  const inputCupos = document.getElementById("evento-cupos");
  const inputImagen = document.getElementById("evento-imagen");
  const inputDescripcion = document.getElementById("evento-descripcion");
  const inputDestacado = document.getElementById("evento-destacado");
  const btnCancelar = document.getElementById("btn-cancelar");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const { day, month, year } = partesDeFecha(inputFecha.value);

    const evento = {
      id: inputId.value ? Number(inputId.value) : siguienteId(),
      day,
      month,
      year,
      name: inputNombre.value,
      type: inputTipo.value,
      location: inputUbicacion.value,
      time: inputHora.value,
      organizer: inputOrganizador.value,
      attendees: Number(inputCupos.value),
      description: inputDescripcion.value,
      image: inputImagen.value || "https://imgs.search.brave.com/Ee2bOGhot4b50PV67x73b7t4Xb6DGR4dbNKp0eqEFIo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTU0/OTk4OTgyL2VzL2Zv/dG8vYW5maXRlYXRy/by1kZS1lc3R1ZGlh/bnRlcy1kZS1sYS11/bml2ZXJzaWRhZC1j/b21wbGV0by1oYWNp/ZW5kby1leGFtZW4u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXBFUVNOSEFmblhn/aTBMR2MxcU5SMzdC/NDh5b2pFdkVvS0VG/OWltNlloSkk9",
      featured: inputDestacado.checked,
    };

    if (inputId.value) {
      const indice = EVENTS.findIndex((e) => e.id === evento.id);
      EVENTS[indice] = evento;
    } else {
      EVENTS.push(evento);
    }

    guardarEventos();
    formulario.reset();
    inputId.value = "";

    renderFeatured();
    renderFilters();
    renderEventList();
  });

  function editarEvento(idEvento) {
    const evento = EVENTS.find((e) => e.id === idEvento);
    if (!evento) return;

    inputId.value = evento.id;
    inputNombre.value = evento.name;
    inputTipo.value = evento.type;
    inputHora.value = evento.time;
    inputUbicacion.value = evento.location;
    inputOrganizador.value = evento.organizer;
    inputCupos.value = evento.attendees;
    inputImagen.value = evento.image;
    inputDescripcion.value = evento.description;
    inputDestacado.checked = evento.featured;

    document.querySelector(".form-details").open = true;

    const indiceMes = MESES.indexOf(evento.month);
    const mesConDosDigitos = String(indiceMes + 1).padStart(2, "0");
    inputFecha.value = `${evento.year}-${mesConDosDigitos}-${evento.day}`;

    formulario.scrollIntoView({ behavior: "smooth" });
  }

  function eliminarEvento(idEvento) {
    const confirmado = confirm("¿Seguro que quieres eliminar este evento?");
    if (!confirmado) return;

    EVENTS = EVENTS.filter((e) => e.id !== idEvento);
    guardarEventos();

    renderFeatured();
    renderFilters();
    renderEventList();
  }

  window.editarEvento = editarEvento;
  window.eliminarEvento = eliminarEvento;

  btnCancelar.addEventListener("click", () => {
    formulario.reset();
    inputId.value = "";
  });

  renderFeatured();
  renderFilters();
  renderEventList();
}

iniciarPaginaEventos();