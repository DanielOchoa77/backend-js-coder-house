import AuthService from '../services/Auth.service.js';

export default class AuthController {

  static async getByEmail(email) {
    return AuthService.getByEmail(email);
  }

  static async create(data) {
    return AuthService.create(data);
  }

}
