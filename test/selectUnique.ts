import test from 'ava'
import { selectUnique } from '../src'

test('is a function', t => {
  t.is(typeof selectUnique, 'function')
})
