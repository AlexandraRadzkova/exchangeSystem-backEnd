const Router = require('koa-router')
const usersService = require('../services/usersService')
const router = new Router()

router.get('/', () => usersService.findAll())
router.post('/', async (ctx) => {
  const { firstname, lastname, passport, password } = ctx.request.body
  return usersService.create({
    firstname,
    lastname,
    passport,
    password,
  })
})
router.get('/:id', (ctx) => usersService.findById(ctx.params.id))
router.put('/:id', (ctx) => {
  const { firstname, lastname, passport, password } = ctx.request.body
  return usersService.updateById(ctx.params.id, {
    firstname,
    lastname,
    passport,
    password,
  })
})
router.delete('/:id', (ctx) => usersService.deleteById(ctx.params.id))

module.exports = {
  path: '/users',
  router,
}
