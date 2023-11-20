import { Router } from 'express';
import ProductsManager from '../dao/Dao/Products.manager.js';
const router = Router();

router.get('/products', async (req, res) => {
    const { query } = req;
    const { limit } = query;
    const resultado = await ProductsManager.get();
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
    res.status(200).json(await ProductsManager.getById(pid));
});

router.put('/products/:pid', async (req, res) => {
    const {body} = req;
    const pid = req.params.pid;
    res.status(200).json(await ProductsManager.updateById(pid,body));
});

router.post('/products', async (req, res) => {
    const {body} = req;
    res.status(201).json(await ProductsManager.create(body));
});

router.delete('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    res.status(200).json(await ProductsManager.deleteById(pid));
});

export default router;