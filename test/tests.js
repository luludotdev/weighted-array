// Test Suites
const { describe, it } = require('mocha')
const { expect } = require('chai')

// Local Package
const { select, selectUnique } = require('../src/index.js')
const errors = require('../src/errors.js')

// Test Data
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
})

describe('selectUnique()', () => {
  it('should be a function', () => {
    expect(selectUnique).to.be.a('function')
  })
})
