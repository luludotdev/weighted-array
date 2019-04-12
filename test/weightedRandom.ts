import test from 'ava'
import { weightedRandom } from '../src/random'

const randomWeights = (length: number) => {
  const weights = new Array(length)
  let i: number

  for (i = 0; i < length; i++) {
    weights[i] = Math.random() / Math.random() // Occasionally > 1
  }

  return weights
}

test('returns -1 when given no array', t => {
  // @ts-ignore
  const result = weightedRandom()
  return t.is(result, -1)
})

test('returns -1 for an empty array', t => {
  const result = weightedRandom([])
  return t.is(result, -1)
})

test('returns -1 for an array with no weights', t => {
  const result = weightedRandom([0, 0])
  return t.is(result, -1)
})

test('returns 0 for an array with a single weight', t => {
  const result = weightedRandom([1])
  return t.is(result, 0)
})

test("returns the greater weight's index", t => {
  t.is(weightedRandom([1, 0]), 0)
  t.is(weightedRandom([0, 1]), 1)
})

test('always returns an integer', t => {
  const weights = randomWeights(10)
  let i: number
  let result: number

  for (i = 0; i < 100; i++) {
    result = weightedRandom(weights)
    t.is(result % 1 === 0, true)
  }
})

test('always returns an index within bounds', t => {
  const weights = randomWeights(10)
  let i: number
  let result: number

  for (i = 0; i < 100; i++) {
    result = weightedRandom(weights)
    t.is(result >= 0 && result < weights.length, true)
  }
})

test('does not mutate weights', t => {
  const weights = randomWeights(10)
  const copy = weights.slice()

  weightedRandom(weights)
  t.deepEqual(weights, copy)
})
