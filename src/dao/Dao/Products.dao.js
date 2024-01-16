import ProductModel from "../models/product.model.js";

export default class ProductsDaoMongoDB {

    static getPaginate(criteria, options) {
        return ProductModel.paginate(criteria, options);
    }

    static create(data) {
        return ProductModel.create(data);
    }

    static findById(id) {
        return ProductModel.findById(id);
    }

    static findOne(code) {
        return  ProductModel.findOne(code);
    }

    static updateById(tid, data) {
        return CartModel.updateOne({ _id: tid }, { $set: data });
    }

    static deleteById(tid) {
        return CartModel.deleteOne({ _id: tid });
    }
}