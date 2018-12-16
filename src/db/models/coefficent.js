module.exports = (sequelize, DataTypes) => {
  const Coefficent = sequelize.define(
    'Coefficent',
    {
      sellValue: DataTypes.DECIMAL,
      buyValue: DataTypes.DECIMAL,
      timestampFrom: DataTypes.DATE,
      timestampTo: DataTypes.DATE,
    },
    {
      timestamps: false,
    },
  )
  Coefficent.associate = function(models) {
    Coefficent.belongsTo(models.Currency, { as: 'currency' })
  }
  return Coefficent
}
