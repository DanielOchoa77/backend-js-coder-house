import UserService from "../services/Users.service.js";
import UsersDTO from "../dto/users.dto.js";
import EmailService from '../services/email.service.js';


export default class UsersController {

  static async changeRole(userId) {
    const user = await UserService.getUserById(userId);
    if (user) {
      switch (user.role) {
        case "user":
          user.role = "premium";
          break;
        case "premium":
          user.role = "user";
          break;
        default:
          break;
      }
      await UserService.updateById(userId, user);
      return {
        message: "Product successfully updated",
        status: "Success",
        statusCode: 200
      };
    }
    return {
      message: "User Not Found",
      status: "Error",
      statusCode: 404
    };
  }

  static async getAllUser() {
    const users = await UserService.getAll();
    if (users) {
      return new UsersDTO(users);
    }
  }

  static async deleteByInactivity() {
    const dateInactivity = new Date();
    dateInactivity.setDate(dateInactivity.getDate() - 2);
    const usersInactivity = await UserService.getUserByInactivity(dateInactivity);
    usersInactivity.map(user => {
        UserService.deleteById(user.id);
        const emailService = EmailService.getInstance();
        emailService.sendEmail(
          user.email,
          `Hola, ${user.first_name}`,
          `<div>
            <h1>Se ha eliminado su usuario por inactividad</h1>
          </div>`
        );
    })
    return usersInactivity
  }
  static async delete(id) {
    const users = await UserService.deleteById(id);
    return users;
  }

  static async getUserById(id) {
    const users = await UserService.getUserById(id);
    return users;
  }

  static async updateById(uid, user) {
    const users = await UserService.updateById(uid, user);
    return users;
  }

}
