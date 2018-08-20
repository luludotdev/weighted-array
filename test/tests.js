// Test Suites
const { describe, it } = require('mocha')
const { expect } = require('chai')

// Local Package
const { select, selectUnique } = require('../src/index.js')
const errors = require('../src/errors.js')

// Test Data
const checkValue = (expected, actual, margin) => (Math.abs(actual - expected) / expected) < margin
/**
 * @type {Map<string, number>}
 */
const testMap1 = new Map()
  .set('A', 1)
  .set('B', 3)
/**
 * @type {Map<string, number>}
 */
const testMap2 = new Map()
  .set('A', 1)
  .set('B', 2)
  .set('C', 3)

describe('select()', () => {
  it('should be a function', () => {
    expect(select).to.be.a('function')
  })

  describe('input types', () => {
    it('should accept a Map', () => {
      expect(() => { select(testMap1) }).to.not.throw()
    })

    it('should throw when given a string', () => {
      expect(() => { select('string') }).to.throw(errors.inputError)
    })
  })

  describe('array weights', () => {
    it('should accept numbers', () => {
      expect(() => { select(new Map([['a', 5]])) }).to.not.throw()
    })

    it('should accept numerical string weights', () => {
      expect(() => { select(new Map([['a', '5']])) }).to.not.throw()
    })

    it('should NOT accept non-numerical string weights', () => {
      expect(() => { select(new Map([['a', 'five']])) }).to.throw(errors.invalidWeight)
    })
  })

  describe('test data', () => {
    it('should work with test data', () => {
      let a = 0, b = 0
      for (let i = 0; i < 10000; i++) {
        let value = select(testMap1)
        if (value === 'A') a++
        if (value === 'B') b++
      }

      let percentA = (a / (a + b)) * 100
      let percentB = (b / (a + b)) * 100
      let result = [
        checkValue(25, percentA, 0.1),
        checkValue(75, percentB, 0.1),
      ].every(x => x === true) // eslint-disable-line

      expect(result).to.equal(true)
    })
  })
})

describe('selectUnique()', () => {
  it('should be a function', () => {
    expect(selectUnique).to.be.a('function')
  })

  it('should produce unique values', () => {
    let random = selectUnique(testMap2)
    let results = []

    for (let i = 0; i < 500; i++) {
      let value = random.next().value
      results = [...results, value]
    }

    let dupes = false
    for (let i in results) {
      i = parseInt(i)
      if (results[i] === results[i + 1]) dupes = true
    }
    expect(dupes).to.equal(false)
  })
})
