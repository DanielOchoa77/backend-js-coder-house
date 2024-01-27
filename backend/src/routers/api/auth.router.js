import { Router } from 'express';
import passport from 'passport';
import UserModel from '../../dao/models/user.model.js';
import UserDTO from '../../dto/user.dto.js';
import { createHash, verifyPassword, createToken, authMiddleware} from '../../utils.js';

const router = Router();

router.post('/auth/register', async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

router.post('/auth/login', async (req, res, next) => {
  try{
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
  } catch (error) {
    next(error);
}
});

router.get('/auth/current', passport.authenticate('jwt', { session: false }), authMiddleware('user'), async (req, res) => {
  const user = await UserModel.findById(req.user.id);
  console.log(user);
  const userDTO = new UserDTO(user);
  res.status(200).json(userDTO);
});

router.get('/auth/logout', (req, res) => {
    res.clearCookie('access_token').redirect('/login');
});

export default router;