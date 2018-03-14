var tap = require('tap')
var generateToken = require('../../lib/generate-token')

tap.throws(
  function () {
    generateToken()
  },
  {message: 'Missing required input: options object'},
  'Throws if options not supplied'
)

tap.throws(
  function () {
    var options = {
      key: false
    }
    generateToken(options)
  },
  {message: 'Missing required input: options.key'},
  'Throws if options.key not supplied'
)

tap.throws(
  function () {
    var options = {
      key: true,
      payload: false
    }
    generateToken(options)
  },
  {message: 'Missing required input: options.payload'},
  'Throws if options.payload not supplied'
)
