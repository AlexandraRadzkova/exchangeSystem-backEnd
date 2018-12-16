const env = require('../../utils/env')
const passwordHash = require('../../utils/passwordHash')
const db = require('..')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { hash, salt } = passwordHash.create(env.ADMIN_PWD)
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          firstname: 'Admin',
          lastname: 'Admin',
          role: db.User.ROLE.ADMIN,
          passwordHash: hash,
          passwordSalt: salt,
        },
      ],
      {},
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {})
  },
}
