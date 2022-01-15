const express = require("express");
const app = express();
const Producto = require("./Producto.js");
let producto = new Producto("./producto.txt");

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", function (err) {
  console.log("Error en el servidor");
});
app.get("/productos", (req, res) => {
  producto.getAll().then((productos) => {
    res.send({ productos });
  });
});
app.get("/productoRandom", (req, res) => {
  producto.getAll().then((productos) => {
    var randomnumber = Math.floor(Math.random() * productos.length);

    res.send({ prudcto: productos[randomnumber] });
  });
});
