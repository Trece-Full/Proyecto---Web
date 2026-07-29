async function cargarPagina(nombre) {

    try {

        const respuesta = await fetch(`contenido/${nombre}.html`);

        if (!respuesta.ok) {
            throw new Error("No existe el archivo.");
        }

        const html = await respuesta.text();

        const contenedor = document.getElementById("mainContent");
        contenedor.innerHTML = html;

        document.querySelectorAll('script[data-seccion-dinamica]').forEach(s => s.remove());

        const scriptsViejos = contenedor.querySelectorAll("script");

        scriptsViejos.forEach(scriptViejo => {
            const scriptNuevo = document.createElement("script");

            for (const atributo of scriptViejo.attributes) {
                scriptNuevo.setAttribute(atributo.name, atributo.value);
            }

            scriptNuevo.textContent = scriptViejo.textContent;

            scriptNuevo.setAttribute('data-seccion-dinamica', 'true');

            scriptViejo.remove();
            document.body.appendChild(scriptNuevo);
        });

    } catch (error) {

        console.error(error);

        document.getElementById("mainContent").innerHTML =
        "<h2>Error al cargar la página.</h2>";

    }

}
// Checando rutas
function navegar(pagina){
    event.preventDefault();
    history.pushState(
        {},
        "",
        "/" + pagina
    );

    cargarPagina(pagina);

}

function cargarRutaActual(){
    let ruta = window.location.pathname;

    if(ruta === "/"){
        cargarPagina("inicio");
    }else{
        let pagina = ruta.substring(1);
        cargarPagina(pagina);
    }
}

cargarRutaActual();
actualizarFecha();

window.addEventListener("popstate", () =>{
    cargarRutaActual();
});
//cargarPagina("inicio");

//FUNCIÓN PARA ACTUALIZAR FECHA
function actualizarFecha() {

    const fecha = new Date();

    const opciones = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    let texto = fecha.toLocaleDateString("es-MX", opciones);

    texto = texto.charAt(0).toUpperCase() + texto.slice(1);

    document.getElementById("fecha-header").textContent = texto;
}
