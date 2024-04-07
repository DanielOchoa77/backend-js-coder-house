import {UserDao} from "../dao/Dao/factory.js";

export default class AuthService {

    static async create(data) {
        return UserDao.create(data);
    }

    static async getByEmail(email) {
        return  UserDao.findOne({ email });
    }

    static async getByEmail(email) {
        return  UserDao.findOne({ email });
    }
    static async updateById(uid, data) {
        return UserDao.updateById(uid, data);
    }

    static async updateOne(field, data) {
        return UserDao.updateOne(field, data);
    }
}