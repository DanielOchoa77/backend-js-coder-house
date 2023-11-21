import express from 'express';
import productRouter from './routers/api/products.router.js';
import cartRouter from './routers/api/carts.router.js';
import homeRouter from './routers/views/home.router.js';
import handlebars from 'express-handlebars';
import path from 'path';
import { __dirname } from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


app.use('/', homeRouter);
app.use('/api', productRouter, cartRouter);

app.use((error, req, res, next) => {
    const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
    console.error(message);
    res.status(500).json({ message });
  });

export default app;