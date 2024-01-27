import ticketModel from "../models/ticket.model.js";

export default class TicketsDaoMongoDB {

    create(data) {
        return ticketModel.create(data); 
    }

}