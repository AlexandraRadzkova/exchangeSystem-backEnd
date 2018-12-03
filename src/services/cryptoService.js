const crypto = require('crypto')

function createHash(password, salt = '') {
  if (!password) {
    throw Error('No password provided to services/cryptoService/createHash')
  }
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  return { salt, hash: hash.digest('hex') }
}

module.exports = {
  create: (pass) => createHash(pass),
  isEqual: (pass, hash) => createHash(pass) === hash,
}
