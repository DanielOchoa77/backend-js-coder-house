import {CartDao} from "../dao/Dao/factory.js";

import CartsRepository from './carts.repository.js';

export const cartsRepository = new  CartsRepository(CartDao);


