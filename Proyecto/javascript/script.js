async function cargarPagina(nombre) {

    try {

        const respuesta = await fetch(`contenido/${nombre}.html`);

        if (!respuesta.ok) {
            throw new Error("No existe el archivo.");
        }

        const html = await respuesta.text();

        document.getElementById("mainContent").innerHTML = html;

    } catch (error) {

        console.error(error);

        document.getElementById("mainContent").innerHTML =
        "<h2>Error al cargar la página.</h2>";

    }

}

cargarPagina("inicio");

