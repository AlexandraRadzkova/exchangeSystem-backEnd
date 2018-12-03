module.exports = {
  _serialize(item) {
    return item ? this.serialize(item.toJSON()) : null
  },
  serialize(item) {
    return item
  },
  findAll: function(params) {
    return this.model.findAll(params).map(this._serialize.bind(this))
  },
  findOne(params) {
    return this.model.findOne(params).then(function(entity) {
      return this._serialize(entity)
    })
  },
  async findById(id) {
    const entity = await this.model.findByPk(id)
    return this._serialize(entity)
  },
  async create(params) {
    const entity = await this.model.create(params)
    return this.findById(entity.id)
  },
  update(searchParams, updateParams) {
    return this.model.update(updateParams, searchParams)
  },
  updateById(id, params) {
    return this.update({ where: { id } }, params)
  },
  deleteById(id) {
    return this.model.destroy({ where: { id } })
  },
}
