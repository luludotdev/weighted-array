import test from 'ava'
import { select } from '../src'
import { ERR_INPUT_TYPE, ERR_INVALID_WEIGHT } from '../src/errors'
import { checkValue, testMap1 } from './helpers'

test('is a function', t => {
  return t.is(typeof select, 'function')
})

test('input accepts a Map()', t => {
  return t.notThrows(() => select(testMap1))
})

test('input does not accept strings', t => {
  // @ts-ignore
  const error = t.throws(() => select('yeet'), Error)
  return t.is(error, ERR_INPUT_TYPE)
})

test('array weights can be numbers', t => {
  const map = new Map([['a', 5]])
  return t.notThrows(() => select(map))
})

test('array weights can be numerical strings', t => {
  const map = new Map([['a', '5']])
  return t.notThrows(() => select(map))
})

test('array weights cannot be non-numerical strings', t => {
  const map = new Map([['a', 'five']])
  const error = t.throws(() => select(map), Error)
  return t.is(error, ERR_INVALID_WEIGHT)
})

test('run with test data', t => {
  let a = 0
  let b = 0

  for (let i = 0; i < 10000; i++) {
    const value = select(testMap1)
    if (value === 'A') a++
    if (value === 'B') b++
  }

  const percentA = (a / (a + b)) * 100
  const percentB = (b / (a + b)) * 100
  const result = [
    checkValue(25, percentA, 0.1),
    checkValue(75, percentB, 0.1),
  ].every(x => x === true)
  return t.is(result, true)
})
