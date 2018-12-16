const api = require('./api')
const env = require('./utils/env')
const apiPort = env.API_PORT

module.exports = async function app() {
  console.log(`${process.pid}: Starting api on port ${apiPort}...`)
  await api(apiPort)
  console.log(`${process.pid}: Api is running on port ${apiPort}`)
}
