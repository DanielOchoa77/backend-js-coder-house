import CartModel from "../models/cart.model.js";

export default class CartsDaoMongoDB {

    static getAll() {
        return CartModel.find();
    }

    static create(data) {
        return CartModel.create(data);
    }

    static findById(id) {
        return CartModel.findById(id);
    }

    static find(filter, data) {
        return CartModel.find(filter, data);
    }

    static updateById(filter, data) {
        return CartModel.updateOne(filter, data);
    }

    static deleteById(tid) {
        return CartModel.deleteOne({ _id: tid });
    }
}