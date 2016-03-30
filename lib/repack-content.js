'use strict'

var cleanupText = require('./cleanup-text')

function repackContent (data) {
  if (!data) {
    throw new Error('Missing required input')
  }

  var json = {
    title: data.title || '',
    description: data.description || '',
    content: ''
  }

  var contentList = []

  if (data.header) {
    json.content += ' ' + data.header + ' '
  }

  if (data.description) {
    json.content += ' ' + data.description + ' '
  }

  if (data.content && Array.isArray(data.content)) {
    contentList = data.content.map(function (item) {
      return ' ' + item.description + ' '
    })

    json.content += contentList.join(' ')
  }

  json.content = cleanupText(json.content)

  json.description = cleanupText(json.description)

  if (json.description.length === 0) {
    json.description = json.content.substr(0, 300) + '...'
  }

  return json
}

module.exports = repackContent
