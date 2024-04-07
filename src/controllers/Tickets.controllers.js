import TicketsServices from "../services/Tickets.service.js";
import { v4 as uuidV4 } from "uuid";
import { logger } from '../config/logger.js'

export default class TicketsController {

  static async create(data) {
    try {
      const {
        amount,
        purchaser,
        purchaser_datetime,
      } = data

      if (!amount || !purchaser || !purchaser_datetime) {
        return {
          message: "Todos los campos son requidos",
          status: "Error",
          statusCode: 404
        };
      }
      const ticket = {
        code: uuidV4(),
        amount,
        purchaser,
        purchaser_datetime,
      }

      return await TicketsServices.create(ticket);
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