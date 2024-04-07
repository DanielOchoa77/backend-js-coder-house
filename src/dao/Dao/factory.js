import config from '../../config/config.js';

export let ProductDao;
export let CartDao;
export let UserDao;
export let TicketDao;


switch (config.persistence) {
  case 'mongodb':
    const ProductsDaoMongoDB = (await import('./Products.dao.js')).default;
    const CartDaoMongoDb = (await import('./Carts.dao.js')).default;
    const UserDaoMongoDb = (await import('./Users.dao.js')).default;
    const TicketDaoMongoDb = (await import('./Tickets.dao.js')).default;
    ProductDao = new ProductsDaoMongoDB();
    CartDao = new CartDaoMongoDb();
    UserDao = new UserDaoMongoDb();
    TicketDao = new TicketDaoMongoDb();
    break;
  default:
    break;
}