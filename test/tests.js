const { describe, it } = require('mocha')
const { expect } = require('chai')

const { select, selectUnique } = require('../src/index.js')

describe('Types', () => {
  it('select() should be a function', () => {
    expect(select).to.be.a('function')
  })
  it('selectUnique() should be a function', () => {
    expect(selectUnique).to.be.a('function')
  })
})
