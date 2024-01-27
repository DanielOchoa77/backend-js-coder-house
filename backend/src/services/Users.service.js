import {usersRepository} from "../repositories/users.repositoryImp.js";

export default class UserService {
    static getAll(filter = {}) {
        return usersRepository.getAll(filter);
    }

    static getByEmail(email) {
        return usersRepository.getByEmail(email);
    }

    static create(data) {
        return usersRepository.create(data);
    }

    static async getById(id) {
        const result = await usersRepository.getAll({ _id: id });
        return result[0];
    }

    static updateById(id, data) {
        return usersRepository.updateById(id, data);
    }

    static deleteById(id) {
        return usersRepository.deleteById(id);
    }

    static async updateByIdPush(uid, cid) {
        return await usersRepository.updateByIdPush( uid , cid );
    }
   
}