const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const ProductManagers = require("./ProductManager.js");
const prodManager = new ProductManagers("./src/products.json");

class CartManagers {

    constructor(path) {
        this.path = path;
    }

    getCarts() {
        return getFromFile(this.path);
    }

    async getProductByCartId(id) {
        const carts = await getFromFile(this.path);
        const products = await prodManager.getProducts();
        const cartFind = carts.find((cart) => cart.id === id);
        const cartProducts = [];
        if (cartFind) {
            cartFind.products.forEach(prod => {
                const productFind = products.find((prd)=> prd.id === prod.product);
                if(productFind){
                    cartProducts.push({
                        ...productFind,
                        quantity: prod.quantity
                    });
                }    
            });
            return cartProducts;
        }
        return "Cart not Found";
    }

    async getCartById(id) {
        const carts = await getFromFile(this.path);
        const cartFind = carts.find((cart) => cart.id === id);
        return cartFind || "Cart not Found";
    }

    async createCart() {
        const carts = await getFromFile(this.path);
        console.log(carts);
        const cart = {
            id: uuidv4(),
            products: []
        }
        carts.push(cart);
        console.log(carts);
        await saveInFile(this.path, carts);
        console.log("Cart was created successfully");
        return cart;
    }

    async addProductToCart(cid, pid, body) {
        const { quantity } = body;
        const carts = await getFromFile(this.path);
        let validacion = this.validarProducto(cid, pid, carts);
        if (validacion) {
            carts.forEach(cart => {
                if (cart.id === cid) {
                    cart.products.forEach(prod => {
                        if (prod.product === pid) {
                            prod.quantity += quantity;
                        }
                    });
                }
            });
            await saveInFile(this.path, carts);
            console.log("Product is added successfully");
        } else {
            const productNew = {
                product: pid,
                quantity: quantity
            }
            carts.forEach(cart => {
                if (cart.id === cid) {
                    cart.products.push(productNew);
                }
            });
            await saveInFile(this.path, carts);
            console.log("Product is added successfully");
        }
    }

    async updateCarts(id, data) {
        const { products } = data;
        const carts = await getFromFile(this.path);
        const position = carts.findIndex((cart) => cart.id === id);
        if (position === -1) {
            throw new Error("Cart not Found");
        }

        if (products) {
            carts[position].products = products;
        }

        await saveInFile(this.path, products);

        console.log("Cart successfully updated")

    }

    async deleteProduct(id) {
        const carts = await getFromFile(this.path);
        const cartsFind = carts.find((cart) => cart.id === id);
        if (cartsFind) {
            const cartSave = carts.filter((prod) => prod.id != id);
            await saveInFile(this.path, cartSave);
            console.log("Cart successfully deleteded");
        } else {
            throw new Error("Cart not Found");
        }
    }

    validarProducto(idCart, idProduct, carts) {
        const cartExists = carts.find(cart => cart.id === idCart);
        if (cartExists) {
            return cartExists.products.some(prod => prod.product === idProduct);
        } else {
            throw new Error("Cart not Found");
        }
    }
}

const getFromFile = async (path) => {
    if (!fs.existsSync(path)) {
        return [];
    }
    const content = await fs.promises.readFile(path, 'utf-8');
    return JSON.parse(content);
}

const saveInFile = async (path, data) => {
    const content = JSON.stringify(data, null, '\t');
    await fs.promises.writeFile(path, content, 'utf-8');
}

module.exports = CartManagers;