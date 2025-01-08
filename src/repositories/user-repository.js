const CrudRepository = require("./crud-repository");
const { User } = require("../models");
const { where } = require("sequelize");
class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }
  async getUserByEmail(emai) {
    const user = await User.findOne({ where: { email: emai } });
    return user;
  }
}
module.exports = UserRepository;
