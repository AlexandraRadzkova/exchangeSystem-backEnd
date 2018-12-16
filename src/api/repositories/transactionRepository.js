const sequelize = require('sequelize')
const { Op } = sequelize
const BaseRepository = require('./common/baseRepository')
const currencyRepository = require('./currencyRepository')
const moneyConversionService = require('../services/moneyConversionService')
const currencyService = require('../services/currencyService')
const db = require('../../db')

class TransactionRepository extends BaseRepository {
  userTransactionsAmount(userId) {
    return this.model.sum('amount', { where: { userId } })
  }

  async transactionsWithDetails({ id, userId, timeFrom, timeTo } = {}) {
    let rawTransactions = await this.findAll({
      where: {
        ...(id ? { id } : {}),
        ...(userId ? { userId } : {}),
        ...(timeFrom ? { timestamp: { [Op.gte]: timeFrom } } : {}),
        ...(timeTo ? { timestamp: { [Op.lte]: timeTo } } : {}),
      },
      include: [
        { model: db.Currency, as: 'currencyFrom' },
        { model: db.Currency, as: 'currencyTo' },
        { model: db.User, as: 'user' },
      ],
    })
    const transactions = []
    for (let transaction of rawTransactions) {
      const [currencyFrom, currencyTo] = await currencyService.resolveByIds(
        [transaction.currencyFromId, transaction.currencyToId],
        { skipSerialize: true, includeCoeff: true },
      )
      const receivedAmount = moneyConversionService.convert(
        currencyFrom.Coefficents[0],
        currencyTo.Coefficents[0],
        transaction.amount,
      )

      transactions.push({ ...transaction, receivedAmount })
    }
    return transactions
  }

  async allTransactionsInfo({ id, userId, timeFrom, timeTo }) {
    var start = new Date()
    start.setHours(0, 0, 0, 0)
    const tsSearchParams =
      timeFrom || timeTo
        ? {
            ...(timeFrom ? { [Op.gte]: timeFrom } : {}),
            ...(timeTo ? { [Op.lte]: timeTo } : {}),
          }
        : undefined
    const searchParams =
      id || userId || tsSearchParams
        ? {
            ...(id ? { id } : {}),
            ...(userId ? { userId } : {}),
            ...(tsSearchParams ? { timestamp: tsSearchParams } : {}),
          }
        : undefined

    const [currencyFrom, currencyFromAmount] = await this.mostPopularCurrency(
      'currencyFromId',
      searchParams,
    )
    const [currencyTo, currencyToAmount] = await this.mostPopularCurrency(
      'currencyToId',
      searchParams,
    )

    return {
      count: await this.model.count({ where: searchParams }),
      amount: await this.model.sum('amount', { where: searchParams }),
      dailyAmount: await this.model.sum('amount', {
        where: {
          ...searchParams,
          timestamp: { ...tsSearchParams, [Op.gte]: start.toUTCString() },
        },
      }),
      mostPopular: {
        currencyFrom,
        currencyFromAmount,
        currencyTo,
        currencyToAmount,
      },
    }
  }

  async mostPopularCurrency(field, searchParams) {
    console.log('searchParams', searchParams)
    const currenciesWithCount = await this.findAll({
      group: [field],
      attributes: [
        [field, 'currencyId'],
        [sequelize.fn('COUNT', field), 'count'],
      ],
      where: searchParams,
      order: [[sequelize.fn('COUNT', field), 'desc']],
    })
    const { currencyId, count } = currenciesWithCount[0] || {}
    const currency = currencyId
      ? await currencyRepository.findById(currencyId)
      : null
    return [currency, +count]
  }
}

module.exports = new TransactionRepository(db.Transaction)
