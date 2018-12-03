const roundNumber = require('../utils/roundNumber')

module.exports = {
  convert(currencyFrom, currencyTo, amount) {
    const units = currencyToUnits(currencyFrom, amount)
    return unitsToCurrency(currencyTo, units)
  },

  convertReverse(currencyFrom, currencyTo, amount = 1) {
    const units = currencyToUnitsReverse(currencyTo, amount)
    return unitsToCurrencyReverse(currencyFrom, units)
  },
}

function currencyToUnitsReverse(currency, amount) {
  return roundNumber.up(amount * currency.sellValue, 2)
}

function currencyToUnits(currency, amount) {
  return roundNumber.up(amount * currency.buyValue, 2)
}

function unitsToCurrencyReverse(currency, amount) {
  return roundNumber.down(amount / currency.buyValue, 2)
}

function unitsToCurrency(currency, amount) {
  return roundNumber.down(amount / currency.sellValue, 2)
}
