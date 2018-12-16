module.exports = class BaseRepository {
  constructor(model) {
    this.model = model
  }
  _serialize(item) {
    return item ? this.serialize(item.toJSON()) : null
  }
  serialize(item) {
    return item
  }
  async findAll(params, { skipSerialize = false } = {}) {
    let items = this.model.findAll(params)
    if (!skipSerialize) {
      items = items.map(this._serialize.bind(this))
    }
    return items
  }
  findAllById(ids) {
    return this.findAll({ where: { id: ids } })
  }
  findOne(params, { skipSerialize = false } = {}) {
    return this.model
      .findOne(params)
      .then((entity) => (skipSerialize ? entity : this._serialize(entity)))
  }
  async findById(id) {
    const entity = await this.model.findByPk(id)
    return this._serialize(entity)
  }
  async create(params, options) {
    const entity = await this.model.create(params, options)
    return this._serialize(entity)
  }
  update(searchParams, updateParams) {
    return this.model.update(updateParams, searchParams)
  }
  updateById(id, params, options) {
    return this.update({ where: { id } }, params, options)
  }
  deleteById(id) {
    return this.model.destroy({ where: { id } })
  }
  async findOrCreate(where, defaults) {
    const [newItem, created] = await this.model.findOrCreate({
      where,
      defaults,
    })
    return [newItem, created]
  }
}
