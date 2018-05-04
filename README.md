# 🎲 Weighted Array
[![NPM version](https://img.shields.io/npm/v/weighted-array.svg?maxAge=3600)](https://www.npmjs.com/package/weighted-array)
[![NPM downloads](https://img.shields.io/npm/dt/weighted-array.svg?maxAge=3600)](https://www.npmjs.com/package/weighted-array)
[![Build status](https://travis-ci.org/lolPants/weighted-array.svg)](https://travis-ci.org/lolPants/weighted-array)
[![Dependencies](https://img.shields.io/david/lolpants/weighted-array.svg?maxAge=3600)](https://david-dm.org/lolpants/weighted-array)
[![Coverage Status](https://coveralls.io/repos/github/lolPants/weighted-array/badge.svg?branch=master)](https://coveralls.io/github/lolPants/weighted-array?branch=master)

##### Select a random element from a weighted array.

## 💾 Installation
The package is on the NPM registry as `weighted-array`. Simply install it with your NPM client of choice.

## 🔧 Usage
First, import the module:
```js
const weightedArray = require('weighted-array')
```

The `select()` function takes an array of objects. Every object must have at least the key: `weight: number`. This is a weight relative to each other object in the array.

There is also the `selectUnique*()` ES6 generator which will return randomly but without sequential repeats.

Both return one object from the array, with the whole object intact.

### 📝 Example
```js
// Import the module
const { select } = require('weighted-array')

const array = [
  { weight: 1, name: 'Ben' },
  { weight: 2, name: 'Jerry' },
]

console.log(select(array)) // -> Will return Jerry twice as often as Ben
```

## ❤ Thanks
* [weighted-random](https://www.npmjs.com/package/weighted-random)
