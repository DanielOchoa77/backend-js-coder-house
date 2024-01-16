import CartDao from "../dao/Dao/Carts.dao.js";

export default class CartsService {

    static getAll() {
        return CartDao.getAll();
    }

    static create(data) {
        return CartDao.create(data);
    }

    static findById(id) {
        return CartDao.findById(id);
    }

    static findByIdWithCondition(condition) {
        return CartDao.findByIdWithCondition(condition);
    }

    static findByIdAndProductId(cid, pid) {
        return CartDao.find({ $and: [{ '_id': cid }, { 'products.product': pid }] }, { "products.$": true });
    }

    static updateByIdSet(tid, data) {
        return CartDao.updateById({ _id: tid }, { $set: data });
    }

    static updateByIdPush(tid, data) {
        return CartDao.updateById({ _id: tid }, { $push: data });
    }


    static updateByIdAndProductIdAndQuantity(cid, pid, quantity) {
        return CartDao.updateById({ $and: [{ '_id': cid }, { 'products.product': pid }] }, { $set: { 'products.$.quantity': quantity } });
    }

    static deleteById(tid) {
        return CartDao.deleteById(tid);
    }
}