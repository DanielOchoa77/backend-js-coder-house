import { Router } from 'express';
import CartsController from '../../controllers/Carts.controller.js';
import passport from 'passport';
const router = Router();

router.post('/carts', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const result = await CartsController.createCart();
        res.status(result.statusCode).json(result._id ? result.cart : result);
    } catch (error) {
        next(error);
    }
});

router.get('/carts/:cid', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const cid = req.params.cid;
        const result = await CartsController.getProductByCartId(cid);
        res.status(result.statusCode).json(result.product ? result.product : result);
    } catch (error) {
        next(error);
    }
});

router.post('/carts/:cid/product/:pid', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const { body } = req;
        const result = await CartsController.addProductToCart(cid, pid, body);
        res.status(result.statusCode).json(result.product ? result.product : result);
    } catch (error) {
        next(error);
    }
});

router.delete('/carts/:cid/products/:pid', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const result = await CartsController.deleteProduct(cid, pid);
        res.status(result.statusCode).json(result.product ? result.product : result);
    } catch (error) {
        next(error);
    }
});

router.put('/carts/:cid', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { body } = req;
        const result = await CartsController.updateProduct(cid, body);
        res.status(result.statusCode).json(result.product ? result.product : result);
    } catch (error) {
        next(error);
    }
});

router.put('/carts/:cid/product/:pid', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const { body } = req;
        const result = await CartsController.updateQuantityToProduct(cid, pid, body);
        res.status(result.statusCode).json(result.product ? result.product : result);
    } catch (error) {
        next(error);
    }
});

router.delete('/carts/:cid/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const { cid } = req.params;
        const result = await CartsController.deleteAllProductsToCards(cid);
        res.status(result.statusCode).json(result.product ? result.product : result);
    } catch (error) {
        next(error);
    }
});

export default router;