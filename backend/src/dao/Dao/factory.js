import config from '../../config/config.js';

export let ProductDao;
export let CartDao;
export let UserDao;

switch (config.persistence) {
  case 'mongodb':
    const ProductsDaoMongoDB = (await import('./Products.dao.js')).default;
    const CartDaoMongoDb = (await import('./Carts.dao.js')).default;
    const UserDaoMongoDb = (await import('./Users.dao.js')).default;
    ProductDao = new ProductsDaoMongoDB();
    CartDao = new CartDaoMongoDb();
    UserDao = new UserDaoMongoDb();
    break;
  default:
    break;
}