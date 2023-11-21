import { Router } from 'express';
import CartsManager from '../../dao/Dao/Carts.manager.js';
const router = Router();

router.post('/carts', async (req, res) => {
    const result = await CartsManager.createCart();
    res.status(result.statusCode).json(result._id ? result.cart : result);
});

router.get('/carts/:cid', async (req, res) => {
    const cid = req.params.cid;
    const result = await CartsManager.getProductByCartId(cid);
    res.status(result.statusCode).json(result.product ? result.product : result);
});

router.post('/carts/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const {body} = req;
    const result = await CartsManager.addProductToCart(cid, pid, body);
    res.status(result.statusCode).json(result.product ? result.product : result);
});

export default router;