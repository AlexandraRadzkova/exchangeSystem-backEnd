const Router = require('koa-router')
const usersRepository = require('../repositories/userRepository')
const router = new Router()

router.get('/', () => {
  return usersRepository.findAllUsers()
})

router.get('/:id', async (ctx) => {
  const { id: userId } = ctx.user || {}
  const id = ctx.params.id === 'me' ? userId : ctx.params.id
  const users = await usersRepository.findAllUsers({ id, withAdmin: true })
  return users[0]
})

module.exports = {
  path: '/users',
  router,
}
