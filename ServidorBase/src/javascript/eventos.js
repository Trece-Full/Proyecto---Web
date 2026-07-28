function iniciarPaginaEventos() {
  const CLAVE_STORAGE = "eventos";

  const EVENTS_INICIALES = [
    {
      id: 1, day: "28", month: "MAY", year: "2025",
      name: "Hackathon 2025: Competencia de Desarrollo",
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
      id: 2, day: "02", month: "JUN", year: "2025",
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
      id: 3, day: "05", month: "JUN", year: "2025",
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
      id: 4, day: "10", month: "JUN", year: "2025",
      name: "Feria de Posgrados y Maestrías 2025",
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
      id: 5, day: "15", month: "JUN", year: "2025",
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
      id: 6, day: "20", month: "JUN", year: "2025",
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

  const ICON_MAPPIN = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
  const ICON_CLOCK = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
  const ICON_USERS = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
  const ICON_CALENDAR = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;
  const ICON_CHEVRON = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

  function renderFeatured() {
    const wrap = document.getElementById("featured-grid");
    wrap.innerHTML = "";
    const featured = EVENTS.filter((e) => e.featured);

    featured.forEach((event) => {
      const card = document.createElement("div");
      card.className = "featured-card";
      const color = TYPE_COLORS[event.type] || "#555";

      const metaItems = [
        { icon: ICON_MAPPIN(11), text: event.location },
        { icon: ICON_CLOCK(11), text: event.time },
        { icon: ICON_USERS(11), text: `${event.attendees} cupos` },
        { icon: ICON_CALENDAR(11), text: `${event.day} ${event.month} ${event.year}` },
      ].map((m) => `<div class="meta-item">${m.icon} ${m.text}</div>`).join("");

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
        <button class="register-btn">REGISTRARSE</button>
      </div>
    `;
      wrap.appendChild(card);
    });
  }

  function renderFilters() {
    const filtersEl = document.getElementById("filters");
    filtersEl.innerHTML = "";
    FILTERS.forEach((f) => {
      const btn = document.createElement("button");
      btn.className = "filter-btn" + (activeFilter === f ? " active" : "");
      btn.textContent = f;
      btn.addEventListener("click", () => {
        activeFilter = f;
        renderFilters();
        renderEventList();
      });
      filtersEl.appendChild(btn);
    });
  }

  function renderEventList() {
    const listEl = document.getElementById("event-list");
    listEl.innerHTML = "";
    const filtered = activeFilter === "Todos" ? EVENTS : EVENTS.filter((e) => e.type === activeFilter);

    filtered.forEach((event) => {
      const color = TYPE_COLORS[event.type] || "#555";
      const row = document.createElement("div");
      row.className = "event-row";

      const metaItems = [
        { icon: ICON_MAPPIN(10), text: event.location },
        { icon: ICON_CLOCK(10), text: event.time },
        { icon: ICON_USERS(10), text: `${event.attendees} cupos` },
      ].map((m) => `<span>${m.icon} ${m.text}</span>`).join("");

      row.innerHTML = `
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
        <button class="ver-mas-btn">Ver más ${ICON_CHEVRON(13)}</button>
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