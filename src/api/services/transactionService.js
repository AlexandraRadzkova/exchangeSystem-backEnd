const { DAILY_TRANSACTIONS_RESTRICTION } = require('../../constants')
const repository = require('../repositories/transactionRepository')
const currencyService = require('./currencyService')
const userService = require('./userService')
const moneyConversionService = require('./moneyConversionService')

module.exports = {
  async findAllTransactions({ userId, timeFrom, timeTo }) {
    return {
      transactions: await repository.transactionsWithDetails({
        userId,
        timeFrom,
        timeTo,
      }),
      info: await repository.allTransactionsInfo({ userId, timeFrom, timeTo }),
    }
  },
  async findTransaction(id) {
    const transactions = await repository.transactionsWithDetails({ id })
    return transactions[0]
  },
  async createTransaction(
    { firstname, lastname, passport },
    { currencyFromCode, currencyToCode, amount },
  ) {
    if (!passport) {
      throw Error('Passport should be provided')
    }
    if (!currencyFromCode || !currencyToCode) {
      throw Error('Currency codes should be provided')
    }
    const [user] = await userService.findOrCreateUser({
      firstname,
      lastname,
      passport,
    })

    if (!user) {
      throw Error('User cannot be found or created')
    }

    const [currencyFrom, currencyTo] = await currencyService.resolveByCodes(
      [currencyFromCode, currencyToCode],
      { skipSerialize: true, includeCoeff: true },
    )

    if (!currencyFrom || !currencyTo) {
      throw Error('Error in currencies searching')
    }

    const calculdatedAmount = moneyConversionService.convert(
      currencyFrom.Coefficents[0],
      currencyTo.Coefficents[0],
      amount,
    )

    const t = await repository.model.sequelize.transaction()
    const transaction = await repository.create(
      {
        currencyFromId: currencyFrom.id,
        currencyToId: currencyTo.id,
        amount,
        userId: user.id,
      },
      { transaction: t },
    )
    await currencyService.changeAmount(
      currencyFrom.id,
      currencyFrom.amount + amount,
      { transaction: t },
    )
    await currencyService.changeAmount(
      currencyTo.id,
      currencyTo.amount - calculdatedAmount,
      { transaction: t },
    )
    await t.commit()

    return {
      transaction: {
        ...transaction,
        currencyFromCode,
        currencyToCode,
      },
      user,
    }
  },

  validateTransaction(transaction) {
    this.validateUserDailyRestriction(transaction.userId)
  },

  validateUserDailyRestriction(transaction) {
    const amount = repository.usertransactionsAmount(transaction.userId)
    if (amount > DAILY_TRANSACTIONS_RESTRICTION) {
      throw Error(
        'Too much transactions for the day. Please try again tomorrow',
      )
    }
  },
}
