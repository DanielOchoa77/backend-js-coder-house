import UserService from "../services/Users.service.js";
import UsersDTO from "../dto/users.dto.js";


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
    const users = await UserService.getAll();
    if (users) {
      return new UsersDTO(users);
    }
  }

  static async delete(id) {
    const users = await UserService.deleteById(id);
    return users;
  }
}
