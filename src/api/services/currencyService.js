const groupBy = require('../../utils/groupBy')
const repository = require('../repositories/currencyRepository')
const coefficentRepository = require('../repositories/coefficentRepository')
const coefficentService = require('./coefficentService')
const moneyConversionService = require('./moneyConversionService')
const { DEFAULT_CURRENCY_CODE } = require('../../constants')

module.exports = {
  async applyNewCoeffByCode(code, { buyValue, sellValue }) {
    const currency = await repository.findByCode(code)

    await coefficentService.expireAllByCurrencyId(currency.id)

    const { displayCount } = currency
    return coefficentService.createCoefficent(currency.id, {
      buyValue: buyValue / displayCount,
      sellValue: sellValue / displayCount,
    })
  },

  async calcCurrencies(rawDefaultCode, { amount = 1, reversed = false } = {}) {
    const defaultCode = rawDefaultCode || DEFAULT_CURRENCY_CODE
    const activeCoefficents = await coefficentRepository.findAllActive()
    const rawCurrenciesWithCoeff = await this.resolveCurrenciesWithCoeff(
      activeCoefficents,
    )

    const currenciesWithCoeff = rawCurrenciesWithCoeff.map((item) => ({
      ...item,
      coefficent: {
        ...item.coefficent,
        buyValue: item.coefficent.buyValue / item.displayCount,
        sellValue: item.coefficent.sellValue / item.displayCount,
      },
    }))

    const defaultCurrencyIndex = currenciesWithCoeff.findIndex(
      (currency) => currency.code === defaultCode,
    )
    if (defaultCurrencyIndex === -1) {
      throw Error(
        `There is no active exchange rate for the selected default currency.`,
      )
    }
    const defaultCurrency = rawDefaultCode
      ? currenciesWithCoeff.splice(defaultCurrencyIndex, 1)[0]
      : currenciesWithCoeff[defaultCurrencyIndex]
    const defaultCurrencyCoeff = defaultCurrency.coefficent

    return currenciesWithCoeff.map(({ coefficent, ...currency }) => ({
      currency: {
        ...currency,
        buyValue: coefficent.buyValue,
        sellValue: coefficent.sellValue,
      },
      amount: reversed
        ? moneyConversionService.convertReverse(
            coefficent,
            defaultCurrencyCoeff,
            amount,
          )
        : moneyConversionService.convert(
            defaultCurrencyCoeff,
            coefficent,
            amount,
          ),
    }))
  },

  async resolveCurrenciesWithCoeff(coefficents) {
    const currencyIds = coefficents.map((coeff) => coeff.currencyId)
    const currencies = await repository.findAllById(currencyIds)
    const coefficentsByCurrencyId = groupBy(coefficents, 'currencyId', true)
    return currencies.map((currency) => ({
      ...currency,
      coefficent: coefficentsByCurrencyId[currency.id],
    }))
  },

  async resolveByCodes(codes, { skipSerialize, includeCoeff = false } = {}) {
    const currencies = await repository.findByCodes(codes, {
      skipSerialize,
      includeCoeff,
    })
    const currenciesByCodes = groupBy(currencies, 'code', true)
    return codes.map((code) => currenciesByCodes[code])
  },

  async resolveByIds(ids, { skipSerialize, includeCoeff = false } = {}) {
    const currencies = await repository.findByIds(ids, {
      skipSerialize,
      includeCoeff,
    })
    const currenciesByIds = groupBy(currencies, 'id', true)
    return ids.map((id) => currenciesByIds[id])
  },

  async changeAmount(currencyId, amount, options) {
    return repository.updateById(currencyId, { amount }, options)
  },
}
