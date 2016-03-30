'use strict'

function xrayPage (data, callback) {
  var Xray = require('x-ray')
  var xray = Xray()

  if (!data) {
    return callback(new Error('Missing required input'), null)
  }

  xray(data, {
    title: 'title',
    header: '.article__header',
    description: '.byline',
    content: xray('.ezxmltext-field', [
      {
        description: ''
      }
    ])
  })(function (error, json) {
    if (error) {
      return callback(error, null)
    } else {
      return callback(null, JSON.parse(JSON.stringify(json, null, 2)))
    }
  })
}

module.exports = xrayPage
