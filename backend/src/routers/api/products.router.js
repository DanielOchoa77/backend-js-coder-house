import { Router } from 'express';
import ProductsController from '../../controllers/Products.controller.js';
import { buildResponsePaginated, authMiddleware } from '../../utils/utils.js';
import passport from 'passport';
const router = Router();

/*router.get('/products', async (req, res) => {
    const { query } = req;
    const { limit } = query;
    const result = await ProductsController.get();
    if (limit) {
        res.status(result.statusCode).json(result.products ? result.products.slice(0, limit) : result);
    } else {
        res.status(result.statusCode).json(result.products ? result.products : result);
    }
});*/

router.get('/products', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const { limit = 10, page = 1, sort, search } = req.query;
        const criteria = {};
        const options = { limit, page };
        if (sort) {
            options.sort = { price: sort };
        }
        if (search) {
            criteria.category = search;
        }
        const result = await ProductsController.get(criteria, options);
        res.status(result.statusCode).json(result.products ? buildResponsePaginated({ ...result.products, sort, search }) : result);
    } catch (error) {
        next(error);
    }
});

router.get('/products/:pid', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const pid = req.params.pid;
        const result = await ProductsController.getById(pid);
        res.status(result.statusCode).json(result.product ? result.product : result);
    } catch (error) {
        next(error);
    }
});

router.put('/products/:pid', passport.authenticate('jwt', { session: false }), authMiddleware('admin'), async (req, res, next) => {
    try {
        const { body } = req;
        const pid = req.params.pid;
        const result = await ProductsController.updateById(pid, body);
        res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
});

router.post('/products', passport.authenticate('jwt', { session: false }), authMiddleware(['user','premium']), async (req, res, next) => {
    try {
        const { body, user } = req;
        const result = await ProductsController.create(body,user);
        res.status(result.statusCode).json(result.product ? result.product : result);
    } catch (error) {
        next(error);
    }
});

router.delete('/products/:pid', passport.authenticate('jwt', { session: false }), authMiddleware(['admin','premium']), async (req, res) => {
    try {
        const pid = req.params.pid;
        const {user} = req;
        const result = await ProductsController.deleteById(pid,user);
        res.status(result.statusCode).json(result.product ? result.product : result);
    } catch (error) {
        next(error);
    }
});

export default router;