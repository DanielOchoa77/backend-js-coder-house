import { Router } from 'express';
import UserModel from '../../dao/models/user.model.js';

const router = Router();

router.post('/sessions/login', async (req, res) => {
  const { body: { email, password } } = req;
  if (!email || !password) {
    return res.render('error', { title: 'Hello People 🖐️', messageError: 'Todos los campos son requeridos.' });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.render('error', { title: 'Hello People 🖐️', messageError: 'Correo o contraseña invalidos.' });
  }
  if (user.password !== password) {
    return res.render('error', { title: 'Hello People 🖐️', messageError: 'Correo o contraseña invalidos.' });
  }

  let {
    first_name,
    last_name,
    age,
    role,
  } = user;

  if(email === "adminCoder@coder.com" && password ==="adminCod3r123"){
    role = "admin";
  }
  
  req.session.user = {
    first_name,
    last_name,
    email,
    age,
    role,
  };

  const limit = 10;
  const page = 1;
  const sort = "desc";
  const search = "";

  req.query = {
    limit,
    page,
    sort,
    search
  };

  res.redirect('/products');
});

router.post('/sessions/register', async (req, res) => {
  const {
    body: {
      first_name,
      last_name,
      email,
      password,
      age,
    },
  } = req;
  if (
    !first_name ||
    !last_name ||
    !email ||
    !password
  ) {
    return res.render('error', { title: 'Hello People 🖐️', messageError: 'Todos los campos son requeridos.' });
  }
  const user = await UserModel.create({
    first_name,
    last_name,
    email,
    password,
    age,
  });
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

export default router;