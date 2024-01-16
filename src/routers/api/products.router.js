import { Router } from 'express';
import ProductsController from '../../controllers/Products.controller.js';
import { buildResponsePaginated } from '../../utils.js';
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

router.get('/products', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { limit = 10, page = 1, sort, search } = req.query;
    const criteria = {};
    const options = { limit, page };
    if (sort) {
        options.sort = { price: sort };
    }
    if (search) {
        criteria.category = search;
    }
    console.log(criteria);
    const result = await ProductsController.get(criteria, options);
    res.status(result.statusCode).json(result.products ? buildResponsePaginated({ ...result.products, sort, search }) : result);
});

router.get('/products/:pid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const pid = req.params.pid;
    const result = await ProductsController.getById(pid);
    res.status(result.statusCode).json(result.product ? result.product : result);
});

router.put('/products/:pid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { body } = req;
    const pid = req.params.pid;
    const result = await ProductsController.updateById(pid, body);
    res.status(result.statusCode).json(result);
});

router.post('/products', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { body } = req;
    const result = await ProductsController.create(body);
    res.status(result.statusCode).json(result.product ? result.product : result);
});

router.delete('/products/:pid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const pid = req.params.pid;
    const result = await ProductsController.deleteById(pid);
    res.status(result.statusCode).json(result.product ? result.product : result);
});

export default router;