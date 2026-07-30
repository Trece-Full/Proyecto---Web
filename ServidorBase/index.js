const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const path = require("path");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const PORT = 3000;

//inicio sesion
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "contenido", "iniciosesion.html"));
});

//inicio
app.get("/inicio", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.use(express.static(path.join(__dirname, "src")));

// Intento de generar las rutas

// Ruta principal

/*
app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "src", "index.html"))
})
*/



// Arreglo con las secciones
const paginas = [
    "avisos",
    "eventos",
    "foro",
    "inicio",
    "noticias",
    "iniciosesion"
];

// Rutas dinamicas
app.get("/:pagina", (req, res) => {
    const pagina = req.params.pagina;

    if (paginas.includes(pagina)) {
        res.sendFile(path.join(__dirname, "src", "index.html"));
    } else {
        res.status(404).send("Página no encontrada");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});




//inicio de sesion
const usuarios = [
    {
        usuario: "admin",
        contraseña: "1234"
    }
];

// inicioaesion
app.post("/iniciosesion", (req, res) => {

    const { usuario, contraseña } = req.body;

    const existe = usuarios.find(u =>
        u.usuario === usuario &&
        u.contraseña === contraseña
    );

    if (existe) {
        res.json({
            valido: true,
            mensaje: "Inicio de sesión correcto"
        });
    } else {
        res.status(401).json({
            valido: false,
            mensaje: "Usuario o contraseña incorrectos"
        });
    }

});



// Arreglos con la informacion de la pagina (noticias, eventos, etc)
// Noticia principal
const hero =
{
    categoria: "noticias",
    titulo: "Fuertes lluvias inundan el Tec de Tepic",
    resumen: "En los ultímos días de estos meses se han reportado lluvias que impiden el acceso y salida del plantel.",
    imagen: "https://humanidades.com/wp-content/uploads/2018/10/lluvia-3-e1581819535291.jpg",
    tiempo: "Hace 3 horas",
    contenido: "SE INUNDÓ EL TEC"
}
    ;

// Noticias generales

const noticias = [
    {
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQncjyiCo0TBYMwzdfbmyr2gQZaP0YzXi0AZLk5Iw4FZg&s=10",
        categoria: "Noticias",
        titulo: "No hay rollo de papel en los baños del UVP",
        resumen: "Durante los últimos meses se ha reportado la falta de papel higíenico en los baños del edificio UVP",
        contenido: "Comunidad estudiantil y docente del edificio UVP ha manifestado su molestia ante la constante desabastecimiento de papel higiénico en los sanitarios del inmueble. A pesar de los múltiples reportes canalizados al departamento de servicios generales durante los últimos meses, el problema persiste daily, por lo que los alumnos exigen una solución inmediata o la revisión del presupuesto destinado a los insumos básicos de higiene.",
        tiempo: "Hace 5 horas"
    },
    {
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ96UrUWz2P5tFMy872Fi95MC5mWxWPOgWcdcdnmtukeA&s=10",
        categoria: "Noticias",
        titulo: "Estudiantes del ISC ganan en Hackaton",
        resumen: "Nuestros estudiantes de Ingeniería en Sistemas Computacionales han ganadao en este Hackaton.",
        contenido: "El equipo de ISC obtuvo el primer lugar en la competencia organizada por la ANIEI, superando a más de 40 equipos de universidades de todo el país. Durante 24 horas continuas, los estudiantes desarrollaron una solución de software enfocada en la optimización de rutas de transporte urbano. El equipo estuvo compuesto por 4 estudiantes de los últimos semestres, quienes destacaron el trabajo en equipo y el apoyo de sus asesores como clave para el resultado obtenido.",
        tiempo: "Hace 1 día"
    },
    {
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqN74T9Xq_Pd_HsucL9yZgMN2x1nNvMzXcXXwbOfajCw&s=10",
        categoria: "Noticias",
        titulo: "Cursos de Tutorías",
        resumen: "Se abren las inscripciones a tutorías para los alumnos que lo necesiten",
        contenido: "La dirección académica ha anunciado la apertura del periodo de inscripciones para el programa institucional de tutorías. Este espacio tiene como objetivo brindar acompañamiento académico, regularización en asignaturas clave y orientación profesional a los estudiantes que busquen reforzar sus conocimientos. Se invita a toda la comunidad estudiantil a revisar los horarios disponibles a través de la plataforma institucional y realizar su registro a tiempo.",
        tiempo: "Hace 2 días"
    },
    {
        imagen: "https://play-lh.googleusercontent.com/YFJOg4YCdSvrVyn0leLp8Vt09Uvyt1GQPnW_nbZEJPJYCZ6cwbGkp6swAiMUxPAfJ1YZPWXfpRJSgg1H1Pi3MQ",
        categoria: "Noticias",
        titulo: "Estudiantes del ISC ganan torneo de videojuegos",
        resumen: "Nuestros compañeros de ISC se llevan la victoria en torneo con causas benéficas",
        contenido: "En una emocionante jornada llena de estrategia y trabajo en equipo, los estudiantes de Ingeniería en Sistemas Computacionales se coronaron campeones del torneo benéfico de eSports. El evento reunió a decenas de participantes con el objetivo de recaudar fondos y víveres para una causa social. Tras intensas partidas en las rondas finales, el equipo de ISC logró asegurar el primer lugar, demostrando no solo su habilidad en el juego, sino también el gran espíritu solidario de la comunidad universitaria.",
        tiempo: "Hace 3 días"
    },
    {
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-VWbu5wgjc_6neWTmuWs8nz165T-KZIlZDvZ6k9UPWQ&s=10",
        categoria: "Noticias",
        titulo: "No sirven los las computadoras del laboratorio de cómputo",
        resumen: "Estudiantes de nuevo ingreso se dieron cuenta que el equipo proporcionado por el Tec no funciona",
        contenido: "Durante las primeras prácticas de laboratorio, los alumnos de nuevo ingreso se encontraron con serias fallas operativas en las computadoras asignadas por la institución. Entre pantallas azules, falta de software indispensable y fallas de encendido, los estudiantes manifestaron su incomodidad ante la imposibilidad de avanzar en sus materias académicas. La coordinación administrativa prometió evaluar los equipos a la brevedad.",
        tiempo: "Hace 4 días"
    },
    {
        imagen: "https://ih1.redbubble.net/image.5856623601.0647/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
        categoria: "Noticias",
        titulo: "Egresados sin empleo",
        resumen: "Exalumnos comparten su experiencia buscando chamba",
        contenido: "Un grupo de exalumnos se reunió para dialogar sobre los desafíos reales de insertarse en el mercado laboral actual. A través de testimonios honestos, compartieron la dificultad para encontrar vacantes con salarios dignos y la constante exigencia de años de experiencia previa para puestos de entrada. El conversatorio busca visibilizar la brecha laboral y solicitar un mayor respaldo del departamento de vinculación profesional.",
        tiempo: "Hace 5 días"
    },
    {
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-EJhEnQqI_JM1cJVN48B8Zd7Jlws3X_yf-J7Aq2gfWQ&s=10",
        categoria: "Noticias",
        titulo: "¿Qué te alcanza con $20 en la cafetería?",
        resumen: "Nuestros reporteros investigan precios en la cafetería para aquellos que no tienen dinero",
        contenido: "Una investigación especial por parte del equipo periodístico ha puesto sobre la mesa recomendaciones para almorzar durante la estadía en el campus, te alcanzan para sabritas y uno que otro postre, se recomienda por motivos de salud no consumir muchos de estos alimentos",
        tiempo: "Hace 6 días"
    },
    {
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4KXbimjd5Sd4_dUtmNw882bP_NcsK9RoLx5zEJ4ztzA8OB4mhLSUi-c8&s=10",
        categoria: "Noticias",
        titulo: "Grave pelea en las instalaciones del Tec",
        resumen: "Estudiantes del plantel expulsados tras fuerte pelea",
        contenido: "Un altercado violento dentro de las instalaciones del plantel terminó en tragedia tras salirse completamente de control. El enfrentamiento físico entre varios jóvenes derivó en la expulsión definitiva de las partes responsables por parte del consejo disciplinario. La fiscalía ha iniciado las investigaciones correspondientes para deslindar responsabilidades penales.",
        tiempo: "Hace 7 días"
    }
];


// Importantes
const importantes = [
    {
        id: 1,
        category: "aviso",
        title: "No habrá clases el viernes.",
        time: "Hace 2 horas"
    },
    {
        id: 2,
        category: "evento",
        title: "Hackathon 2025.",
        time: "Hace 3 horas"
    },
    {
        id: 2,
        category: "noticia",
        title: "Inauguran nuevo laboratorio.",
        time: "Hace 3 ho"
    },

];

// Eventos 
let eventos = [
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

// Curisosidad 
trivia = "¿Sabías que Ada Lovelace fue considerada la primera programadora?"

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



        views: 312,

        pinned: true,

        replies: [

            {

                id: 1,

                author: "Carlos Mendoza",

                career: "Ing. Civil",

                content: "Te recomiendo muchísimo los videos de 3Blue1Brown.",



            },

            {

                id: 2,

                author: "María González",

                career: "Ing. Industrial",

                content: "Practica muchos ejercicios de límites y derivadas.",



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



        views: 587,

        pinned: false,

        replies: [

            {

                id: 1,

                author: "Ana Torres",

                career: "Arquitectura",

                content: "Sí, afecta bastante al turno vespertino.",



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

        pinned: false,

        replies: []

    }

]

app.get("/api/inicio", (req, res) => {

    res.json({

        hero,

        noticias: noticias.slice(0, 3),

        importantes: importantes.slice(0, 4),

        eventos: eventos.slice(0, 3),

        trivia

    });

});

app.get("/api/noticias", (req, res) => {

    res.json({

        hero,

        noticias



    });

});
// USO COMPLETO DE CRUD
let idForo = threads.length + 1;

// Se utiliza para mostrar las discusiones
app.get("/api/foro", (req, res) => {
    res.json(threads);

});
// Publicar discusiones
app.post("/api/foro", (req, res) => {


    const nuevaDiscusion = {

        id: idForo++,

        category: req.body.category,

        title: req.body.title,

        preview: req.body.preview,

        content: req.body.content,

        author: req.body.author,

        career: req.body.career,

        date: req.body.date,

        pinned: req.body.pinned,

        replies: []

    };


    threads.push(nuevaDiscusion);

    res.status(201).json({
        mensaje: "Discusión creada correctamente",
        discusion: nuevaDiscusion
    });

}

);

// Eliminar discusiones
app.delete("/api/foro/:id", (req, res) => {

    const id = Number(req.params.id);

    const indice = threads.findIndex(thread => thread.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Discusión no encontrada"
        });
    }

    threads.splice(indice, 1);

    res.json({
        mensaje: "Discusión eliminada"
    });

});

// Editar discusiones
app.put("/api/foro/:id", (req, res) => {

    const id = Number(req.params.id);

    const thread = threads.find(thread => thread.id === id);

    if (!thread) {
        return res.status(404).json({
            mensaje: "Discusión no encontrada"
        });
    }


    thread.title = req.body.title;
    thread.content = req.body.content;
    thread.preview = req.body.content.substring(0,120) + "...";
    thread.category = req.body.category;


    res.json({
        mensaje: "Discusión actualizada correctamente",
        discusion: thread
    });

});
