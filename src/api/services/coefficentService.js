const Sequelize = require('sequelize')
const repository = require('../repositories/coefficentRepository')

module.exports = {
  expireAllByCurrencyId(currencyId) {
    return repository.updateByCurrencyId(currencyId, {
      timestampTo: Sequelize.fn('NOW'),
    })
  },

  createCoefficent(currencyId, params) {
    return repository.createByCurrencyId(currencyId, params)
  },
}
