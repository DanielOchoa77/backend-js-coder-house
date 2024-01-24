import {UserDao} from "../dao/Dao/factory.js";

export default class AuthService {

    static create(data) {
        return UserDao.create(data);
    }

    static getByEmail(email) {
        return  UserDao.findOne({ email });
    }

}