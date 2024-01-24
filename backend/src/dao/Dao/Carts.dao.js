import CartModel from "../models/cart.model.js";

export default class CartsDaoMongoDB {

     getAll() {
        return CartModel.find();
    }

     create(data) {
        return CartModel.create(data);
    }

     findById(id) {
        return CartModel.findById(id);
    }

     find(filter, data) {
        return CartModel.find(filter, data);
    }

     updateById(filter, data) {
        return CartModel.updateOne(filter, data);
    }

     deleteById(tid) {
        return CartModel.deleteOne({ _id: tid });
    }
}