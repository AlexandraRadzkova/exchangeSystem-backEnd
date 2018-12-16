const db = require('../../db')

module.exports = async function adminOnly(ctx, next) {
  if (ctx.user && ctx.user.isAdmin) {
    return next()
  }

  throw Error('Admin only')
}
