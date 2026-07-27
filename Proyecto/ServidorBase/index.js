const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const path = require("path");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const PORT = 3000;

app.use(express.static(path.join(__dirname, "..")));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});