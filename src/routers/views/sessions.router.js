import { Router } from 'express';
import passport from 'passport';
import UserModel from '../../dao/models/user.model.js';
import { createHash, isValidPassword } from '../../utils.js';

const router = Router();

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

router.get('/sessions/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const user = await UserModel.findById(req.user.id);
  res.status(200).json(user);
});


router.get('/session/logout', (req, res) => {
    res.clearCookie('access_token').redirect('/login');
});

export default router;