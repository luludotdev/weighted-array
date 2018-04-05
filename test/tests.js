// Test Suites
const { describe, it } = require('mocha')
const { expect } = require('chai')

// Local Package
const { select, selectUnique } = require('../src/index.js')
const errors = require('../src/errors.js')

// Test Data
let checkValue = (expected, actual, margin) => (Math.abs(actual - expected) / expected) < margin
const testData = [{ value: 'A', weight: 1 }, { value: 'B', weight: 3 }]

describe('select()', () => {
  it('should be a function', () => {
    expect(select).to.be.a('function')
  })

  describe('input types', () => {
    it('should accept an array', () => {
      expect(() => { select(testData) }).to.not.throw()
    })
    it('should throw when not an array', () => {
      expect(() => { select('string') }).to.throw(errors.inputError)
    })
  })

  describe('array weights', () => {
    it('should throw when weights are missing', () => {
      expect(() => { select([{ value: 5 }]) }).to.throw(errors.undefinedWeight)
    })
    it('should accept numbers', () => {
      expect(() => { select([{ weight: 5 }]) }).to.not.throw()
    })
    it('should accept numerical string weights', () => {
      expect(() => { select([{ weight: '5' }]) }).to.not.throw()
    })
    it('should NOT accept non-numerical string weights', () => {
      expect(() => { select([{ weight: 'five' }]) }).to.throw(errors.invalidWeight)
    })
  })

  describe('test data', () => {
    it('should work with test data', () => {
      let a = 0, b = 0
      for (let i = 0; i < 10000; i++) {
        let { value } = select(testData)
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
})
