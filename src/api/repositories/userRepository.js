const sequelize = require('sequelize')
const { Op } = sequelize
const BaseRepository = require('./common/baseRepository')
const db = require('../../db')
const passwordHash = require('../../utils/passwordHash')
const transactionRepository = require('./transactionRepository')
const { DAILY_TRANSACTIONS_RESTRICTION } = require('../../constants')

class UserRepository extends BaseRepository {
  serialize(item) {
    const { id, firstname, lastname, passport, role } = item
    return {
      id,
      firstname,
      lastname,
      passport,
      isAdmin: role === this.model.ROLE.ADMIN,
    }
  }

  async findAllUsers({ id, withAdmin = false } = {}) {
    const start = new Date()
    start.setHours(0, 0, 0, 0)

    const users = await this.findAll({
      where: {
        ...(withAdmin ? {} : { role: this.model.ROLE.USER }),
        ...(id ? { id } : {}),
      },
    })
    for (let user of users) {
      user.transactions = {
        allTimeAmount: await transactionRepository.model.sum('amount', {
          where: { userId: user.id },
        }),
        allTimeCount: await transactionRepository.model.count({
          where: { userId: user.id },
        }),
        dailyAmount: await transactionRepository.model.sum('amount', {
          where: {
            userId: user.id,
            timestamp: { [Op.gte]: start.toUTCString() },
          },
        }),
      }
      user.transactions.beforeLimit =
        DAILY_TRANSACTIONS_RESTRICTION - user.transactions.dailyAmount
    }
    return users
  }

  createUser({ password, ...rest }) {
    const { hash, salt } = passwordHash.create(password)
    const userRole = this.model.ROLE.USER
    return this.create({
      role: userRole,
      passwordHash: hash,
      passwordSalt: salt,
      ...rest,
    })
  }

  findAdmin() {
    return this.findOne(
      { where: { role: this.model.ROLE.ADMIN } },
      { skipSerialize: true },
    )
  }

  findOrCreateByPassport(passport, data) {
    if (!passport) {
      throw Error('Password is not provided to findOrCreateByPassport')
    }
    return this.findOrCreate({ passport }, data)
  }
}

module.exports = new UserRepository(db.User)
