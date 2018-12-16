const BaseRepository = require('./common/baseRepository')
const db = require('../../db')

class CurrencyRepository extends BaseRepository {
  serialize(item) {
    const { id, name, code, displayCount } = item
    return { id, name, code, displayCount }
  }

  findByCode(code) {
    return this.findOne({ where: { code } })
  }

  findByCodes(codes, { skipSerialize, includeCoeff = false } = {}) {
    return this.findAll(
      {
        where: { code: codes },
        ...(includeCoeff ? { include: [{ model: db.Coefficent }] } : {}),
      },
      { skipSerialize },
    )
  }

  findByIds(id, { skipSerialize, includeCoeff = false } = {}) {
    return this.findAll(
      {
        where: { id },
        ...(includeCoeff ? { include: [{ model: db.Coefficent }] } : {}),
      },
      { skipSerialize },
    )
  }
}

module.exports = new CurrencyRepository(db.Currency)
