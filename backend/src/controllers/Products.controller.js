import ProductsService from '../services/Products.service.js';
import { logger } from '../config/logger.js';
import EmailService from '../services/email.service.js';
import UsersController from '../controllers/Users.controller.js';

export default class ProductsController {

  static async get(criteria, options) {
    try {
      const productsList = await ProductsService.getPaginate(criteria, options);
      if (productsList) {
        return {
          products: productsList,
          message: "Product found",
          status: "Success",
          statusCode: 200
        };
      } else {
        return {
          message: "Products not Found",
          status: "Error",
          statusCode: 404
        };
      }

    } catch (error) {
      logger.error(error.message);
      return {
        message: "Error find products",
        status: "Error",
        statusCode: 400
      };
    }
  }
  /*static async get() {

    try {
      const productsList = await ProductModel.find();
      console.log(productsList);
      if (productsList) {
        return {
          products: productsList,
          message: "Product found",
          status: "Success",
          statusCode: 200
        };
      } else {
        return {
          message: "Products not Found",
          status: "Error",
          statusCode: 404
        };
      }
    } catch (error) {
      console.log(error.message);
      return {
        message: "Error find products",
        status: "Error",
        statusCode: 400
      };
    }
  }*/

  static async getById(id) {
    try {
      const product = await ProductsService.findById(id);
      if (product) {
        return {
          product: product,
          message: "Product found",
          status: "Success",
          statusCode: 200
        };
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
        message: "Error find product",
        status: "Error",
        statusCode: 400
      };
    }
  }

  static async create(data, user) {
    try {
      console.log(data.code);
      const findProductByCode = await ProductsService.findByCode(data.code);
      if (findProductByCode) {
        return {
          message: "Not added, because the code is repeated",
          status: "Error",
          statusCode: 404
        };
      } else {
        data.owner = user.role === 'premium' ? user.id : 'admin';

        const product = await ProductsService.create(data);
        logger.info(`Product is created successfully (${product._id}).`);
        if (product) {
          return {
            product: product,
            message: "Product is created successfully",
            status: "Success",
            statusCode: 200
          };
        } else {
          return {
            message: "Product not Found",
            status: "Error",
            statusCode: 404
          };
        }
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

  static async updateById(id, data) {
    try {
      const productUpdated = await ProductsService.updateById(id, data);
      logger.info(`Product successfully updated (${id}).`);
      if (productUpdated && productUpdated.modifiedCount > 0) {
        return {
          message: "Product successfully updated",
          status: "Success",
          statusCode: 202
        };
      } else {
        return {
          message: "Product not updated",
          status: "Error",
          statusCode: 404
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

  static async deleteById(id, user) {
    try {
      const product = await ProductsService.findById(id);
      if (product) {
        if (user.role === "admin" || (user.role === 'premium' && product.owner === user.id)) {
          const productDeleteded = await ProductsService.deleteById({ _id: id });
          logger.info(`Product successfully deleteded (${id}).`);

          if (productDeleteded && productDeleteded.deletedCount > 0) {
            if (product.owner != 'admin') {
              const userRol = await UsersController.getUserById(product.owner);
              if (userRol.role === 'premium') {
                const emailService = EmailService.getInstance();
                await emailService.sendEmail(
                  user.email,
                  `Hola, ${user.first_name}`,
                  `<div>
                      <h1>El siguiente producto -> ${product.title} ha sido eliminado</h1>
                    </div>`
                );
              }
            }

            return {
              message: "Product successfully deleteded",
              status: "Success",
              statusCode: 200
            };
          } else {
            return {
              message: "Product not deleteded",
              status: "Error",
              statusCode: 404
            };
          }
        } return {
          message: "No se puede eliminar un producto del cual no es propietario ",
          status: "Error",
          statusCode: 400
        };
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
        message: error.message,
        status: "Error",
        statusCode: 400
      };
    }
  }
}
