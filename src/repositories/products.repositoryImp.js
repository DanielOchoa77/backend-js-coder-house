import {ProductDao} from "../dao/Dao/factory.js";

import ProductsRepository from './products.repository.js';

export const productsRepository = new  ProductsRepository(ProductDao);


