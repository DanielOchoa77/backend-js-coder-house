import MessageModel from '../models/message.model.js';
import { logger } from '../../config/logger.js'

export default class MessageManagers {
  static async get() {

    try {
      const messagesList = await MessageModel.find();
      if (messagesList) {
        return {
          message: messagesList,
          msg: "Messages found",
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
      logger.error(error.message);
      return {
        message: "Error find Messages",
        status: "Error",
        statusCode: 400
      };
    }
  }

  static async saveMessage(data) {
    try {
     const {user, message}=data;
      const messageBody = {
        user: user,
        message: message
      }
      const messageResult = await MessageModel.create(messageBody);
      logger.info("message was created successfully");
      if (messageResult) {
        return {
          message: messageResult,
          msg: "Message was created successfully",
          status: "Success",
          statusCode: 201
        };
      }
    } catch (error) {
      logger.error(error.message);
      return {
        message: error.message,
        status: "Error",
        statusCode: 400
      };
    }
  }

}
