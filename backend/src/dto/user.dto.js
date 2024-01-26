export default class UserDTO {
    constructor(user) {
      this.fullname = `${user.first_name} ${user.last_name}`;
      this.cartId = user.cartId;
      this.email = user.email;
    }
  }