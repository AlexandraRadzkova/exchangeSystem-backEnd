'use strict'
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    'Session',
    {
      token: DataTypes.STRING,
    },
    {},
  )
  Session.associate = function(models) {
    Session.belongsTo(models.User)
  }
  return Session
}
