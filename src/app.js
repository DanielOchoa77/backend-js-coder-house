import express from 'express';
import productRouter from './routers/api/products.router.js';
import cartRouter from './routers/api/carts.router.js';
import prodRouterview from './routers/views/product.router.js';
import homeRouterview from './routers/views/home.router.js';
import messageRouter from './routers/views/message.router.js';
import handlebars from 'express-handlebars';
import path from 'path';
import { __dirname } from './utils.js';
import { URI } from './db/mongodb.js';
import cookieParser from 'cookie-parser';
import sessions from 'express-session';
import MongoStore from 'connect-mongo';
import usersRouter from './routers/api/users.router.js';
import sessionsRouter from './routers/views/sessions.router.js';
import passport from 'passport';
import { init as initPassport } from './config/passport.config.js';


const app = express();

const SESSION_SECRET = 'DwT9RvQsSCM!Up@jWJ%auVzs5AUE$2XR';

app.use(sessions({
  store: MongoStore.create({
    mongoUrl: URI,
    mongoOptions: {},
    ttl: 60 * 30,
  }),
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

initPassport();
app.use(passport.initialize());
app.use(passport.session());


app.use('/', prodRouterview, homeRouterview);
app.use('/chat', messageRouter);
app.use('/api', productRouter, cartRouter, usersRouter, sessionsRouter);

app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
  console.error(message);
  res.status(500).json({ message });
});

export default app;