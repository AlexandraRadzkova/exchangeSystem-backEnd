const requestsLogger = require('./requestsLogger')
const bodyResolver = require('./bodyResolver')
const errorsHandler = require('./errorsHandler')
const userResolver = require('./userResolver')

const middlewares = [requestsLogger, errorsHandler, bodyResolver, userResolver]

module.exports = async function applyMiddlewares(app) {
  for (let middleware of middlewares) {
    app.use(middleware)
  }
}
