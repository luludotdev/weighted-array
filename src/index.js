const weightedRandom = require('weighted-random')
const errors = require('./errors.js')

/**
 * @typedef {Object} WeightedObject
 * @property {number} weight
 * @property {*} value
 */

/**
 * @param {WeightedObject[]} input Array of Weighted Objects
 * @returns {WeightedObject}
 */
const select = input => {
  // Argument Validation
  if (!Array.isArray(input)) throw errors.inputError

  // Weight Validation
  for (let object of input) {
    if (object.weight === undefined) throw errors.undefinedWeight
    if (Number.isNaN(parseFloat(object.weight))) throw errors.invalidWeight
  }

  // Actually select a value
  let weights = input.map(x => parseFloat(x.weight))
  let index = weightedRandom(weights)
  return input[index]
}

/**
 * @param {WeightedObject} input Array of Weighted Objects
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
