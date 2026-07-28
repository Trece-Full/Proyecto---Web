//==============================
// VARIABLES GLOBALES
//==============================

let activeCategory = "todos";
let selectedThread = null;
let search = "";

//==============================
// CATEGORÍAS
//==============================

const categorias = [

    {
        id: "general",
        nombre: "General"
    },

    {
        id: "academico",
        nombre: "Académico"
    },

    {
        id: "tecnologia",
        nombre: "Tecnología"
    },

    {
        id: "cultura",
        nombre: "Cultura y Arte"
    },

    {
        id: "deportes",
        nombre: "Deportes"
    },

    {
        id: "empleos",
        nombre: "Empleos y Prácticas"
    }

];

//==============================
// DISCUSIONES
//==============================

let threads = [

    {

        id: 1,

        category: "academico",

        title: "¿Cuáles son los mejores consejos para el examen de cálculo diferencial?",

        preview: "Tengo el parcial la próxima semana y me está costando trabajo entender los límites y derivadas.",

        content: "Hola a todos. Tengo el parcial de cálculo diferencial la próxima semana y necesito algunos consejos para prepararme. ¿Qué libros, videos o ejercicios me recomiendan?",

        author: "Sofía Ramírez",

        career: "Ing. en Sistemas",

        date: "Hace 2 horas",

        likes: 18,

        views: 312,

        pinned: true,

        replies: [

            {

                id: 1,

                author: "Carlos Mendoza",

                career: "Ing. Civil",

                content: "Te recomiendo muchísimo los videos de 3Blue1Brown.",

                likes: 12

            },

            {

                id: 2,

                author: "María González",

                career: "Matemáticas",

                content: "Practica muchos ejercicios de límites y derivadas.",

                likes: 8

            }

        ]

    },

    {

        id: 2,

        category: "general",

        title: "¿Qué opinan del nuevo horario de la cafetería?",

        preview: "Ahora cierra más temprano y muchos estudiantes nos quedamos sin comer.",

        content: "La cafetería ahora cierra a las 6 PM. ¿Creen que deberían volver al horario anterior?",

        author: "Luis Hernández",

        career: "Administración",

        date: "Hace 4 horas",

        likes: 44,

        views: 587,

        pinned: false,

        replies: [

            {

                id: 1,

                author: "Ana Torres",

                career: "Derecho",

                content: "Sí, afecta bastante al turno vespertino.",

                likes: 21

            }

        ]

    },

    {

        id: 3,

        category: "tecnologia",

        title: "Recursos para aprender JavaScript",

        preview: "Comparto algunos cursos gratuitos para comenzar desde cero.",

        content: "Les recomiendo freeCodeCamp, The Odin Project y la documentación de MDN.",

        author: "Diego Flores",

        career: "Ing. en Sistemas",

        date: "Hace 1 día",

        likes: 97,

        views: 1240,

        pinned: false,

        replies: []

    }

];

//========================================
// ELEMENTOS DEL HTML
//========================================

const listaDiscusiones = document.getElementById("listaDiscusiones");
const contador = document.getElementById("contador");
const buscar = document.getElementById("buscar");

const totalThreads = document.getElementById("totalThreads");
const totalReplies = document.getElementById("totalReplies");


//========================================
// ESTADÍSTICAS
//========================================

function actualizarEstadisticas() {

    totalThreads.textContent = threads.length;

    let respuestas = 0;

    threads.forEach(thread => {

        respuestas += thread.replies.length;

    });

    totalReplies.textContent = respuestas;

}


//========================================
// MOSTRAR DISCUSIONES
//========================================

function mostrarDiscusiones() {

    listaDiscusiones.innerHTML = "";

    let lista = threads.filter(thread => {

        if (activeCategory == "todos")
            return true;

        return thread.category == activeCategory;

    });


    lista = lista.filter(thread => {

        return thread.title.toLowerCase().includes(search.toLowerCase()) ||

            thread.preview.toLowerCase().includes(search.toLowerCase());

    });


    contador.textContent = lista.length + " discusiones";


    lista.forEach(thread => {

        let tarjeta = document.createElement("div");

        tarjeta.className = "tarjeta";


        tarjeta.innerHTML = `

            <h3>${thread.title}</h3>

            <p>${thread.preview}</p>

            <div class="info">

                <span>${thread.author}</span>

                <span>${thread.date}</span>

            </div>

            <div class="info">

                <span> 👍 ${thread.likes}</span>

                <span> 💬 ${thread.replies.length}</span>

                <span> 👁 ${thread.views}</span>

            </div>

        `;

        tarjeta.addEventListener("click", () => {

            mostrarDetalle(thread.id);

        });

        listaDiscusiones.appendChild(tarjeta);

    });

}


