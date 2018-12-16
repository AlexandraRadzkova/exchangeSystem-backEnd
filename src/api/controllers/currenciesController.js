const Router = require('koa-router')
const adminOnly = require('../middlewares/adminOnly')
const currencyService = require('../services/currencyService')
const router = new Router()

router.get('/', (ctx) => {
  const { code, reversed, amount } = ctx.query
  return currencyService.calcCurrencies(code, { reversed, amount })
})

router.use(adminOnly)

router.put('/:code', (ctx) => {
  const { code } = ctx.params
  const { sellValue, buyValue } = ctx.request.body
  return currencyService.applyNewCoeffByCode(code, {
    sellValue,
    buyValue,
  })
})

module.exports = {
  path: '/currencies',
  router,
}
