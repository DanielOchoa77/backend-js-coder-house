export default class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getPaginate(criteria = {}, options = {}) {
        return this.dao.getPaginate(criteria, options);
    }

    async create(data) {
        return this.dao.create(data);
    }

    async findById(id) {
        return this.dao.findById(id);
    }

    async findByCode(code) {
        return this.dao.findOne(code);
    }

    async updateById(tid, data) {
        return this.dao.updateById(tid, data);
    }

    async deleteById(tid) {
        return this.dao.deleteById(tid);
    }
}