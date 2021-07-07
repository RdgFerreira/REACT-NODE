const User = require('../model/User');

class UserService {
  async createUser(user) {
    await User.create(user);
  }

  async getAllUsers() {
    return await User.findAll({raw: true}); // Registros de forma mais crua
  }

  async getUsersById(id) {
    return await User.findByPk(id, {raw: true});
  }

  async updateUser(id, body) {
    /*
      const user = await User.findByPk(id, {raw: true});
      user.update(body);
      */
    await User.update(body, {where: {id: id}});
  }

  async deleteUser(id) {
    /*
      const user = await User.findByPk(id, {raw: true});
      user.destroy({where: {id: id}});
      */
    await User.destroy({where: {id: id}});
  }
}

module.exports = new UserService;
