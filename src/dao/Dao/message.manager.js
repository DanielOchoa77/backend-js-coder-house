import MessageModel from '../models/message.model.js';

export default class MessageModel {
  static async get() {

    try {
      const messagesList = await MessageModel.find();
      if (messagesList) {
        return {
          msg: messagesList,
          message: "Messages found",
          status: "Success",
          statusCode: 200
        };
      } else {
        return {
          message: "Messages not Found",
          status: "Error",
          statusCode: 404
        };
      }
    } catch (error) {
      console.log(error.message);
      return {
        message: "Error find Messages",
        status: "Error",
        statusCode: 400
      };
    }
  }

  static async saveMessage(user, msg) {
    try {
      const message = {
        user: user,
        message: msg
      }
      const messageResult = await MessageModel.create(message);
      console.log(`message was created successfully (${message._id}).`);
      if (messageResult) {
        return {
          message: messageResult,
          message: "Message was created successfully",
          status: "Success",
          statusCode: 201
        };
      }
    } catch (error) {
      console.log(error.message);
      return {
        message: error.message,
        status: "Error",
        statusCode: 400
      };
    }
  }

}
