const Sequelize = require('sequelize')
const db = require('../models')
const defaultModelService = require('./defaultModelService')
const currenciesService = require('./currenciesService')

module.exports = {
  ...defaultModelService,
  model: db.Coefficent,
  findAllActive() {
    return this.findAll({ where: { timestampTo: null } })
  },
  findByCode(code) {
    return this.findOne({ where: { code } })
  },
  serialize: ({ id, buyValue, sellValue, currencyId }) => ({
    id,
    buyValue,
    sellValue,
    currencyId,
  }),
  async updateCoefficentByCode(code, params) {
    const coefficents = await this.model.findAll({
      include: {
        model: db.Currency,
        as: 'currency',
        where: { code },
      },
      where: { timestampTo: null },
    })
    const coefficent = coefficents[0]
    if (!coefficent) {
      return
    }
    const currency = coefficent.currency
    const coefficentIds = coefficents.map((coefficent) => coefficent.id)
    await this.update(
      { where: { id: coefficentIds } },
      { timestampTo: Sequelize.fn('NOW') },
    )
    return this.create({ currencyId: currency.id, ...params })
  },
}
