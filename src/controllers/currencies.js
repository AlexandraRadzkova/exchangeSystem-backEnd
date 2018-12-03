const Router = require('koa-router')
const currenciesService = require('../services/currenciesService')
const coefficentsService = require('../services/coefficentsService')
const router = new Router()

router.get('/', (ctx) => {
  const { code, reversed, amount } = ctx.query
  return currenciesService.calcRelativeCurrencies(code, reversed, amount)
})
router.put('/:code', (ctx) => {
  const { code } = ctx.params
  const { sellValue, buyValue } = ctx.request.body
  return coefficentsService.updateCoefficentByCode(code, {
    sellValue,
    buyValue,
  })
})

module.exports = {
  path: '/currencies',
  router,
}
