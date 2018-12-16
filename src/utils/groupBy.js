module.exports = function groupBy(arr, key, single = false) {
  return arr.reduce((hash, item) => {
    if (single) {
      hash[item[key]] = item
    } else {
      hash[item[key]] = (hash[item[key]] || []).concat(item)
    }
    return hash
  }, {})
}
