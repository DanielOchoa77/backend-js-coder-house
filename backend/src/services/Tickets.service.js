import { ticketsRepository } from "../repositories/tickets.repositoryImp.js";


export default class TicketsService {

    static create(data) {
        return ticketsRepository.create(data);
    }
    
}