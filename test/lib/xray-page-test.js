var fs = require('fs')
var tap = require('tap')
var xrayPage = require('../../lib/xray-page')

tap.test('requires input', test => {
  var expectedErrorMessage = 'Missing required input'
  var inputData = false

  return xrayPage(inputData)
    .then(console.log)
    .error(error => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.done()
    })
})

tap.test('returns expected data', test => {
  var expectedData = require('./../data/xray.data.json')
  var rawData = fs.readFileSync('test/data/data.html')

  return xrayPage(rawData).then(data => {
    tap.equal(JSON.stringify(data, null, 2), JSON.stringify(expectedData, null, 2), 'Expected data, OK')
    test.done()
  }).catch(error => {
    throw error
  })
})

tap.test('returns error for nonexisting urls', test => {
  var nonExistentUrl = 'https://this.does.not.exist.hallibutrullensnurf.io'

  return xrayPage(nonExistentUrl)
    .then(console.log).catch(error => {
      tap.ok(error, 'Expected error, OK')
      test.done()
    })
})
