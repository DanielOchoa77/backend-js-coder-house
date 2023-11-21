import { Router } from 'express';
const router = Router();
import {ProductManagers} from '../../dao/Dao/ProductManager.js';
const prodManager = new ProductManagers("./src/products.json");

router.get('/', async (req, res) => {
    const products = await prodManager.getProducts();
    res.render('home', { products });
});

router.get('/realTimeProducts', async (req, res) => {
    const products = await prodManager.getProducts();
    res.render('realTimeProducts');
});

export default router;