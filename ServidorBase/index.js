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
    "noticias"
];

// Rutas dinamicas
app.get("/:pagina", (req, res) => {
    const pagina = req.params.pagina;

    if(paginas.includes(pagina)){
        res.sendFile(path.join(__dirname, "src", "index.html"));
    }else {
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