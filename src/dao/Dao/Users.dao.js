import UserModel from "../models/user.model.js";

export default class UsersDaoMongoDB {

    static create(data) {
        return UserModel.create(data);
    }

    static findOne(filter) {
        return UserModel.findOne(filter);
    }
}