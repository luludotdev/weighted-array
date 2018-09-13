# 🎲 Weighted Map
[![NPM version](https://img.shields.io/npm/v/weighted-map.svg?maxAge=3600)](https://www.npmjs.com/package/weighted-map)
[![NPM downloads](https://img.shields.io/npm/dt/weighted-map.svg?maxAge=3600)](https://www.npmjs.com/package/weighted-map)
[![Build status](https://travis-ci.org/lolPants/weighted-array.svg)](https://travis-ci.org/lolPants/weighted-array)
[![Dependencies](https://img.shields.io/david/lolpants/weighted-map.svg?maxAge=3600)](https://david-dm.org/lolpants/weighted-map)
[![Coverage Status](https://coveralls.io/repos/github/lolPants/weighted-array/badge.svg?branch=master)](https://coveralls.io/github/lolPants/weighted-array?branch=master)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FlolPants%2Fweighted-array.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FlolPants%2Fweighted-array?ref=badge_shield)

##### Select a random element from a weighted array.

## 💾 Installation
The package is on the NPM registry as `weighted-map`. Simply install it with your NPM client of choice.

## 🔧 Usage
First, import the module:
```js
const weightedMap = require('weighted-map')
```

The `select()` function takes a Map. Maps should be of type `Map<T, number>` where key `T` is your object, and value `number` is the relative weight for that key.

There is also the `selectUnique*()` ES6 generator which will return randomly but without sequential repeats.

Both return one object from the array, with the whole object intact.

### 📝 Example
```js
// Import the module
const { select } = require('weighted-map')

const map = new Map()
  .set('ben', 1)
  .set('jerry', 2)

console.log(select(map)) // -> Will return 'jerry' twice as often as 'ben'
```

## ❤ Thanks
* [weighted-random](https://www.npmjs.com/package/weighted-random)


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FlolPants%2Fweighted-array.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FlolPants%2Fweighted-array?ref=badge_large)