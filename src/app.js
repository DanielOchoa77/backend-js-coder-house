const express = require("express");
const productRouter = require("./routers/products.router.js");
const cartRouter = require("./routers/carts.router.js");
const path = require("path");

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, '../public')));

app.use('/api', productRouter, cartRouter);

app.listen(PORT, () => {
    console.log('Servidor http escuchando en el puerto ', PORT);
})