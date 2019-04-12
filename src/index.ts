import { ERR_INPUT_TYPE, ERR_INVALID_WEIGHT } from './errors'
import { weightedRandom } from './random'

export type WeightedMap<T> = Map<T, number | string>

/**
 * Select a random element from a weighted Map
 * @param input Array of Weighted Objects
 */
export const select: <T>(input: WeightedMap<T>) => T = input => {
  // Argument Validation
  if (!(input instanceof Map)) throw ERR_INPUT_TYPE

  // Weight Validation
  for (const [, weight] of input.entries()) {
    const w = typeof weight === 'number' ? weight : parseFloat(weight)
    if (Number.isNaN(w)) throw ERR_INVALID_WEIGHT
  }

  // Actually select a value
  const weights = [...input.values()].map(x =>
    typeof x === 'number' ? x : parseFloat(x)
  )
  const index = weightedRandom(weights)
  return [...input.keys()][index]
}

/**
 * Select a unique random element from a weighted Map sequentially
 * @param input Array of Weighted Objects
 */
export const selectUnique = function*<T>(
  input: WeightedMap<T>,
  maxIterations?: number
): IterableIterator<T> {
  let prev: T | undefined

  let iterations = 0
  while (maxIterations === undefined || iterations < maxIterations) {
    // Pick a new value
    let val = select(input)

    // Check if it was the previous value
    while (val === prev) {
      val = select(input)
    }

    // Set the new previous value and return
    prev = val
    yield val
    iterations++
  }
}
