module.exports = (sequelize, DataTypes) => {
  const Currency = sequelize.define(
    'Currency',
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
      displayCount: DataTypes.INTEGER,
    },
    {},
  )
  Currency.associate = function(models) {
    Currency.hasMany(models.Coefficent, { foreignKey: 'currencyId' })
  }
  return Currency
}
