import express from 'express';
import productRouter from './routers/api/products.router.js';
import cartRouter from './routers/api/carts.router.js';
import prodRouterview from './routers/views/product.router.js';
import userRouterview from './routers/views/user.router.js';
import homeRouterview from './routers/views/home.router.js';
import messageRouter from './routers/views/message.router.js';
import cors from 'cors';
import handlebars from 'express-handlebars';
import path from 'path';
import { __dirname } from './utils/utils.js';
//import { URI } from './db/mongodb.js';
import cookieParser from 'cookie-parser';
//import sessions from 'express-session';
//import MongoStore from 'connect-mongo';
import usersRouter from './routers/api/users.router.js';
import authRouter from './routers/api/auth.router.js';
import sessionsRouter from './routers/views/sessions.router.js';
import passport from 'passport';
import { init as initPassport } from './config/passport.config.js';
import { addLogger } from './config/logger.js';
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware.js";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const app = express();

const COOKIE_SECRET = 'DwT9RvQsSCM!Up@jWJ%auVzs5AUE$2XR';

//const SESSION_SECRET = 'DwT9RvQsSCM!Up@jWJ%auVzs5AUE$2XR';

/*app.use(sessions({
  store: MongoStore.create({
    mongoUrl: URI,
    mongoOptions: {},
    ttl: 60 * 30,
  }),
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));*/

const corsOptions = {
  origin: 'http://localhost:5500',
  methods: ['GET','POST','PUT', 'DELETE'],
  credentials: true,
};

app.use(addLogger);
app.use(cors(corsOptions));
app.use(cookieParser(COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

initPassport();
app.use(passport.initialize());
//app.use(passport.session());

if (process.env.NODE_ENV == 'production') {
  console.log(process.env.NODE_ENV);
  const swaggerOpts = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Ventas API',
        description: 'Esta es la documentación de la API de D.O. Una aplicación de ventas de tenis.',
      },
    },
    apis: [path.join(__dirname, 'docs', '**', '*.yaml')],
  };
  console.log(path.join(__dirname, 'docs', '**', '*.yaml'));
  const specs = swaggerJsDoc(swaggerOpts);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

app.use('/', prodRouterview, homeRouterview, userRouterview);
app.use('/chat', messageRouter);
app.use('/api', productRouter, cartRouter, usersRouter, authRouter, sessionsRouter);

app.use(errorHandlerMiddleware);
app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
  console.error(message);
  res.status(500).json({ message });
});

export default app;