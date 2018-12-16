const path = require('path')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../../config/database.json')[env]
const includeDirectoryJsFiles = require('../utils/includeDirectoryJsFiles')

const options = {
  operatorsAliases: false,
  ...config,
}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], options)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    options,
  )
}

const models = includeDirectoryJsFiles(
  path.join(__dirname, 'models'),
  null,
  sequelize.import.bind(sequelize),
)
const db = models.reduce((hash, model) => {
  hash[model.name] = model
  return hash
}, {})

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
