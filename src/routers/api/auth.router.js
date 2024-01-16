import { Router } from 'express';

import UserModel from '../../dao/models/user.model.js';
import AuthController from '../../controllers/Auth.controller.js';

import { createHash, verifyPassword, createToken } from '../../utils.js';

const router = Router();

router.post('/auth/register', async (req, res) => {

  const {
    body: {
      first_name,
      last_name,
      email,
      age,
      password,
    },
  } = req;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !password
  ) {
    return res.status(400).render('error', { title: 'Hello People 🖐️', messageError: 'Todo los campos son requeridos ' });
    //return res.status(400).json({ message: 'Todo los campos son requeridos '});
  }

  let user = await UserModel.findOne({ email });

  if (user) {
    return res.status(400).render('error', { title: 'Hello People 🖐️', messageError: 'Usuario ya registrado' });
    //return res.status(400).json({ message: 'Usuario ya registrado'});
  }

  user = await UserModel.create({
    first_name,
    last_name,
    age,
    email,
    password: createHash(password),
  })

  res.status(200).json(user);

});

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).render('error', { title: 'Hello People 🖐️', messageError: 'Correo o contraseña invalidos.' });
    //return res.status(401).json({ message: 'Correo o contraseña son invalidos' });
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(401).render('error', { title: 'Hello People 🖐️', messageError: 'Correo o contraseña invalidos.' });
    //return res.status(401).json({ message: 'Correo o contraseña son invalidos' });
  }

  const isNotValidPassword = !verifyPassword(password, user);

  if (isNotValidPassword) {
    return res.status(401).render('error', { title: 'Hello People 🖐️', messageError: 'Correo o contraseña invalidos.' });
    //return res.status(401).json({ message: 'Correo o contraseña son invalidos' });
  }

  const token = createToken(user);
  res
    .cookie('access_token', token, { maxAge: 1000 * 60 * 30, httpOnly: true, signed: true })
    .status(200)
    .redirect('/products')

});

export default router;