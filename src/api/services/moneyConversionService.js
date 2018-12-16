const roundNumber = require('../../utils/roundNumber')

module.exports = {
  convert(coeffFrom, coeffTo, amount) {
    const units = currencyToUnits(coeffFrom, amount)
    return unitsToCurrency(coeffTo, units)
  },

  convertReverse(coeffFrom, coeffTo, amount = 1) {
    const units = currencyToUnitsReverse(coeffTo, amount)
    return unitsToCurrencyReverse(coeffFrom, units)
  },
}

function currencyToUnitsReverse(coeff, amount) {
  return roundNumber.up(amount * coeff.sellValue, 2)
}

function currencyToUnits(coeff, amount) {
  return roundNumber.up(amount * coeff.buyValue, 2)
}

function unitsToCurrencyReverse(coeff, amount) {
  return roundNumber.down(amount / coeff.buyValue, 2)
}

function unitsToCurrency(coeff, amount) {
  return roundNumber.down(amount / coeff.sellValue, 2)
}
