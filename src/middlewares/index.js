const requestsLogger = require('./requestsLogger')
const bodyResolver = require('./bodyResolver')
const errorsHandler = require('./errorsHandler')

const middlewares = [requestsLogger, errorsHandler, bodyResolver]

module.exports = async function applyMiddlewares(app) {
  for (let middleware of middlewares) {
    app.use(middleware)
  }
}
