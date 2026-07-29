const CATEGORY_CONFIG = {
  noticias:     { bg: "#1565C0", label: "NOTICIAS" },
  aviso:        { bg: "#1565C0", label: "AVISO" },
  evento:       { bg: "#2e7d32", label: "EVENTO" },
  //En este apartado se quitó publicaciones y eventos ya que las secciones fueron reducidas
};

function categoryBadgeHTML(category) {
  const cfg = CATEGORY_CONFIG[category] || { bg: "#1565C0", label: category.toUpperCase() };
  return `<span class="badge" style="background-color:${cfg.bg};">${cfg.label}</span>`;
}

const IMPORTANT_ITEMS = [
  { category: "aviso", title: "No habrá clases el viernes 30 de mayo por junta académica", time: "Hace 2 horas" },
  { category: "evento", title: "Hackathon 2025: competencia de desarrollo", time: "Hace 3 horas" },
  //En este apartado se quitó publicaciones y eventos ya que las secciones fueron reducidas
];

const LATEST_NEWS = [
  {
    category: "noticias",
    title: "Estudiantes ganan concurso nacional de programación",
    excerpt: "El equipo de IPC obtuvo el primer lugar en la competencia organizada por la ANUEI.",
    time: "Hace 6 horas",
    image: "https://images.unsplash.com/photo-1631350397792-8e0c2de5b637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    category: "noticias",
    title: "Nueva biblioteca digital disponible para todos",
    excerpt: "Acceso a miles de libros y recursos académicos desde cualquier dispositivo.",
    time: "Hace 1 día",
    image: "https://images.unsplash.com/photo-1696197019015-68ef1bf9cb4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    category: "noticias",
    title: "Programa de mentorías abre inscripciones",
    excerpt: "Conéctate con estudiantes y egresados que pueden orientar tu desarrollo académico.",
    time: "Hace 2 días",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
];

const UPCOMING_EVENTS = [
  { day: "28", month: "MAY", name: "Hackathon 2025", location: "Sala Magna, IA", time: "9:00 AM - 9:00 PM" },
  { day: "02", month: "JUN", name: "Conferencia IA y Futuro", location: "Auditorio Central", time: "10:00 AM - 1:00 PM" },
  { day: "05", month: "JUN", name: "Taller de Git y GitHub", location: "Laboratorio Central", time: "3:00 PM - 5:00 PM" },
];

const TRIVIA = "¿Sabías que el primer programa de computadora fue escrito en 1843 por Ada Lovelace? Considerada la primera programadora de la Historia.";

const ICON_CLOCK = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
const ICON_CHEVRON = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
const ICON_ARROW = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
const ICON_MAPPIN = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;

// Callback invoked on section navigation (equivalent to onSectionChange prop).
// Replace this with your own navigation logic.
function onSectionChange(sectionId) {
  console.log("Cambiar a sección:", sectionId);
}

function renderHero() {
  document.getElementById("hero-badge").outerHTML = categoryBadgeHTML("noticias");
  document.getElementById("hero-time").innerHTML = `${ICON_CLOCK(12)} Hace 3 horas`;
  document.getElementById("hero-readmore").innerHTML = `Leer más ${ICON_ARROW(12)}`;
}

function renderNews() {
  const grid = document.getElementById("news-grid");
  grid.innerHTML = "";
  LATEST_NEWS.forEach((news) => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <img src="${news.image}" alt="${news.title}" />
      <div class="news-card-body">
        <div class="news-badge-row">${categoryBadgeHTML(news.category)}</div>
        <h3 class="news-title">${news.title}</h3>
        <p class="news-excerpt">${news.excerpt}</p>
        <div class="news-footer">
          <span class="news-time">${ICON_CLOCK(10)} ${news.time}</span>
          <button class="news-readmore">Leer más →</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderImportant() {
  const wrap = document.getElementById("important-list");
  wrap.innerHTML = "";
  IMPORTANT_ITEMS.forEach((item) => {
    const div = document.createElement("div");
    div.className = "panel-item";
    div.innerHTML = `
      <div class="panel-item-badge">${categoryBadgeHTML(item.category)}</div>
      <p class="panel-item-title">${item.title}</p>
      <span class="panel-item-time">${ICON_CLOCK(9)} ${item.time}</span>
    `;
    wrap.appendChild(div);
  });
}

function renderEvents() {
  const wrap = document.getElementById("events-list");
  wrap.innerHTML = "";
  UPCOMING_EVENTS.forEach((event) => {
    const div = document.createElement("div");
    div.className = "event-item";
    div.innerHTML = `
      <div class="event-date-badge">
        <div class="event-date-day">${event.day}</div>
        <div class="event-date-month">${event.month}</div>
      </div>
      <div>
        <p class="event-item-name">${event.name}</p>
        <p class="event-item-location">${ICON_MAPPIN(9)} ${event.location}</p>
        <p class="event-item-time">${event.time}</p>
      </div>
    `;
    wrap.appendChild(div);
  });
}

function init() {
  renderHero();
  renderNews();
  renderImportant();
  renderEvents();

  document.getElementById("ver-todas-noticias").innerHTML = `VER TODAS ${ICON_CHEVRON(12)}`;
  document.getElementById("ver-todos-eventos").addEventListener("click", () => onSectionChange("eventos"));
  document.getElementById("trivia-text").textContent = TRIVIA;
}

init();
