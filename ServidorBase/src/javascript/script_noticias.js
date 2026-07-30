(() =>{
  const API_URL = "https://proyecto-web-rose.vercel.app/api/noticias"

/* 1. DATOS */

let hero = {};

let noticias = [];

/*  2. FUNCIONES PARA "PINTAR" EL CONTENIDO EN EL HTML */


async function cargarNoticias(){

    const respuesta = await fetch(API_URL);

    const datos = await respuesta.json();

    hero = datos.hero;

    noticias = datos.noticias;

    pintarHero();

    pintarNoticias();

    activarModal();

}

function pintarHero() {
  const heroe = document.getElementById('hero-destacada');
  heroe.style.backgroundImage = `url('${hero.imagen}')`;
  heroe.innerHTML = `
    <div class="hero-contenido">
      <span class="badge-destacada">Noticia destacada</span>
      <h2>${hero.titulo}</h2>
      <p>${hero.resumen}</p>
      <div class="hero-meta">
        <span>🕒 ${hero.tiempo}</span>
        <a href="#" class="btn-leer-mas" data-tipo="destacada">Leer más →</a>
      </div>
    </div>
  `;
}

function pintarNoticias() {
  const contenedor = document.getElementById('grid-noticias');
  contenedor.innerHTML = "";

  if (noticias.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron noticias.</p>";
    return;
  }

  noticias.forEach((noticia, indice) => {
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
      abrirModal(hero);
    } else {
      const indice = Number(boton.dataset.indice);
      abrirModal(noticias[indice]);
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

/* 4. INICIALIZACIÓN */
async function init(){
  await cargarNoticias();
}

init();
})();