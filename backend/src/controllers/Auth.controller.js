import AuthService from '../services/Auth.service.js';

export default class AuthController {

  static async getByEmail(email) {
    return AuthService.getByEmail(email);
  }

  static async create(data) {
    return AuthService.create(data);
  }

  static async recoveryPasswordMail(req) {
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
  }

}
