import { Router } from 'express';
const router = Router();
import ProductsManager from '../../dao/Dao/Products.manager.js';
import CartsManager from '../../dao/Dao/Carts.manager.js';
import { buildResponsePaginatedHome } from '../../utils.js';


router.get('/products', async (req, res) => {
    const { limit = 10, page = 1, sort, search } = req.query;
    const criteria = {};
    const options = { limit, page };
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const { user } = req.session;

    if (sort) {
        options.sort = { price: sort };
    }
    if (search) {
        criteria.category = search;
    }
    const result = await ProductsManager.get(criteria, options);
    const data = buildResponsePaginatedHome({ ...result.products, sort, search });
    res.render('products', { ...data, userSession: user });
});

router.get('/carts/:cid', async (req, res) => {
    const cid = req.params.cid;
    const result = await CartsManager.getProductByCartId(cid);
    res.render('carts', { cart: cid, result: result.product.map((prod) => prod.toJSON()) });
});


export default router;