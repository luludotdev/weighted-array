module.exports = {
  inputError: new Error(`'input' is not an array`),
  undefinedWeight: new Error('one or more objects in the input have missing weight values'),
  invalidWeight: new Error('one or more objects in the input have invalid weight values'),
}
