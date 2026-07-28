(function () {

/* 1. DATOS */

const noticiaDestacada = {
  imagen: "https://picsum.photos/seed/laboratorio-tec/1200/600",
  titulo: "Inauguran nuevo laboratorio de innovación tecnológica",
  resumen: "El nuevo laboratorio brindará a los estudiantes herramientas de última tecnología para el desarrollo de proyectos e investigación.",
  contenido: "El nuevo laboratorio brindará a los estudiantes herramientas de última tecnología para el desarrollo de proyectos e investigación. Cuenta con equipos de cómputo de alto rendimiento, impresoras 3D, kits de robótica y espacios de trabajo colaborativo. Se espera que este espacio impulse proyectos de titulación, hackathones internos y colaboraciones con la industria. Las inscripciones para hacer uso del laboratorio estarán disponibles a partir de la próxima semana a través de la coordinación de carrera.",
  tiempo: "Hace 3 horas",
  categoria: "Noticias"
};

const listaImportantes = [
  { tipo: "aviso", titulo: "No habrá clases el viernes 30 de mayo por junta académica", tiempo: "Hace 2 horas" },
  { tipo: "evento", titulo: "Hackathon 2025: competencia de desarrollo", tiempo: "Hace 5 horas" },
  { tipo: "convocatoria", titulo: "Becas de movilidad internacional 2026-1", tiempo: "Hace 1 día" },
  { tipo: "publicacion", titulo: "Nueva revista estudiantil ya disponible", tiempo: "Hace 2 días" }
];

const listaEventos = [
  { dia: "28", mes: "May", titulo: "Hackathon 2025", detalle: "Competencia de desarrollo · Aula Magna · 10:00 AM" },
  { dia: "02", mes: "Jun", titulo: "Conferencia: IA y Futuro", detalle: "Impartida por expertos · Auditorio Central · 05:00 PM" },
  { dia: "05", mes: "Jun", titulo: "Taller de Git y GitHub", detalle: "Aprende control de versiones · Lab. Cómputo 2 · 03:00 PM" }
];

/* Etiquetas visibles según el tipo, para no repetir código */
const etiquetasTipo = {
  aviso: { texto: "Aviso", clase: "etiqueta-aviso" },
  evento: { texto: "Evento", clase: "etiqueta-evento" },
  convocatoria: { texto: "Convocatoria", clase: "etiqueta-convocatoria" },
  publicacion: { texto: "Publicación", clase: "etiqueta-publicacion" }
};

const listaNoticias = [
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

/*  2. FUNCIONES PARA "PINTAR" EL CONTENIDO EN EL HTML */

function pintarHero() {
  const hero = document.getElementById('hero-destacada');
  hero.style.backgroundImage = `url('${noticiaDestacada.imagen}')`;
  hero.innerHTML = `
    <div class="hero-contenido">
      <span class="badge-destacada">Noticia destacada</span>
      <h2>${noticiaDestacada.titulo}</h2>
      <p>${noticiaDestacada.resumen}</p>
      <div class="hero-meta">
        <span>🕒 ${noticiaDestacada.tiempo}</span>
        <a href="#" class="btn-leer-mas" data-tipo="destacada">Leer más →</a>
      </div>
    </div>
  `;
}

function pintarNoticias(lista) {
  const contenedor = document.getElementById('grid-noticias');
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron noticias.</p>";
    return;
  }

  lista.forEach((noticia, indice) => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-noticia';
    tarjeta.innerHTML = `
      <img src="${noticia.imagen}" alt="${noticia.titulo}">
      <div class="tarjeta-noticia-body">
        <span class="categoria" style="color: var(--color-noticia)">${noticia.categoria}</span>
        <h3>${noticia.titulo}</h3>
        <p>${noticia.resumen}</p>
        <div class="tarjeta-noticia-footer">
          <span>${noticia.tiempo}</span>
          <a href="#" class="btn-leer-mas" data-tipo="lista" data-indice="${indice}">Leer más →</a>
        </div>
      </div>
    `;
    contenedor.appendChild(tarjeta);
  });
}

function pintarImportantes() {
  const contenedor = document.getElementById('lista-importantes');
  contenedor.innerHTML = "";

  listaImportantes.forEach(item => {
    const etiqueta = etiquetasTipo[item.tipo];
    const div = document.createElement('div');
    div.className = 'item-importante';
    div.innerHTML = `
      <span class="etiqueta ${etiqueta.clase}">${etiqueta.texto}</span>
      <h4>${item.titulo}</h4>
      <span class="hora">${item.tiempo}</span>
    `;
    contenedor.appendChild(div);
  });
}

function pintarEventos() {
  const contenedor = document.getElementById('lista-eventos');
  contenedor.innerHTML = "";

  listaEventos.forEach(evento => {
    const div = document.createElement('div');
    div.className = 'item-evento';
    div.innerHTML = `
      <div class="fecha-evento">
        <span class="dia">${evento.dia}</span>
        <span class="mes">${evento.mes}</span>
      </div>
      <div>
        <h4>${evento.titulo}</h4>
        <p>${evento.detalle}</p>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

/* 3. MODAL: abrir y cerrar la noticia completa */

function abrirModal(noticia) {
  document.getElementById('modalImagen').style.backgroundImage = `url('${noticia.imagen}')`;
  document.getElementById('modalCategoria').textContent = noticia.categoria;
  document.getElementById('modalCategoria').style.color = "var(--color-noticia)";
  document.getElementById('modalTitulo').textContent = noticia.titulo;
  document.getElementById('modalTiempo').textContent = noticia.tiempo;
  document.getElementById('modalCuerpo').textContent = noticia.contenido;

  document.getElementById('modalFondo').classList.add('abierto');
  document.body.style.overflow = 'hidden'; // evita que la página de fondo haga scroll
}

function cerrarModal() {
  document.getElementById('modalFondo').classList.remove('abierto');
  document.body.style.overflow = '';
}

function activarModal() {
  // Delegamos el evento al documento, así funciona incluso con
  // tarjetas que se vuelven a pintar (por ejemplo al buscar)
  document.addEventListener('click', (evento) => {
    const boton = evento.target.closest('.btn-leer-mas');
    if (!boton) return;

    evento.preventDefault(); // evita que se comporte como hipervínculo

    if (boton.dataset.tipo === 'destacada') {
      abrirModal(noticiaDestacada);
    } else {
      const indice = Number(boton.dataset.indice);
      abrirModal(listaNoticias[indice]);
    }
  });

  document.getElementById('modalCerrar').addEventListener('click', cerrarModal);

  // Cerrar si se hace clic fuera del recuadro (en el fondo oscuro)
  document.getElementById('modalFondo').addEventListener('click', (evento) => {
    if (evento.target.id === 'modalFondo') cerrarModal();
  });

  // Cerrar con la tecla ESC
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') cerrarModal();
  });
}

/* ==========================================================
   4. INTERACTIVIDAD (menú móvil, buscador y navegación)
   ========================================================== */

function activarMenuMovil() {
  const boton = document.getElementById('menuToggle');
  const menu = document.getElementById('navMenu');
  if (!boton || !menu) return; // el header ya no existe en esta página

  boton.addEventListener('click', () => {
    menu.classList.toggle('abierto');
  });
}

function activarBuscador() {
  const input = document.getElementById('buscador');
  if (!input) return; // el buscador estaba en el header, que ya no existe

  input.addEventListener('input', () => {
    const texto = input.value.toLowerCase().trim();

    const resultado = listaNoticias.filter(noticia =>
      noticia.titulo.toLowerCase().includes(texto) ||
      noticia.resumen.toLowerCase().includes(texto)
    );

    pintarNoticias(resultado);
  });
}

function activarNavegacion() {
  const enlaces = document.querySelectorAll('.nav-link');

  enlaces.forEach(enlace => {
    enlace.addEventListener('click', (evento) => {
      evento.preventDefault();
      enlaces.forEach(e => e.classList.remove('active'));
      enlace.classList.add('active');
      // Aquí cada compañero de equipo puede conectar su sección,
      // por ejemplo: si (enlace.dataset.page === "avisos") cargarAvisos();
    });
  });
}

/* 5. INICIALIZACIÓN */

pintarHero();
pintarNoticias(listaNoticias);
pintarImportantes();
pintarEventos();

activarModal();
activarMenuMovil();
activarBuscador();
activarNavegacion();

})(); 