const usuario = document.getElementById("usuario");
const contraseña = document.getElementById("contraseña");
const btnIniciar = document.getElementById("btnIniciar");

btnIniciar.addEventListener("click", async () => {
    const user = usuario.value.trim();
    const pass = contraseña.value.trim();

    if (user === "" || pass === "") {
        alert("Completa todos los campos");
        return;
    }

    try {
        const respuesta = await fetch("/iniciosesion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: user,
                contraseña: pass
            })
        });

        const datos = await respuesta.json();

        if (datos.valido) {
            alert(datos.mensaje);
            console.log("Redirigiendo al inicio")
            window.location.href = "/inicio";
        } else {
            alert(datos.mensaje);
        }
    } catch (error) {
        console.log(error);
        alert("Error al conectar con el servidor");
    }
});