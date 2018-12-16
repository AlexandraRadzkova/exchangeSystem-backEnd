const repository = require('../repositories/userRepository')

module.exports = {
  async findOrCreateUser({ passport, ...rest }) {
    return repository.findOrCreateByPassport(passport, rest)
  },
}
