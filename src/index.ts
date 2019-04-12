import { ERR_INPUT_TYPE, ERR_INVALID_WEIGHT } from './errors'
import { weightedRandom } from './random'

type WeightedMap<T> = Map<T, number | string>

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

export const selectUnique = function*<T>(
  input: WeightedMap<T>
): IterableIterator<T> {
  let prev: T | undefined

  while (true) {
    // Pick a new value
    let val = select(input)

    // Check if it was the previous value
    while (val === prev) {
      val = select(input)
    }

    // Set the new previous value and return
    prev = val
    yield val
  }
}
