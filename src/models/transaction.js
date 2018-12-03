'use strict'
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      amount: DataTypes.DECIMAL,
      timestamp: DataTypes.DATE,
    },
    {},
  )
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Currency, { as: 'currencyFrom' })
    Transaction.belongsTo(models.Currency, { as: 'currencyTo' })
    Transaction.belongsTo(models.User)
  }
  return Transaction
}
