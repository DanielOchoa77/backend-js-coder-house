import UserModel from "../models/user.model.js";

export default class UsersDaoMongoDB {

     create(data) {
        return UserModel.create(data);
    }

     findOne(filter) {
        return UserModel.findOne(filter);
    }
    
    getAll(criteria = {}) {
        return UserModel.find(criteria);
    }

    getByEmail(email) {
        return UserModel.findOne({ email });
    }

    updateById(uid, data) {
        return UserModel.updateOne({ _id: uid }, { $set: data });
    }
    
    updateByIdPush(filtro, data) {
        console.log('update product');
        //return CartModel.updateOne({ _id: cid }, { $set: data });
        return UserModel.updateOne(filtro, data);
    }

    deleteById(uid) {
        return UserModel.deleteOne({ _id: uid });
    }

}