'use strict'

var Wreck = require('wreck')
var generateToken = require('../lib/generate-token')
var config = require('../config')
var indexUrl = config.SEARCH_SERVICE_URL + '/' + config.SEARCH_SERVICE_INDEX + '/' + config.SEARCH_SERVICE_INDEX_TYPE
var token = generateToken({key: config.JWT_KEY, payload: {system: 'tfk-search-index'}})
var wreckOptions = {
  json: true,
  headers: {
    Authorization: token
  }
}

console.log(indexUrl)

function addIndex (payload, callback) {
  if (!payload) {
    return callback(new Error('Missing required input: payload'), null)
  }

  wreckOptions.payload = JSON.stringify(payload)

  Wreck.post(indexUrl, wreckOptions, function (error, response, payload) {
    if (error) {
      return callback(error, null)
    } else {
      return callback(null, payload)
    }
  })
}

module.exports = addIndex
