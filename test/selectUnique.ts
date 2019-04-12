import test from 'ava'
import { selectUnique } from '../src'
import { testMap2 } from './helpers'

test('is a function', t => {
  return t.is(typeof selectUnique, 'function')
})

test('produces unique values', t => {
  const random = selectUnique(testMap2)
  let results: string[] = []

  for (let i = 0; i < 500; i++) {
    const value = random.next().value
    results = [...results, value]
  }

  let dupes = false
  for (const i in results) {
    if (results[i] === undefined) continue
    if (results[i] === results[parseInt(i, 10) + 1]) dupes = true
  }

  return t.is(dupes, false)
})
