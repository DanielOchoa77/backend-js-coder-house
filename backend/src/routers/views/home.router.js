import { Router } from 'express';
const router = Router();
import { ProductManagers } from '../../dao/Dao/ProductManager.js';
const prodManager = new ProductManagers("./src/products.json");
import EmailService from '../../services/email.service.js';
import path from 'path';
import { __dirname } from '../../utils.js';
    
router.get('/', async (req, res) => {
    res.render('login', { title: 'Hello People 🖐️' });
});

router.get('/realTimeProducts', async (req, res) => {
    const products = await prodManager.getProducts();
    res.render('realTimeProducts');
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Hello People 🖐️' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Hello People 🖐️' });
});

router.get('/recovery-password', (req,res) => {
    res.render('recovery-password', { title: 'Hello People 🖐️' });
  });

router.get('/recovery-password-mail', (req,res) => {
    res.render('recovery-password-mail', { title: 'Hello People 🖐️' });
  });

 /* router.get('/logger', (req, res) => {
    req.logger.silly('Hola desde el request index home 😁 (silly)');
    req.logger.debug('Hola desde el request index home 😁 (debug)');
    req.logger.verbose('Hola desde el request index home 😁 (verbose)');
    req.logger.http('Hola desde el request index home 😁 (http)');
    req.logger.info('Hola desde el request index home 😁 (info)');
    req.logger.warn('Hola desde el request index home 😁 (warn)');
    req.logger.error('Hola desde el request index home 😁 (error)');
    res.send('Hello Coder House 🖐️');
  });*/

  router.get('/logger', (req, res) => {
    req.logger.debug('Hola desde el request index home 😁 (debug)');
    req.logger.info('Hola desde el request index home 😁 (info)');
    req.logger.warning('Hola desde el request index home 😁 (warn)');
    req.logger.error('Hola desde el request index home 😁 (error)');
    req.logger.fatal('Hola desde el request index home 😁 (fatal)');
    res.send('Hello Coder House 🖐️');
  });

  router.get('/mail', async (req, res) => {
    const emailService = EmailService.getInstance();
    const result = await emailService.sendEmail(
      'ing.danielochoa@hotmail.com, ing.danielochoa77@gmail.com',
      'Hola, desde nuestro servidor en Node js v2',
      `<div>
        <h1>Hola Coder House 😍</h1>
        <img src="cid:hello-cat" alt="Hello" />
      </div>`,
      [
        {
          filename: 'hello-cat.gif',
          path: path.join(__dirname, './images/cat.gif'),
          cid: 'hello-cat',
        },
      ]
    );
    res.status(200).json(result);
  });


export default router;