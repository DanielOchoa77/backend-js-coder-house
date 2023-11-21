import { Router } from 'express';
import ProductsManager from '../../dao/Dao/Products.manager.js';
const router = Router();

router.get('/products', async (req, res) => {
    const { query } = req;
    const { limit } = query;
    const result = await ProductsManager.get();
    if (limit) {
        res.status(result.statusCode).json(result.products ? result.products.slice(0, limit) : result);
    } else {
        res.status(result.statusCode).json(result.products ? result.products : result);
    }
});

router.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const result = await ProductsManager.getById(pid);
    res.status(result.statusCode).json(result.product ? result.product : result);
});

router.put('/products/:pid', async (req, res) => {
    const { body } = req;
    const pid = req.params.pid;
    const result = await ProductsManager.updateById(pid, body);
    res.status(result.statusCode).json(result);
});

router.post('/products', async (req, res) => {
    const { body } = req;
    const result = await ProductsManager.create(body);
    res.status(result.statusCode).json(result.product ? result.product : result);
});

router.delete('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const result = await ProductsManager.deleteById(pid);
    res.status(result.statusCode).json(result.product ? result.product : result);
});

export default router;