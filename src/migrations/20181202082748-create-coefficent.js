'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Coefficents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sellValue: {
        allowNull: false,
        type: Sequelize.DECIMAL,
        precision: 15,
        scale: 2,
      },
      buyValue: {
        allowNull: false,
        type: Sequelize.DECIMAL,
        precision: 15,
        scale: 2,
      },
      currencyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      timestampFrom: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      timestampTo: {
        type: Sequelize.DATE,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Coefficents')
  },
}
