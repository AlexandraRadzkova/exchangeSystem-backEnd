const Router = require('koa-router')
const authService = require('../services/authService')
const router = new Router()

router.post('/sign-in', async (ctx) => {
  const { password } = ctx.request.body
  const token = await authService.signIn(password)
  return {
    token,
    success: !!token,
  }
})

module.exports = {
  path: '/auth',
  router,
}
