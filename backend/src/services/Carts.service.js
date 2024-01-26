import {cartsRepository} from "../repositories/carts.repositoryImp.js";

export default class CartsService {

    static async getAll() {
        return cartsRepository.getAll();
    }

    static async create(data) {
        return cartsRepository.create(data);
    }

    static async findById(id) {
        return cartsRepository.findById(id);
    }

    static async findByIdWithCondition(condition) {
        return cartsRepository.findByIdWithCondition(condition);
    }

    static async findByIdAndProductId(cid, pid) {
        return cartsRepository.find(cid, pid);
    }

    static async updateByIdSet(tid, data) {
        return cartsRepository.updateById(tid, data);
    }

    static async updateByIdPush(tid, data) {
        return cartsRepository.updateById(tid, data);
    }


    static async updateByIdAndProductIdAndQuantity(cid, pid, quantity) {
        return cartsRepository.updateById({ $and: [{ '_id': cid }, { 'products.product': pid }] }, { $set: { 'products.$.quantity': quantity } });
    }

    static async deleteById(tid) {
        return cartsRepository.deleteById(tid);
    }
}