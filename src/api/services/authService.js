const userRepository = require('../repositories/userRepository')
const passwordHash = require('../../utils/passwordHash')
const jwt = require('../../utils/jwtHelpers')

module.exports = {
  async signIn(password) {
    const admin = await userRepository.findAdmin()
    if (!admin) {
      throw Error('Admin user does not present at the system')
    }
    const { passwordSalt: salt, passwordHash: hash } = admin
    const isValidPassword = passwordHash.isValid(password, salt, hash)
    if (!isValidPassword) {
      throw Error('Password is not valid')
    }
    return jwt.sign({ id: admin.id, isAdmin: true })
  },
}
