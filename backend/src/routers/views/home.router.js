import { Router } from 'express';
const router = Router();
import { ProductManagers } from '../../dao/Dao/ProductManager.js';
const prodManager = new ProductManagers("./src/products.json");
    
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

 /* router.get('/logger', (req, res) => {
    req.logger.silly('Hola desde el request index home 😁 (silly)');
    req.logger.debug('Hola desde el request index home 😁 (debug)');
    req.logger.verbose('Hola desde el request index home 😁 (verbose)');
    req.logger.http('Hola desde el request index home 😁 (http)');
    req.logger.info('Hola desde el request index home 😁 (info)');
    req.logger.warn('Hola desde el request index home 😁 (warn)');
    req.logger.error('Hola desde el request index home 😁 (error)');
    res.send('Hello Coder House 🖐️');
  });*/efwefS

  router.get('/logger', (req, res) => {
    req.logger.debug('Hola desde el request index home 😁 (debug)');
    req.logger.info('Hola desde el request index home 😁 (info)');
    req.logger.warning('Hola desde el request index home 😁 (warn)');
    req.logger.error('Hola desde el request index home 😁 (error)');
    req.logger.fatal('Hola desde el request index home 😁 (fatal)');
    res.send('Hello Coder House 🖐️');
  });


export default router;