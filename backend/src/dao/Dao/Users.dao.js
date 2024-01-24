import UserModel from "../models/user.model.js";

export default class UsersDaoMongoDB {

     create(data) {
        return UserModel.create(data);
    }

     findOne(filter) {
        return UserModel.findOne(filter);
    }
}