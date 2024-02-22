import AuthService from '../services/Auth.service.js';
import EmailService from '../services/email.service.js';
import { CustomError } from "../utils/CustomError.js";
import { recoveryFieldsMissed, sendEmailNotFound,tokenExpired, credentialUserError, newPassInvalid } from "../utils/CauseMessageError.js";
import EnumsError from "../utils/EnumsError.js";
import { createHash, verifyPassword, createTokenRecovery,verifyTokenRecovery} from '../utils/utils.js';

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
      CustomError.create(
        {
          name: 'Todos los campos son requeridos',
          cause: recoveryFieldsMissed(),
          message: 'Todos los campos son requeridos',
          code: EnumsError.INVALID_PARAMS_ERROR,
        }
      )
    }
    const user = await AuthService.getByEmail(email);
    if (!user) {

      CustomError.create(
        {
          name: 'Usuario no encontrado',
          cause: sendEmailNotFound(),
          message: 'Usuario no encontrado ',
          code: EnumsError.INVALID_PARAMS_ERROR,
        }
      )
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
    return result;
  }

  static async recoveryPassword(req) {
    const { body: { password, token } } = req;
    let tokenValido = false;
    let emailRecover = "";
    try {
      const result = await verifyTokenRecovery(token);
      emailRecover = result.emailRecover;
      tokenValido = true;
    } catch (error) {
      CustomError.create(
        {
          name: 'Token expiró ',
          cause: tokenExpired(),
          message: 'El token expiro',
          code: EnumsError.INVALID_PARAMS_ERROR,
        }
      )
      tokenValido = false;
    }
    if (tokenValido) {
      if (!password) {
        CustomError.create(
          {
            name: 'Todos los campos son requeridos',
            cause: recoveryFieldsMissed(),
            message: 'Todos los campos son requeridos',
            code: EnumsError.INVALID_PARAMS_ERROR,
          }
        )
      }
      const user = await AuthService.getByEmail(emailRecover);
      if (!user) {
        CustomError.create(
          {
              name: 'credenciales invalidas',
              cause: credentialUserError(),
              message: 'Error correo o contraseña invalidos',
              code: EnumsError.UNAUTHORIZED_ERROR,
          }
      )
      }

      const isNotValidPassword = verifyPassword(password, user);

      if (isNotValidPassword) {
        CustomError.create(
          {
            name: 'contraseña nueva invalida',
            cause: newPassInvalid(),
            message: 'La contraseña debe ser diferente a la anterior registrada',
            code: EnumsError.INVALID_PARAMS_ERROR,
          }
        )
      }
      user.password = createHash(password);
      return await AuthService.updateById(user.id, user);;
    } else {
      CustomError.create(
        {
          name: 'Token expiró ',
          cause: tokenExpired(),
          message: 'El token expiro',
          code: EnumsError.INVALID_PARAMS_ERROR,
        }
      )
    }
  }
}
