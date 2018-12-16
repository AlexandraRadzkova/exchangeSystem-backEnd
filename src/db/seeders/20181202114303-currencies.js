module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Currencies',
      [
        {
          name: 'US Dollar',
          code: 'USD',
          displayCount: 1,
          amount: 10000,
        },
        {
          name: 'Euro',
          code: 'EUR',
          displayCount: 1,
          amount: 10000,
        },
        {
          name: 'Belarusian Ruble',
          code: 'BYN',
          displayCount: 1,
          amount: 10000,
        },
        {
          name: 'Israel Shekel',
          code: 'ILS',
          displayCount: 1,
          amount: 10000,
        },
        {
          name: 'Russian Rouble',
          code: 'RUB',
          displayCount: 100,
          amount: 10000,
        },
      ],
      {},
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Currency', null, {})
  },
}
