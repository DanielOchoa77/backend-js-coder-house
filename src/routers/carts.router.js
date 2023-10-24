const { Router } = require("express");
const router = Router();
const CartManagers = require("../CartManager.js");
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
    res.status(201).json(await cartManager.addProductToCart(cid, pid));
});

module.exports = router;