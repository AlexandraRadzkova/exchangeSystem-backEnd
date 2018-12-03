const Sequelize = require('sequelize')

module.exports = async function errorsHandler(ctx, next) {
  try {
    const rez = await next()
    return rez
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      ctx.body = {
        error: 'Validation Error',
        errors: error.errors.map((error) => error.message),
      }
    } else {
      ctx.body = {
        success: true,
        message: error.message,
        stack: error.stack,
      }
    }
  }
}
