'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      role: DataTypes.INTEGER,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      passport: {
        type: DataTypes.STRING,
        unique: true,
      },
      passwordHash: DataTypes.STRING,
    },
    {},
  )
  User.associate = function(models) {
    User.belongsTo(models.Currency)
  }
  User.ROLE = {}
  User.ROLE.ADMIN = 0
  User.ROLE.USER = 1
  return User
}
