export default class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        return this.dao.getAll();
    }

    async create(data) {
        return this.dao.create(data);
    }

    async findById(id) {
        return this.dao.findById(id);
    }

    async findByIdWithCondition(condition) {
        return this.dao.findByIdWithCondition(condition);
    }

    async findByIdAndProductId(cid, pid) {
        return this.dao.find({ $and: [{ '_id': cid }, { 'products.product': pid }] }, { "products.$": true });
    }

    async updateByIdSet(tid, data) {
        return this.dao.updateById({ _id: tid }, { $set: data });
    }

    async updateByIdPush(tid, data) {
        return this.dao.updateById({ _id: tid }, { $push: data });
    }

    async updateByIdAndProductIdAndQuantity(cid, pid, quantity) {
        return this.dao.updateById({ $and: [{ '_id': cid }, { 'products.product': pid }] }, { $set: { 'products.$.quantity': quantity } });
    }

    async deleteById(tid) {
        return this.dao.deleteById(tid);
    }
}

