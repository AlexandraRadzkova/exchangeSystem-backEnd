const jwt = require('../../utils/jwtHelpers')

module.exports = function userResolver(ctx, next) {
  ctx.user = findUser(ctx.headers.authorization)
  return next()
}

function findUser(token) {
  if (!token) return null

  try {
    return jwt.verify(token)
  } catch (err) {
    return null
  }
}
