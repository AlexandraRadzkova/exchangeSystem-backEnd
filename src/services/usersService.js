const db = require('../models')
const defaultModelService = require('./defaultModelService')
const cryptoService = require('./cryptoService')

module.exports = {
  ...defaultModelService,
  model: db.User,
  findAll() {
    return this.model.findAll({ where: { role: this.model.ROLE.USER } })
  },
  create({ firstname, lastname, passport, password }) {
    return this.create({
      role: this.model.ROLE.USER,
      passwordHash: cryptoService.create(password).hash,
      firstname,
      lastname,
      passport,
    })
  },
}
