import path from 'path';
import bcrypt from 'bcrypt';
import url from 'url';
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';
import config from './config/config.js';

const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);
export const verifyPassword = (password, user) => bcrypt.compareSync(password, user.password);


export const URL_BASE = 'http://localhost:8080/api';

export const buildResponsePaginated = (data, baseUrl = URL_BASE) => {
    return {
      //status:success/error
      status: 'success',
      //payload: Resultado de los productos solicitados
      payload: data.docs.map((doc) => doc.toJSON()),
      //totalPages: Total de páginas
      totalPages: data.totalPages,
      //prevPage: Página anterior
      prevPage: data.prevPage,
      //nextPage: Página siguiente
      nextPage: data.nextPage,
      //page: Página actual
      page: data.page,
      //hasPrevPage: Indicador para saber si la página previa existe
      hasPrevPage: data.hasPrevPage,
      //hasNextPage: Indicador para saber si la página siguiente existe.
      hasNextPage: data.hasNextPage,
      //prevLink: Link directo a la página previa (null si hasPrevPage=false)
      prevLink: data.hasPrevPage ? `${baseUrl}/produts?limit=${data.limit}&page=${data.prevPage}` : null,
      //nextLink: Link directo a la página siguiente (null si hasNextPage=false)
      nextLink: data.hasNextPage ? `${baseUrl}/produts?limit=${data.limit}&page=${data.nextPage}` : null,
    };  
  };

  export const buildResponsePaginatedHome = (data) => {
    return {
      //status:success/error
      status: 'success',
      //payload: Resultado de los productos solicitados
      payload: data.docs.map((doc) => doc.toJSON()),
      //totalPages: Total de páginas
      totalPages: data.totalPages,
      //prevPage: Página anterior
      prevPage: data.prevPage,
      //nextPage: Página siguiente
      nextPage: data.nextPage,
      //page: Página actual
      page: data.page,
      //hasPrevPage: Indicador para saber si la página previa existe
      hasPrevPage: data.hasPrevPage,
      //hasNextPage: Indicador para saber si la página siguiente existe.
      hasNextPage: data.hasNextPage,
      //prevLink: Link directo a la página previa (null si hasPrevPage=false)
      prevLink: data.hasPrevPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.prevPage}` : null,
      //nextLink: Link directo a la página siguiente (null si hasNextPage=false)
      nextLink: data.hasNextPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.nextPage}` : null,
    };  
  };

  export const JWT_SECRET = config.jwtSecret;
  export const JWT_SECRET_RECOVERY = config.jwtSecretRecovery;

export const createToken = (user) => {
  const {
    _id,
    first_name,
    last_name,
    email,
    role,
    cartId
  } = user;

  const payload = {
    id: _id,
    first_name,
    last_name,
    email,
    role,
    cartId
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30m' });
}

export const createTokenRecovery = (email) => {

  const payload = {
    emailRecover:email
  };

  return jwt.sign(payload, JWT_SECRET_RECOVERY, { expiresIn: '10m' });
}

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (error, payload)  => {
      if (error) {
        return reject(error);
      }
      resolve(payload);
    });
  });
}

export const verifyTokenRecovery = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET_RECOVERY, (error, payload)  => {
      if (error) {
        return reject(error);
      }
      resolve(payload);
    });
  });
}

export const authMiddleware = roles => (req, res, next) => {
  const { user } = req;
  if(!user) {
    return res.status(401).json({ message: 'unauthorized' });
  }
  if (!roles.includes(user.role)) {
    return res.status(403).json({ message: 'forbidden' });
  }
  next();
};


export const generateProduct = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    price: faker.commerce.price(),
    thumbnail: faker.image.url(),
    code: faker.string.alphanumeric({ length: 10 }),
    status: faker.datatype.boolean(),
    stock: faker.number.int({ min: 10000, max: 99999 }),
    category:faker.commerce.productMaterial(),
  }
};

export const authMiddlewareRecovery = (strategy) => (req, res, next) => {
  passport.authenticate(strategy, function (error, payload, info) {
    if (error) {
      return next(error);
    }
    if (!payload) {
      return res.status(401).json({ message: info.message ? info.message : info.toString() });
    }
    req.user = payload;
    next();
  })(req, res, next);
};