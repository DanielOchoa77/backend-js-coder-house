export default class UserRepository{
    constructor(dao){
        this.dao = dao;
    }
    async getAll(filter = {}) {
        return this.dao.getAll(filter);
    }

    async getByEmail(email) {
        return this.dao.getByEmail(email);
    }

    async create(data) {
        return this.dao.create(data);
    }

    async getById(id) {
        const result = await this.dao.getAll({ _id: id });
        return result[0];
    }

    async updateById(id, data) {
        return this.dao.updateById(id, data);
    }

    async deleteById(id) {
        return this.dao.deleteById(id);
    }

    async updateByIdPush(uid, cid) {
        return await this.dao.updateByIdPush({ _id: uid }, { $push: { cartId:{'cartId' : cid}  } });
    }

    async  getUserById(id) {
        return await this.dao.findById(id);
    }
}

