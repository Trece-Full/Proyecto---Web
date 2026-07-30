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
        category: "noticias",
        title: "Inauguran nuevo laboratorio de innovación tecnológica",
        excerpt: "El nuevo laboratorio brindará a los estudiantes herramientas de última tecnología.",
        image: "https://images.unsplash.com/photo-1581093577421-f561a654a353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        time: "Hace 3 horas"
    }
;

// Noticias generales

const noticias = [
{
    imagen: "https://picsum.photos/seed/hackathon-isc/1000/500",
    categoria: "Noticias",
    titulo: "Estudiantes ganan concurso nacional de programación",
    resumen: "El equipo de ISC obtuvo el primer lugar en la competencia organizada por la ANIEI.",
    contenido: "El equipo de ISC obtuvo el primer lugar en la competencia organizada por la ANIEI, superando a más de 40 equipos de universidades de todo el país. Durante 24 horas continuas, los estudiantes desarrollaron una solución de software enfocada en la optimización de rutas de transporte urbano. El equipo estuvo compuesto por 4 estudiantes de los últimos semestres, quienes destacaron el trabajo en equipo y el apoyo de sus asesores como clave para el resultado obtenido.",
    tiempo: "Hace 5 horas"
  },
  {
    imagen: "https://picsum.photos/seed/biblioteca-digital/1000/500",
    categoria: "Noticias",
    titulo: "Nueva biblioteca digital disponible",
    resumen: "Accede a miles de libros y recursos académicos desde cualquier dispositivo.",
    contenido: "Accede a miles de libros y recursos académicos desde cualquier dispositivo. La nueva plataforma digital incluye libros de texto, revistas científicas y bases de datos especializadas para todas las carreras. El acceso es gratuito para toda la comunidad estudiantil usando las credenciales institucionales, y estará disponible tanto desde la computadora como desde una aplicación móvil que se lanzará en las próximas semanas.",
    tiempo: "Hace 1 día"
  },
  {
    imagen: "https://picsum.photos/seed/mentorias-2025/1000/500",
    categoria: "Noticias",
    titulo: "Programa de mentorías abre inscripciones",
    resumen: "Conéctate con estudiantes y egresados que pueden orientar tu desarrollo académico.",
    contenido: "Conéctate con estudiantes y egresados que pueden orientar tu desarrollo académico. El programa de mentorías busca acompañar a los estudiantes de primeros semestres con el apoyo de compañeros de semestres avanzados y egresados que ya se encuentran laborando en la industria. Las sesiones serán quincenales y podrán realizarse de forma presencial o en línea, según la disponibilidad de cada mentor.",
    tiempo: "Hace 2 días"
  },
  {
    imagen: "https://picsum.photos/seed/semana-ciencia/1000/500",
    categoria: "Noticias",
    titulo: "Semana de la ciencia y tecnología 2025",
    resumen: "Talleres, conferencias y exposiciones abiertas a toda la comunidad estudiantil.",
    contenido: "Talleres, conferencias y exposiciones abiertas a toda la comunidad estudiantil. Durante una semana completa, distintos departamentos académicos presentarán proyectos de investigación, demostraciones tecnológicas y conferencias impartidas por especialistas invitados. La entrada es libre y se entregará constancia de participación a quienes asistan a un mínimo de 3 actividades.",
    tiempo: "Hace 3 días"
  },
  {
    imagen: "https://picsum.photos/seed/labs-computo/1000/500",
    categoria: "Noticias",
    titulo: "Renuevan equipos de los laboratorios de cómputo",
    resumen: "Se instalaron nuevas computadoras y software actualizado en 4 laboratorios.",
    contenido: "Se instalaron nuevas computadoras y software actualizado en 4 laboratorios. La actualización incluye equipos con mejor capacidad de procesamiento para el desarrollo de aplicaciones, modelado 3D y ejecución de máquinas virtuales. También se instalaron las licencias de software más recientes utilizadas en las distintas materias de la carrera.",
    tiempo: "Hace 4 días"
  },
  {
    imagen: "https://picsum.photos/seed/egresados-tech/1000/500",
    categoria: "Noticias",
    titulo: "Egresados destacan en la industria del software",
    resumen: "Exalumnos comparten su experiencia trabajando en empresas de tecnología reconocidas.",
    contenido: "Exalumnos comparten su experiencia trabajando en empresas de tecnología reconocidas. En un conversatorio organizado por la coordinación de carrera, egresados de distintas generaciones platicaron sobre su trayectoria profesional, los retos que enfrentaron al egresar y consejos para los estudiantes que están por concluir sus estudios.",
    tiempo: "Hace 5 días"
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
const eventos = [
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

app.get("/api/inicio",(req,res)=>{

    res.json({

        hero,

        noticias: noticias.slice(0,3),

        importantes: importantes.slice(0,4),

        eventos: eventos.slice(0,3),

        trivia

    });

});

