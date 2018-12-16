const BaseRepository = require('./common/baseRepository')
const db = require('../../db')

class CoefficentRepository extends BaseRepository {
  serialize(item) {
    const { buyValue, sellValue, id, currencyId } = item
    return { buyValue, sellValue, id, currencyId }
  }

  updateByCurrencyId(currencyId, update) {
    return this.update({ where: { currencyId } }, update)
  }

  createByCurrencyId(currencyId, params) {
    return this.create({ currencyId, ...params })
  }

  findAllActive() {
    return this.findAll({ where: { timestampTo: null } })
  }
}

module.exports = new CoefficentRepository(db.Coefficent)
