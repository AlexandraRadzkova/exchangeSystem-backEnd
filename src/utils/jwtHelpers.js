const jwt = require('jsonwebtoken')
const jwtSecret = require('./env').JWT_SECRET

module.exports = {
  sign(data, options) {
    return jwt.sign(data, jwtSecret, {
      expiresIn: 86400,
      ...options,
    })
  },

  verify(token) {
    return jwt.verify(token, jwtSecret)
  },
}
