'use strict'

var tap = require('tap')
var repackContent = require('../lib/repack-content')

tap.throws(
  function () {
    var data = false
    repackContent(data)
  },
  {message: 'Missing required input'},
  'it requires input'
)

tap.test('returns expected data', function (test) {
  var inputData = require('./data/xray.data.json')
  var expectedData = require('./data/repacked.data.json')
  var actualData = repackContent(inputData)

  tap.equal(JSON.stringify(expectedData, null, 2), JSON.stringify(actualData, null, 2), 'Expected data, OK')
  test.done()
})
