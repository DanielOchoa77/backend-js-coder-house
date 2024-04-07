import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
    {
        code: {type: String, required: true},
        amount: {type: String, required: true},
        purchaser: {type: String, required: true},
        purchaser_datetime:{type: Date, required: true}
    }, {timestamps: true}
)

export default mongoose.model('Ticket', TicketSchema);