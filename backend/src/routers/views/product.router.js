import { Router } from 'express';
const router = Router();
import ProductsController from '../../controllers/Products.controller.js';
import CartsController from '../../controllers/Carts.controller.js';
import { buildResponsePaginatedHome, generateProduct } from '../../utils/utils.js';
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
        _id,
        first_name,
        last_name,
        email,
        age,
        role,
    } = userSearch;

    const user = {
        _id,
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
    const rolAdmin = user.role == 'admin';
    const result = await ProductsController.get(criteria, options);
    const data = buildResponsePaginatedHome({ ...result.products, sort, search });
    res.render('products', { ...data, userSession: user, rolAdmin: rolAdmin});
});

router.get('/carts/:cid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const cid = req.params.cid;
    const result = await CartsController.getProductByCartId(cid);
    res.render('carts', { cart: cid, result: result.product.map((prod) => prod.toJSON()) });
});

router.get('/api/mokingproducts', (req, res) => {
    const products = [];
    for (let index = 0; index < 100; index++) {
      products.push(generateProduct());
    }
    res.status(200).json(products);
  });

export default router;