const crypto = require('crypto')
const appSalt = require('./env').APP_SALT

function createSalt() {
  return crypto.randomBytes(16).toString('hex')
}

function createHash(password, salt = createSalt()) {
  if (!password) {
    throw Error('No password provided to services/cryptoService/createHash')
  }
  const hash = crypto.createHmac('sha512', salt)
  hash.update(appSalt)
  hash.update(password)
  return { salt, hash: hash.digest('hex') }
}

module.exports = {
  create: (pass) => createHash(pass),
  isValid: (pass, salt, hash) => createHash(pass, salt).hash === hash,
}
