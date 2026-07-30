// Conexión con el servidor
(() => {

    const API_URL = "https://proyecto-web-rose.vercel.app/api/inicio";


    //VARIABLES

    let hero = {};

    let noticias = [];

    let importantes = [];

    let eventos = [];

    let trivia = "";

    const ICON_CLOCK = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
    const ICON_CHEVRON = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
    const ICON_ARROW = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
    const ICON_MAPPIN = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;

    // Colores de las categoria
    const CATEGORY_CONFIG = {
        noticias: {
            bg: "#1565C0",
            label: "NOTICIAS"
        },

        aviso: {
            bg: "#c03d15",
            label: "AVISO"
        },

        evento: {
            bg: "#2e7d32",
            label: "EVENTO"
        }
    };

    const bievenida =
    {
        title: "Pendiente",
        image: "https://www.lifeder.com/wp-content/uploads/2019/12/matematicas-concepto-lifeder-min.jpg",
        excerpt: "Pendiente"
    }
        ;




    function categoryBadgeHTML(category) {

        const cfg = CATEGORY_CONFIG[category] || {

            bg: "#1565C0",

            label: category.toUpperCase()

        };

        return `
        <span
            class="badge"
            style="background-color:${cfg.bg};">

            ${cfg.label}

        </span>
    `;

    }





    // Obtener datos del servidor
    async function cargarInicio() {

        try {

            const respuesta = await fetch(API_URL);

            const datos = await respuesta.json();

            hero = datos.hero;

            noticias = datos.noticias;

            importantes = datos.importantes;

            eventos = datos.eventos;

            trivia = datos.trivia;

            renderBienvenida();

            renderNews();

            renderImportant();

            renderEvents();

            renderTrivia();

        }

        catch (error) {

            console.error(error);

        }

    }



    function renderBienvenida() {

        document.getElementById("hero-image").src = bievenida.image;

        document.getElementById("hero-title").textContent = bievenida.title;

        document.getElementById("hero-excerpt").textContent = bievenida.excerpt;





    }

    function renderNews() {

        const grid = document.getElementById("news-grid");

        grid.innerHTML = "";

        noticias.forEach(news => {

            const card = document.createElement("div");

            card.className = "news-card";

            card.innerHTML = `

            <img src="${news.imagen}" alt="${news.titulo}">

            <div class="news-card-body">

                <div class="news-badge-row">

                    ${categoryBadgeHTML(news.categoria)}

                </div>

                <h3 class="news-title">

                    ${news.titulo}

                </h3>

                <p class="news-excerpt">

                    ${news.resumen}

                </p>

                <div class="news-footer">

                    <span class="news-time">

                        ${ICON_CLOCK(10)}

                        ${news.tiempo}

                    </span>

                   

                </div>

            </div>

        `;

            grid.appendChild(card);

        });

    }

    /*
 <button class="news-readmore">

                        Leer más →

                    </button>
    */

    function renderImportant() {

        const wrap = document.getElementById("important-list");

        wrap.innerHTML = "";

        importantes.forEach(item => {

            const div = document.createElement("div");

            div.className = "panel-item";

            div.innerHTML = `

            <div class="panel-item-badge">

                ${categoryBadgeHTML(item.category)}

            </div>

            <p class="panel-item-title">

                ${item.title}

            </p>

            <span class="panel-item-time">

                ${ICON_CLOCK(9)}

                ${item.time}

            </span>

        `;

            wrap.appendChild(div);

        });

    }

    function renderEvents() {

        const wrap = document.getElementById("events-list");

        wrap.innerHTML = "";

        eventos.forEach(event => {

            const div = document.createElement("div");

            div.className = "event-item";

            div.innerHTML = `

            <div class="event-date-badge">

                <div class="event-date-day">

                    ${event.day}

                </div>

                <div class="event-date-month">

                    ${event.month}

                </div>

            </div>

            <div>

                <p class="event-item-name">

                    ${event.name}

                </p>

                <p class="event-item-location">

                    ${ICON_MAPPIN(9)}

                    ${event.location}

                </p>

                <p class="event-item-time">

                    ${event.time}

                </p>

            </div>

        `;

            wrap.appendChild(div);

        });

    }

    function renderTrivia() {

        document.getElementById("trivia-text").textContent = trivia;

    }

    function onSectionChange(sectionId) {

        navegar(sectionId);

    }

    async function init() {

        await cargarInicio();

        document.getElementById("ver-todas-noticias").innerHTML =
            `VER TODAS ${ICON_CHEVRON(12)}`;

        document.getElementById("ver-todas-noticias")
            .addEventListener("click", () => onSectionChange("noticias"));

        document.getElementById("ver-todos-eventos")
            .addEventListener("click", () => onSectionChange("eventos"));

        document.getElementById("ver-todos-avisos")
            .addEventListener("click", () => onSectionChange("avisos"));

    }

    init();

})();


