import {UserDao} from "../dao/Dao/factory.js";

export default class AuthService {

    static async create(data) {
        return UserDao.create(data);
    }

    static async getByEmail(email) {
        return  UserDao.findOne({ email });
    }

}