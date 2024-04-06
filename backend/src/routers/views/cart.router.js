import { Router } from 'express';
const router = Router();
import passport from 'passport';
import CartsController from '../../controllers/Carts.controller.js';
import UsersController from '../../controllers/Users.controller.js';
import { authMiddleware } from '../../utils/utils.js';


router.get('/carts/product/:pid', passport.authenticate('jwt', { session: false }), authMiddleware(['premium', 'user', 'admin']), async (req, res, next) => {
  try {
    const { pid } = req.params;
    const { user } = req;
    const userActual = await UsersController.getUserById(user.id);
    const body = { quantity: 1 };
    let result = {};

    if (userActual.cartId.length > 0) {
      const lastCart = userActual.cartId[userActual.cartId.length - 1];
      result = await CartsController.addProductToCart(lastCart.cartId, pid, body, userActual);
    } else {
      const cartId = await CartsController.createCart(userActual.id);
      result = await CartsController.addProductToCart(cartId.cart._id, pid, body, userActual);
    }

    res.status(200)
      .render('productInfo', { messageInfo: result.message });
  } catch (error) {
    next(error);
    res.render('error', { title: 'error 🖐️', messageError: error });
  }
});


router.get('/carts', passport.authenticate('jwt', { session: false }), authMiddleware(['premium', 'user', 'admin']), async (req, res, next) => {
  try {
    const { user } = req;
    const userSearch = await UsersController.getUserById(user.id);
    let result = {};
    let idCart = "Vacio";
    let comprarBolean = false;

    let {
      _id,
      first_name,
      last_name,
      email,
      age,
      role,
    } = userSearch;

    const userCart = {
      _id,
      first_name,
      last_name,
      email,
      age,
      role,
    };


    if (userSearch.cartId.length > 0) {
      const lastCart = userSearch.cartId[userSearch.cartId.length - 1];
      let products = await CartsController.getProductByCartId(lastCart.cartId);
      idCart = lastCart.cartId;
      comprarBolean = true;
      result = products.product.map((prod) => prod.toJSON())
      res.render('carts', { result, userSession: userCart, cart: idCart, comprarBolean });
    }
    res.render('carts', { result, userSession: userCart, cart: idCart, comprarBolean });

  } catch (error) {
    next(error);
    res.render('error', { title: 'error 🖐️', messageError: error });
  }
});

router.get('/carts/:cid/purchaser', passport.authenticate('jwt', { session: false }), authMiddleware('user'), async (req, res, next) => {
  try {
    const ticket = await CartsController.executePurchase(req);
    res.status(200)
    .render('productInfo', { messageInfo: ticket.message });
  } catch (error) {
    next(error);
    res.render('error', { title: 'error 🖐️', messageError: error });
  }
});



export default router;