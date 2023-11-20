import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import {ProductManagers} from './ProductManager.js';
const prodManager = new ProductManagers("./src/products.json");

export class CartManagers {

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
                const productFind = products.find((prd) => prd.id === prod.product);
                if (productFind) {
                    cartProducts.push({
                        ...productFind,
                        quantity: prod.quantity
                    });
                }
            });
            return cartProducts;
        }
        return {
            message: "Cart not Found",
            status: "Error",
            statusCode: 404
        };
    }

    async getCartById(id) {
        const carts = await getFromFile(this.path);
        const cartFind = carts.find((cart) => cart.id === id);
        return cartFind || {
            message: "Cart not Found",
            status: "Error",
            statusCode: 404
        };
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
        const products = await prodManager.getProducts();
        const productFind = products.some((prd) => prd.id === pid);
        if (productFind) {
            const { quantity } = body;
            const carts = await getFromFile(this.path);
            const cartExists = carts.find(cart => cart.id === cid);
            if (cartExists) {
                let validacion = cartExists.products.some(prod => prod.product === pid);
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
                    return {
                        message: "Product is added successfully",
                        status: "Success",
                        statusCode: 200
                    };
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
                    return {
                        message: "Product is added successfully",
                        status: "Success",
                        statusCode: 200
                    };
                }
            }else{
                return {
                    message: "Cart not Found",
                    status: "Error",
                    statusCode: 404
                };
            }
        } else {
            return {
                message: "Product not Found",
                status: "Error",
                statusCode: 404
            };
        }

    }

    async updateCarts(id, data) {
        const { products } = data;
        const carts = await getFromFile(this.path);
        const position = carts.findIndex((cart) => cart.id === id);
        if (position === -1) {
            return {
                message: "Cart not Found",
                status: "Error",
                statusCode: 404
            };
        }

        if (products) {
            carts[position].products = products;
        }

        await saveInFile(this.path, products);
        return {
            message: "Cart successfully updated",
            status: "Success",
            statusCode: 200
        };
    }

    async deleteProduct(id) {
        const carts = await getFromFile(this.path);
        const cartsFind = carts.find((cart) => cart.id === id);
        if (cartsFind) {
            const cartSave = carts.filter((prod) => prod.id != id);
            await saveInFile(this.path, cartSave);
            return {
                message: "Cart successfully deleteded",
                status: "Success",
                statusCode: 200
            };
        } else {
            return {
                message: "Cart not Found",
                status: "Error",
                statusCode: 404
            };
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