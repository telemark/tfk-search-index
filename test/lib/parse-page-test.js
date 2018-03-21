var fs = require('fs')
var tap = require('tap')
var parsePage = require('../../lib/parse-page')

tap.test('requires input', async test => {
  var expectedErrorMessage = 'Missing required input'
  var inputData = false

  return parsePage(inputData).then(console.log).catch(error => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('returns expected data', test => {
  var expectedData = require('./../data/parsepage.data.json')
  var rawData = fs.readFileSync('test/data/data.html')

  return parsePage(rawData).then(data => {
    tap.equal(JSON.stringify(data, null, 2), JSON.stringify(expectedData, null, 2), 'Expected data, OK')
    test.done()
  }).catch(error => {
    throw error
  })
})

tap.test('returns error for nonexisting urls', test => {
  var nonExistentUrl = 'https://this.does.not.exist.hallibutrullensnurf.io'

  return parsePage(nonExistentUrl)
    .then(console.log).catch(error => {
      tap.ok(error, 'Expected error, OK')
      test.done()
    })
})
