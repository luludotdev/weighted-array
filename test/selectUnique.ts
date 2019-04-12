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

test('respects max iterations', t => {
  const limit = 10
  const random = selectUnique(testMap2, limit)
  let results: Array<string | undefined> = []

  for (let i = 0; i < limit + 100; i++) {
    const value = random.next().value
    results = [...results, value]
  }

  const values = results.filter(x => x !== undefined)
  t.is(random.next().done, true)
  return t.is(values.length, limit)
})
