import ProductDao from "../dao/Dao/Products.dao.js";

export default class ProductsService {

    static getPaginate(criteria = {}, options = {}) {
        return ProductDao.getPaginate(criteria, options);
    }

    static create(data) {
        return ProductDao.create(data);
    }

    static findById(id) {
        return ProductDao.findById(id);
    }

    static findByCode(code) {
        return ProductDao.findOne({ 'code': code });
    }

    static updateById(tid, data) {
        return ProductDao.updateById(tid, data);
    }

    static deleteById(tid) {
        return ProductDao.deleteById(tid);
    }
}