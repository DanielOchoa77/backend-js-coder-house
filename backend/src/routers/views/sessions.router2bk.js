import { Router } from 'express';
import passport from 'passport';
import UserModel from '../../dao/models/user.model.js';
import { createHash, isValidPassword } from '../../utils/utils.js';

const router = Router();

router.post('/sessions/login', passport.authenticate('jwt', { session: false }), async(req, res) => {
  const limit = 10;
  const page = 1;
  const sort = "desc";
  const search = "";
  let {
    first_name,
    last_name,
    email,
    age,
    role,
  } = req.user;

  /*if(email === "adminCoder@coder.com" && password ==="adminCod3r123"){
    role = "admin";
  }*/
  
  req.session.user = {
    first_name,
    last_name,
    email,
    age,
    role,
  };

  req.query = {
    limit,
    page,
    sort,
    search
  };

  res.redirect('/products');
});

router.post('/sessions/register', passport.authenticate('jwt', { session: false }), async (req, res) => {
  res.redirect('/login');
});

router.post('/sessions/recovery-password', async (req, res) => {
  const { body: { email, password } } = req;
  if (!email || !password) {
    return res.render('error', { title: 'Hello People 🖐️', messageError: 'Todos los campos son requeridos.' });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.render('error', { title: 'Hello People 🖐️', messageError: 'Correo o contraseña invalidos.' });
  }
  user.password = createHash(password);
  await UserModel.updateOne({ email }, user);
  res.redirect('/login');
});

router.get('/sessions/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'No estas autenticado.' });
  }
  res.status(200).json(req.session.user);
});

router.get('/session/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.render('error', { title: 'Hello People 🖐️', messageError: error.message });
    }
    res.redirect('/login');
  });
})

router.get('/sessions/github', passport.authenticate('github', { scope: ['user:email']}));

router.get('/sessions/githup/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  const limit = 10;
  const page = 1;
  const sort = "desc";
  const search = "";
  let {
    first_name,
    last_name,
    email,
    age,
    role,
  } = req.user;
  
  req.session.user = {
    first_name,
    last_name,
    email,
    age,
    role,
  };

  req.query = {
    limit,
    page,
    sort,
    search
  };

  res.redirect('/products');
});


export default router;