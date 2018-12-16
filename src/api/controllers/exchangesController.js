const groupBy = require('../../utils/groupBy')
const Router = require('koa-router')
const router = new Router()
const adminOnly = require('../middlewares/adminOnly')
const transactionService = require('../services/transactionService')

router.post('/', (ctx) => {
  const { user, transaction } = ctx.request.body
  return transactionService
    .createTransaction(user, transaction)
    .then((resp) => ({
      success: true,
      data: resp,
    }))
    .catch((err) => ({
      success: false,
      errors: groupBy(err.errors, 'path', true),
    }))
})

router.use(adminOnly)

router.get('/', async (ctx) => {
  const { userId, timeFrom, timeTo } = ctx.request.query
  return transactionService
    .findAllTransactions({ userId, timeFrom, timeTo })
    .then((data) => ({ success: true, data }))
})

router.get('/:id', async (ctx) => {
  const { id } = ctx.params
  return transactionService
    .findTransaction(id)
    .then((data) => ({ success: true, data }))
})

module.exports = {
  path: '/exchanges',
  router,
}
