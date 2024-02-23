import ProductModel from "../models/product.model.js";

export default class ProductsDaoMongoDB {

     getPaginate(criteria, options) {
        return ProductModel.paginate(criteria, options);
    }

     create(data) {
        return ProductModel.create(data);
    }

     findById(id) {
        return ProductModel.findById(id);
    }

     findOne(code) {
        return  ProductModel.findOne({ 'code': code });
    }

     updateById(tid, data) {
        return ProductModel.updateOne({ _id: tid }, { $set: data });
    }

     deleteById(tid) {
        return ProductModel.deleteOne({ _id: tid });
    }
}