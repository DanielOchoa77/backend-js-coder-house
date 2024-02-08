import CartModel from '../models/cart.model.js';
import ProductsController from '../../controllers/Products.controller.js';

export default class CartsController {
  static async get() {

    try {
      const cartsList = await CartModel.find();
      if (cartsList) {
        return {
          carts: cartsList,
          message: "Cart found",
          status: "Success",
          statusCode: 200
        };
      } else {
        return {
          message: "Carts not Found",
          status: "Error",
          statusCode: 404
        };
      }
    } catch (error) {
      logger.error(error.message);
      return {
        message: "Error find Carts",
        status: "Error",
        statusCode: 400
      };
    }
  }

  static async createCart() {
    try {
      const data = {
        products: []
      }
      const cart = await CartModel.create(data);
      logger.info(`Cart was created successfully (${cart._id}).`);
      if (cart) {
        return {
          cart: cart,
          message: "Cart was created successfully",
          status: "Success",
          statusCode: 201
        };
      }
    } catch (error) {
      logger.error(error.message);
      return {
        message: error.message,
        status: "Error",
        statusCode: 400
      };
    }
  }

  static async getProductByCartId(id) {
    try {
      const cart = await CartModel.findById(id).populate('products.product');
      if (cart) {
        return {
          product: cart.products,
          message: "Cart found",
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
    } catch (error) {
      logger.error(error.message);
      return {
        message: "Error find Cart",
        status: "Error",
        statusCode: 400
      };
    }
  }

  static async addProductToCart(cid, pid, body) {
    try {
      const productExist = await ProductsController.getById(pid);
      if (productExist.product) {
        const { quantity } = body;
        const cartExists = await CartModel.findById(cid);
        if (cartExists) {
          const productExistInCart = await CartModel.find(
            { $and: [{ '_id': cid }, { 'products.product': pid }] }, { "products.$": true }
          );
          if (productExistInCart && productExistInCart.length > 0) {
            cartExists.products.forEach(prod => {
              if (prod.product.toString() === pid) {
                prod.quantity += quantity;
              }
            });
            const updateProd = { 'products': cartExists.products };
            const updateQuantity = await CartModel.updateOne({ _id: cid }, { $set: updateProd });
            return {
              cart: updateQuantity,
              message: "Product is updated successfully",
              status: "Success",
              statusCode: 200
            };
          } else {
            const productNew = {
              product: pid,
              quantity: quantity
            }
            const updateQuantity = await CartModel.updateOne({ _id: cid }, { $push: { products: productNew } });
            return {
              cart: updateQuantity,
              message: "Product is added successfully",
              status: "Success",
              statusCode: 200
            };
          }
        } else {
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
    } catch (error) {
      logger.error(error.message);
      return {
        message: "Error add product to cart",
        status: "Error",
        statusCode: 400
      };
    }
  }

  static async deleteProduct(cid, pid) {
    try {
      const cartExists = await CartModel.findById(cid);
      if (cartExists) {
        const productExistInCart = await CartModel.find(
          { $and: [{ '_id': cid }, { 'products.product': pid }] }, { "products.$": true }
        );
        if (productExistInCart && productExistInCart.length > 0) {
          const productsUpdateInCarrito = cartExists.products.filter(prod => prod.product.toString() !== pid);
          const updateProd = { 'products': productsUpdateInCarrito };
          const updateProduct = await CartModel.updateOne({ _id: cid }, { $set: updateProd });
          return {
            cart: updateProduct,
            message: "Product successfully deleteded",
            status: "Success",
            statusCode: 200
          };
        } else {
          return {
            message: "Product not Found",
            status: "Success",
            statusCode: 200
          };
        }
      } else {
        return {
          message: "Cart not Found",
          status: "Error",
          statusCode: 404
        };
      }
    } catch (error) {
      logger.error(error.message);
      return {
        message: "Error find Cart",
        status: "Error",
        statusCode: 400
      };
    }
  }

  static async updateProduct(cid, body) {
    try {
      const updateProduct = await CartModel.updateOne({ _id: cid }, { $set: { 'products': body } });
      return {
        cart: updateProduct,
        message: "Product is updated successfully",
        status: "Success",
        statusCode: 200
      };
    } catch (error) {
      logger.error(error.message);
      return {
        message: "Error add product to cart",
        status: "Error",
        statusCode: 400
      };
    }
  }


  static async updateQuantityToProduct(cid, pid, body) {
    try {
      const productExist = await ProductsController.getById(pid);
      if (productExist.product) {
        const { quantity } = body;
        const cartExists = await CartModel.findById(cid);
        if (cartExists) {
          const productExistInCart = await CartModel.find(
            { $and: [{ '_id': cid }, { 'products.product': pid }] }, { "products.$": true }
          );
          if (productExistInCart && productExistInCart.length > 0) {
            const updateQuantity = await CartModel.updateOne({ $and: [{ '_id': cid }, { 'products.product': pid }] }, { $set: { 'products.$.quantity': quantity } });
            return {
              cart: updateQuantity,
              message: "Product is updated successfully",
              status: "Success",
              statusCode: 200
            };
          }
        } else {
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
    } catch (error) {
      logger.error(error.message);
      return {
        message: "Error add product to cart",
        status: "Error",
        statusCode: 400
      };
    }
  }

  static async deleteAllProductsToCards(cid) {
    try {
      const updateProduct = await CartModel.updateOne({ _id: cid }, { $set: { 'products': [] } });
      return {
        cart: updateProduct,
        message: "Product is updated successfully",
        status: "Success",
        statusCode: 200
      };
    } catch (error) {
      logger.error(error.message);
      return {
        message: "Error add product to cart",
        status: "Error",
        statusCode: 400
      };
    }
  }
}
