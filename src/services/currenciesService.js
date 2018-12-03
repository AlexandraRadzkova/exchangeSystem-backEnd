const db = require('../models')
const env = require('../utils/env')
const defaultModelService = require('./defaultModelService')
const coefficentsService = require('./coefficentsService')
const moneyConversionService = require('./moneyConversionService')

module.exports = {
  ...defaultModelService,
  model: db.Currency,
  async calcRelativeCurrencies(
    defaultCurrencyCodeRaw,
    amount = 1,
    reversed = false,
  ) {
    const defaultCurrencyCode =
      defaultCurrencyCodeRaw || env.DEFAULT_CURRENCY_CODE
    const currencies = await this._getActiveWithCoefficents()

    const results = []
    const defaultCurrency = currencies.find(
      (currency) => currency.code === defaultCurrencyCode,
    )
    currencies.map((currency) => {
      if (currency.code === defaultCurrencyCodeRaw) {
        return
      }
      results.push({
        currency,
        amount: reversed
          ? moneyConversionService.convertReverse(
              currency,
              defaultCurrency,
              amount,
            )
          : moneyConversionService.convert(defaultCurrency, currency, amount),
      })
    })
    return results
  },
  async _getActiveWithCoefficents() {
    const coefficents = await coefficentsService.findAllActive()
    const coefficentsByCurrencyId = coefficents.reduce((hash, coefficent) => {
      hash[coefficent.currencyId] = coefficent
      return hash
    }, {})
    const currenciesIds = Object.keys(coefficentsByCurrencyId)
    const currencies = this.findAll({ where: { id: currenciesIds } })
    return currencies.map((currency) => {
      const coefficent = coefficentsByCurrencyId[currency.id]
      return {
        ...coefficent,
        ...currency,
        coefficentId: coefficent.id,
      }
    })
  },
}