//========================================
// MOSTRAR DETALLE
//========================================

function mostrarDetalle(id) {

    const detalle = document.getElementById("detalleDiscusion");

    const lista = document.getElementById("listaDiscusiones");

    let thread = threads.find(t => t.id == id);

    selectedThread = thread;

    lista.style.display = "none";

    detalle.classList.remove("oculto");

    detalle.innerHTML = `

    <style>

    #volver{
    
    border: none;

    border-radius: 8px;

    cursor: pointer;

    font-size: 15px;

    margin-bottom: 15px;

    background: transparent;

    }
    </style>

        <button id="volver">
        
        ⬅ Volver
        
        </button>

        <h2>${thread.title}</h2>

        <br>

        <p>${thread.content}</p>

        <br>

        <hr>

        <br>

        <h3>Respuestas</h3>

        <div id="respuestas"></div>

        <br>

        <textarea id="nuevaRespuesta"
        placeholder="Escribe una respuesta..."
        rows="5"></textarea>

        <br><br>

        <button id="responder">

            Responder

        </button>

    `;

    const respuestas = document.getElementById("respuestas");

    thread.replies.forEach(reply => {

        respuestas.innerHTML += `

            <div class="tarjeta">

                <strong>${reply.author}</strong>

                <br><br>

                ${reply.content}

                <br><br>

                👍 ${reply.likes}

            </div>

        `;

    });


    document.getElementById("volver").onclick = () => {

        detalle.classList.add("oculto");

        lista.style.display = "block";

    };

}

//========================================
// MODAL
//========================================

const modal = document.getElementById("modal");

document.getElementById("btnNuevaDiscusion").addEventListener("click", () => {

    modal.classList.remove("oculto");

});

document.getElementById("cerrarModal").addEventListener("click", () => {

    modal.classList.add("oculto");

});

document.getElementById("cancelar").addEventListener("click", () => {

    modal.classList.add("oculto");

});


//========================================
// PUBLICAR DISCUSIÓN
//========================================

document.getElementById("publicar").addEventListener("click", () => {

    const titulo = document.getElementById("titulo").value.trim();

    const contenido = document.getElementById("contenido").value.trim();

    const categoria = document.getElementById("categoria").value;

    if (titulo == "" || contenido == "") {

        alert("Completa todos los campos.");

        return;

    }

    const nueva = {

        id: Date.now(),

        category: categoria,

        title: titulo,

        preview: contenido.substring(0, 120) + "...",

        content: contenido,

        author: "Tú",

        career: "Estudiante",

        date: "Ahora",

        likes: 0,

        views: 1,

        pinned: false,

        replies: []

    };

    threads.unshift(nueva);

    document.getElementById("titulo").value = "";

    document.getElementById("contenido").value = "";

    modal.classList.add("oculto");

    actualizarEstadisticas();

    mostrarDiscusiones();

});


//========================================
// RESPONDER
//========================================

document.addEventListener("click", function (e) {

    if (e.target.id == "responder") {

        const texto = document.getElementById("nuevaRespuesta").value.trim();

        if (texto == "") {

            alert("Escribe una respuesta.");

            return;

        }

        selectedThread.replies.push({

            id: Date.now(),

            author: "Tú",

            career: "Estudiante",

            content: texto,

            likes: 0

        });

        mostrarDetalle(selectedThread.id);

        actualizarEstadisticas();

    }

});


//========================================
// BUSCADOR
//========================================

buscar.addEventListener("keyup", () => {

    search = buscar.value;

    mostrarDiscusiones();

});


//========================================
// FILTRO POR CATEGORÍA
//========================================

document.querySelectorAll(".categoria").forEach(boton => {

    boton.addEventListener("click", () => {

        document.querySelectorAll(".categoria").forEach(btn => {

            btn.classList.remove("activa");

        });

        boton.classList.add("activa");

        activeCategory = boton.dataset.category;

        mostrarDiscusiones();

    });

});


//========================================
// INICIAR
//========================================

actualizarEstadisticas();

mostrarDiscusiones();

