import express from "express";
import { ProductManagers } from "./ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

const prodManager = new ProductManagers("./products.json");

app.get('/products', async (req, res) => {
    const { query } = req;
    const { limit } = query;
    const resultado = await prodManager.getProducts();
    if (limit) {
        if (resultado) {
            res.send(resultado.slice(0, limit));
        }
    } else {
        res.send(resultado);
    }
});

app.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    res.send(await prodManager.getProductById(parseInt(pid)));
});

app.listen(8080, () => {
    console.log('Servidor http escuchando en el puerto 8080.')
})