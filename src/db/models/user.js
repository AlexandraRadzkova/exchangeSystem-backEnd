module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passport: {
        type: DataTypes.STRING,
        unique: true,
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      passwordSalt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
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
