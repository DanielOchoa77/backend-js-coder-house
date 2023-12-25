import { Router } from 'express';
const router = Router();
import ProductsManager from '../../dao/Dao/Products.manager.js';
import CartsManager from '../../dao/Dao/Carts.manager.js';
import { buildResponsePaginatedHome } from '../../utils.js';
import UserModel from '../../dao/models/user.model.js';
import passport from 'passport';


router.get('/products', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { limit = 10, page = 1, sort, search } = req.query;
    const criteria = {};
    const options = { limit, page };
    const userSearch = await UserModel.findById(req.user.id);

    if (!userSearch) {
        return res.redirect('/login');
    }

    let {
        first_name,
        last_name,
        email,
        age,
        role,
    } = userSearch;

    const user = {
        first_name,
        last_name,
        email,
        age,
        role,
    };

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

router.get('/carts/:cid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const cid = req.params.cid;
    const result = await CartsManager.getProductByCartId(cid);
    res.render('carts', { cart: cid, result: result.product.map((prod) => prod.toJSON()) });
});


export default router;