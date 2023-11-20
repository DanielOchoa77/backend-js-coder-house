import { Router } from 'express';
const router = Router();
import {CartManagers} from '../dao/Dao/CartManager.js';
const cartManager = new CartManagers("./src/carts.json");

router.post('/carts', async (req, res) => {
    res.status(201).json(await cartManager.createCart());
});

router.get('/carts/:cid', async (req, res) => {
    const cid = req.params.cid;
    res.status(200).json(await cartManager.getProductByCartId(cid));
});

router.post('/carts/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const {body} = req;
    res.status(201).json(await cartManager.addProductToCart(cid, pid, body));
});

export default router;