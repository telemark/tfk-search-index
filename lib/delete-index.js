'use strict'

var Wreck = require('wreck')
var generateToken = require('../lib/generate-token')
var config = require('../config')
var indexUrl = config.SEARCH_SERVICE_URL
var token = generateToken({key: config.JWT_KEY, payload: {system: 'tfk-search-index'}})
var wreckOptions = {
  json: true,
  headers: {
    Authorization: token
  }
}

function deleteIndex (callback) {
  Wreck.delete(indexUrl, wreckOptions, function (error, response, payload) {
    if (error) {
      return callback(error, null)
    } else {
      return callback(null, payload)
    }
  })
}

module.exports = deleteIndex
