import { Router } from 'express';
import passport from 'passport';
import UserModel from '../../dao/models/user.model.js';
import AuthService from '../../services/Auth.service.js';
import UserDTO from '../../dto/user.dto.js';
import { createHash, verifyPassword, createToken,
       authMiddleware, authMiddlewareRecovery, createTokenRecovery,verifyTokenRecovery} from '../../utils.js';
import EmailService from '../../services/email.service.js';
import path from 'path';
import { __dirname } from '../../utils.js';


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
  const userDTO = new UserDTO(user);
  res.status(200).json(userDTO);
});

router.get('/auth/logout', (req, res) => {
    res.clearCookie('access_token').redirect('/login');
});


router.post('/auth/recovery-password', async (req, res) => {
  const { body: {password, token } } = req;
  let tokenValido = false;
  let emailRecover ="";
  try {
    const result = await verifyTokenRecovery(token);
    emailRecover = result.emailRecover;
    console.log(result);
    tokenValido = true;
  } catch (error) {
    console.error('Token expiró 😨:', error.message);
    tokenValido = false;
  }
  console.log("token valido:" + " "+ tokenValido);
  if(tokenValido){
  if (!password) {
    return res.render('error', { title: 'Hello People 🖐️', messageError: 'Todos los campos son requeridos.' });
  }
  console.log(emailRecover);
  const user = await AuthService.getByEmail(emailRecover);
  if (!user) {
    return res.render('error', { title: 'Hello People 🖐️', messageError: 'Correo o contraseña invalidos.' });
  }

  const isNotValidPassword = verifyPassword(password, user);

  if (isNotValidPassword) {
    return res.status(401).render('error', { title: 'Hello People 🖐️', messageError: 'La contraseña debe ser diferente a la anterior registrada.' });
    //return res.status(401).json({ message: 'Correo o contraseña son invalidos' });
  }
  user.password = createHash(password);
  await AuthService.updateById(user.id, user);
  //res.redirect('/login');
  return res.render('info', { title: 'Hello People 🖐️', messageInfo: 'Cambio de contraseña exitoso.' });
}else {
  return res.render('error', { title: 'Hello People 🖐️', messageError: 'Token expiro.' });
}
});

router.post('/auth/recovery-password-mail', async (req, res) => {
  const { body: { email } } = req;
  if (!email) {
    return res.render('error', { title: 'Hello People 🖐️', messageError: 'Todos los campos son requeridos.' });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.render('error', { title: 'Hello People 🖐️', messageError: 'Usuario no encontrado.' });
  }

  const token = createTokenRecovery(email);
  const linkRecovery = `http://localhost:8080/recovery-password?token=${token}`;
  const emailService = EmailService.getInstance();
    const result = await emailService.sendEmail(
      email,
      'Hola, recupera tu contraseña',
      `<div>
        <h1>Haz clic en el siguiente link para recuperar tu contraseña</h1>
        <a href="${linkRecovery}" role=button">Link de recuperación</a>
      </div>`
    );
    return res.status(200).render('info', { title: 'Hello People 🖐️', messageInfo: 'Correo Enviado' });
});

export default router;