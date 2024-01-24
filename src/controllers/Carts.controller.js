import CartsService from '../services/Carts.service.js';
import ProductsController from './Products.controller.js';

export default class CartsController {
  static async get() {

    try {
      const cartsList = await CartsService.getAll();
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
      console.log(error.message);
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
      const cart = await CartsService.create(data);
      console.log(`Cart was created successfully (${cart._id}).`);
      if (cart) {
        return {
          cart: cart,
          message: "Cart was created successfully",
          status: "Success",
          statusCode: 201
        };
      }
    } catch (error) {
      console.log(error.message);
      return {
        message: error.message,
        status: "Error",
        statusCode: 400
      };
    }
  }

  static async getProductByCartId(id) {
    try {
      const cart = await CartsService.findById(id).populate('products.product');
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
      console.log(error.message);
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
        const cartExists = await CartsService.findById(cid);
        if (cartExists) {
          const productExistInCart = await CartsService.findByIdAndProductId(cid, pid);
          if (productExistInCart && productExistInCart.length > 0) {
            cartExists.products.forEach(prod => {
              if (prod.product.toString() === pid) {
                prod.quantity += quantity;
              }
            });
            const updateProd = { 'products': cartExists.products };
            const updateQuantity = await CartsService.updateById(cid, updateProd);
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
            const updateQuantity = await CartsService.updateById(cid, { products: productNew });
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
      console.log(error.message);
      return {
        message: "Error add product to cart",
        status: "Error",
        statusCode: 400
      };
    }
  }

  static async deleteProduct(cid, pid) {
    try {
      const cartExists = await CartsService.findById(cid);
      if (cartExists) {
        const productExistInCart = await CartsService.findByIdAndProductId(cid, pid);
        if (productExistInCart && productExistInCart.length > 0) {
          const productsUpdateInCarrito = cartExists.products.filter(prod => prod.product.toString() !== pid);
          const updateProd = { 'products': productsUpdateInCarrito };
          const updateProduct = await CartsService.updateById(cid, updateProd);
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
      console.log(error.message);
      return {
        message: "Error find Cart",
        status: "Error",
        statusCode: 400
      };
    }
  }

  static async updateProduct(cid, body) {
    try {
      const updateProduct = await CartsService.updateByIdPush(cid, { 'products': body });
      return {
        cart: updateProduct,
        message: "Product is updated successfully",
        status: "Success",
        statusCode: 200
      };
    } catch (error) {
      console.log(error.message);
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
        const cartExists = await CartsService.findById(cid);
        if (cartExists) {
          const productExistInCart = await CartsService.findByIdAndProductId(cid, pid);
          if (productExistInCart && productExistInCart.length > 0) {
            const updateQuantity = await CartsService.updateByIdAndProductIdAndQuantity(cid, pid, quantity);
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
      console.log(error.message);
      return {
        message: "Error add product to cart",
        status: "Error",
        statusCode: 400
      };
    }
  }

  static async deleteAllProductsToCards(cid) {
    try {
      const updateProduct = await CartsService.updateByIdSet(id, { 'products': [] } );
      return {
        cart: updateProduct,
        message: "Product is updated successfully",
        status: "Success",
        statusCode: 200
      };
    } catch (error) {
      console.log(error.message);
      return {
        message: "Error add product to cart",
        status: "Error",
        statusCode: 400
      };
    }
  }
}