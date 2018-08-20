const weightedRandom = require('weighted-random')
const errors = require('./errors.js')

/**
 * @template T
 * @param {Map<T, number>} input Array of Weighted Objects
 * @returns {T}
 */
const select = input => {
  // Argument Validation
  if (!(input instanceof Map)) throw errors.inputError

  // Weight Validation
  for (let [, weight] of input.entries()) {
    if (Number.isNaN(parseFloat(weight))) throw errors.invalidWeight
  }

  // Actually select a value
  const weights = [...input.values()]
  let index = weightedRandom(weights)
  return [...input.keys()][index]
}

/**
 * @template T
 * @param {Map<T, number>} input Array of Weighted Objects
 */
const selectUnique = function* selectUnique (input) {
  let prev = ''
  while (true) {
    // Pick a new value
    let val = select(input)
    // Check if it was the previous value
    while (val === prev) { val = select(input) }

    // Set the new previous value and return
    prev = val
    yield val
  }
}

module.exports = { select, selectUnique }
