import test from 'ava'
import { select } from '../src'

test('is a function', t => {
  t.is(typeof select, 'function')
})
