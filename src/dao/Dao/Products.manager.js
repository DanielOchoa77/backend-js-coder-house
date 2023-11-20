import ProductModel from '../models/product.model.js';

export default class ProductsManager {
  static get() {
    return ProductModel.find();
  }
  
  static async getById(sid) {
    const product = await ProductModel.findById(sid);
    return product || {
      message: "Product not Found",
      status: "Error",
      statusCode: 404
    };

  }
  static async create(data) {
    const { title, description, price, thumbnail, code, stock, status, category } = data;
    const findProductByCode = await ProductModel.findOne({ 'code': code });
    if (findProductByCode) {
      return {
        message: "Not added, because the code is repeated",
        status: "Error",
        statusCode: 404
      };
    } else if ((!title || !description || !price || !code || !stock || !category === undefined) && status != null) {
      return {
        message: "All fields are required",
        status: "Error",
        statusCode: 404
      };
    } else {
      const product = await ProductModel.create(data);
      console.log(`Product is created successfully (${product._id}) 😁.`);
      return {
        product: { product },
        message: "Product is created successfully",
        status: "Success",
        statusCode: 200
      };
    }
  }

  static async updateById(sid, data) {
    const productUpdated = await ProductModel.updateOne({ _id: sid }, { $set: data });
    console.log(`Product successfully updated (${sid}) 😁.`);
    return {
      producto: { productUpdated },
      message: "Product successfully updated",
      status: "Success",
      statusCode: 200
    };

  }

  static async deleteById(sid) {
    await ProductModel.deleteOne({ _id: sid });
    console.log(`Estudiante eliminado correctamente (${sid}) 🤔.`);
    return {
      message: "Product successfully deleteded",
      status: "Success",
      statusCode: 200
    };

  }
}
