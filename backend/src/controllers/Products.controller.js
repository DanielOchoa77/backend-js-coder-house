import ProductsService from '../services/Products.service.js';

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
      console.log(error.message);
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
      console.log(error.message);
      return {
        message: "Error find product",
        status: "Error",
        statusCode: 400
      };
    }
  }

  static async create(data) {
    try {
      const findProductByCode = await ProductsService.findByCode(data.code);
      if (findProductByCode) {
        return {
          message: "Not added, because the code is repeated",
          status: "Error",
          statusCode: 404
        };
      } else {
        const product = await ProductsService.create(data);
        console.log(`Product is created successfully (${product._id}).`);
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
      console.log(error.message);
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
      console.log(`Product successfully updated (${id}).`);
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
      console.log(error.message);
      return {
        message: error.message,
        status: "Error",
        statusCode: 400
      };
    }
  }

  static async deleteById(id) {
    try {
      const productDeleteded = await ProductsService.deleteById({ _id: id });
      console.log(`Product successfully deleteded (${id}).`);
      if (productDeleteded && productDeleteded.deletedCount > 0) {
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
    } catch (error) {
      console.log(error.message);
      return {
        message: error.message,
        status: "Error",
        statusCode: 400
      };
    }
  }
}
