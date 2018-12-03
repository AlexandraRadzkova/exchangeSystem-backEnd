module.exports = {
  up(num, precision) {
    precision = Math.pow(10, precision)
    return Math.ceil(num * precision) / precision
  },
  down(num, precision) {
    precision = Math.pow(10, precision)
    return Math.floor(num * precision) / precision
  },
}
