import {productsRepository} from "../repositories/products.repositoryImp.js";

export default class ProductsService {

    static async getPaginate(criteria = {}, options = {}) {
        return productsRepository.getPaginate(criteria, options);
    }

    static async create(data) {
        return productsRepository.create(data);
    }

    static async findById(id) {
        console.log("awdwef")
        return productsRepository.findById(id);
    }

    static async findByCode(code) {
        console.log("awdwef")
        return productsRepository.findOne({ 'code': code });
    }

    static async updateById(tid, data) {
        return productsRepository.updateById(tid, data);
    }

    static async deleteById(tid) {
        return productsRepository.deleteById(tid);
    }
}