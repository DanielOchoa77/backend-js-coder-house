export default class UsersDTO {
  constructor(users) {
    this.users = users.map(user => ({
      id: user.id,
      fullname: `${user.first_name} ${user.last_name}`,
      email: user.email,
      role: user.role
    }))
  }
}