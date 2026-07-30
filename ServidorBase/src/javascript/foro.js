(function () {
    //==============================
    // VARIABLES GLOBALES
    //==============================
    const API_URL = "http://localhost:3000/api/foro"

    let activeCategory = "todos";
    let selectedThread = null;
    let search = "";

    let threads = [];

    async function cargarDiscusiones() {
        try {

            const respuesta = await fetch(API_URL);

            threads = await respuesta.json();

            actualizarEstadisticas();

            mostrarDiscusiones();

        } catch (error) {

            console.error("Error cargando foro:", error);

        }
    }

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


                <span> 💬 ${thread.replies.length}</span>


            </div>

        `;

            // No sé por qué el replies.length no sirve.
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

    #volver, #responder{
    
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

    document.getElementById("publicar").addEventListener("click", async () => {

        const titulo = document.getElementById("titulo").value.trim();

        const contenido = document.getElementById("contenido").value.trim();

        const categoria = document.getElementById("categoria").value;


        if (titulo == "" || contenido == "") {

            alert("Completa todos los campos.");

            return;

        }


        const nueva = {

            category: categoria,

            title: titulo,

            preview: contenido.substring(0, 120) + "...",

            content: contenido,

            author: "Tú",

            career: "Estudiante",

            date: "Ahora",

            pinned: false,

            replies: []
        };


        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nueva)
        });


        await cargarDiscusiones();

    });

    // Editar
    async function editarDiscusion(id) {

        await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: "Nuevo titulo"
            })

        });

        cargarDiscusiones();

    };

    async function eliminarDiscusion(id) {

        await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });


        cargarDiscusiones();

    }


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

    cargarDiscusiones();

})();