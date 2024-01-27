import {TicketDao} from "../dao/Dao/factory.js";

import TicketsRepository from './tickets.repository.js';

export const ticketsRepository = new  TicketsRepository(TicketDao);


