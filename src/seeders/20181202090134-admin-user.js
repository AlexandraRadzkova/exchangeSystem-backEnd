'use strict'
const crypto = require('crypto')
const env = require('../utils/env')
const cryptoService = require('../services/cryptoService')
const db = require('../models')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          firstname: 'Admin',
          lastname: 'Admin',
          role: db.User.ROLE.ADMIN,
          passwordHash: cryptoService.create(env.ADMIN_PASSWORD).hash,
        },
      ],
      {},
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {})
  },
}
