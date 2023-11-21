import { Router } from 'express';
const router = Router();
import { ProductManagers } from '../ProductManager.js';
const prodManager = new ProductManagers("./src/products.json");

router.get('/products', async (req, res) => {
    const { query } = req;
    const { limit } = query;
    const resultado = await prodManager.getProducts();
    if (limit) {
        if (resultado) {
            res.status(200).json(resultado.slice(0, limit));
        }
    } else {
        res.status(200).json(resultado);
    }
});

router.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    res.status(200).json(await prodManager.getProductById(pid));
});
router.put('/products/:pid', async (req, res) => {
    const { body } = req;
    const pid = req.params.pid;
    res.status(200).json(await prodManager.updateProducts(pid, body));
});
router.post('/products', async (req, res) => {
    const { body } = req;
    res.status(201).json(await prodManager.addProduct(body));
});
router.delete('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    res.status(200).json(await prodManager.deleteProduct(pid));
});

export default router;