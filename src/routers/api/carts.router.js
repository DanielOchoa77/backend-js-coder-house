import { Router } from 'express';
import CartsManager from '../../dao/Dao/Carts.manager.js';
import passport from 'passport';
const router = Router();

router.post('/carts', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const result = await CartsManager.createCart();
    res.status(result.statusCode).json(result._id ? result.cart : result);
});

router.get('/carts/:cid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const cid = req.params.cid;
    const result = await CartsManager.getProductByCartId(cid);
    res.status(result.statusCode).json(result.product ? result.product : result);
});

router.post('/carts/:cid/product/:pid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { cid, pid } = req.params;
    const { body } = req;
    const result = await CartsManager.addProductToCart(cid, pid, body);
    res.status(result.statusCode).json(result.product ? result.product : result);
});

router.delete('/carts/:cid/products/:pid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { cid, pid } = req.params;
    const result = await CartsManager.deleteProduct(cid, pid);
    res.status(result.statusCode).json(result.product ? result.product : result);
});

router.put('/carts/:cid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { cid } = req.params;
    const { body } = req;
    const result = await CartsManager.updateProduct(cid, body);
    res.status(result.statusCode).json(result.product ? result.product : result);
});

router.put('/carts/:cid/product/:pid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { cid, pid } = req.params;
    const { body } = req;
    const result = await CartsManager.updateQuantityToProduct(cid, pid, body);
    res.status(result.statusCode).json(result.product ? result.product : result);
});

router.delete('/carts/:cid/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { cid } = req.params;
    const result = await CartsManager.deleteAllProductsToCards(cid);
    res.status(result.statusCode).json(result.product ? result.product : result);
});

export default router;