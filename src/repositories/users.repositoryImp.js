import {UserDao} from "../dao/Dao/factory.js";

import UsersRepository from './users.repository.js';
export const usersRepository = new  UsersRepository(UserDao);

