const {
  MAX_TRANSACTION_AMOUNT,
  MIN_TRANSACTION_AMOUNT,
} = require('../../constants')

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    amount: {
      type: DataTypes.DECIMAL,
      validate: {
        min: MIN_TRANSACTION_AMOUNT,
        max: MAX_TRANSACTION_AMOUNT,
      },
    },
    timestamp: DataTypes.DATE,
  })
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Currency, { as: 'currencyFrom' })
    Transaction.belongsTo(models.Currency, { as: 'currencyTo' })
    Transaction.belongsTo(models.User, { as: 'user' })
  }
  return Transaction
}
