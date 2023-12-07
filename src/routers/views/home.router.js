import { Router } from 'express';
const router = Router();
import { ProductManagers } from '../../dao/Dao/ProductManager.js';
const prodManager = new ProductManagers("./src/products.json");
    
router.get('/', async (req, res) => {
    res.render('login', { title: 'Hello People 🖐️' });
});


router.get('/realTimeProducts', async (req, res) => {
    const products = await prodManager.getProducts();
    res.render('realTimeProducts');
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Hello People 🖐️' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Hello People 🖐️' });
});

export default router;