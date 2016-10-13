'use strict'

var tap = require('tap')
var cleanupText = require('../../lib/cleanup-text')

tap.test('returns expected data', function (test) {
  var inputFile = require('./../data/cleanup.data.json')
  var expectedData = inputFile.cleanedUpData
  var actualData = cleanupText(inputFile.rawData)

  tap.equal(expectedData, actualData, 'Expected data, OK')
  test.done()
})
