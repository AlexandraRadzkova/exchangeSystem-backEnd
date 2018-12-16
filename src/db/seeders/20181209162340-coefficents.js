'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Coefficents',
      [
        {
          currencyId: 1,
          buyValue: 2.13,
          sellValue: 2.14,
        },
        {
          currencyId: 2,
          buyValue: 2.415,
          sellValue: 2.43,
        },
        {
          currencyId: 3,
          buyValue: 1,
          sellValue: 1,
        },
        {
          currencyId: 4,
          buyValue: 4,
          sellValue: 5,
        },
        {
          currencyId: 5,
          buyValue: 3.18,
          sellValue: 3.2,
        },
      ],
      {},
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Coefficents', null, {})
  },
}
