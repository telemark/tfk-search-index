'use strict'

var http = require('http')
var smtaStream = require('sitemap-to-array').stream
var config = require('./config')
var xrayPage = require('./lib/xray-page')
var repackContent = require('./lib/repack-content')
var addIndex = require('./lib/add-index')
var deleteIndex = require('./lib/delete-index')
var pages = []

function indexPages (pages) {
  var list = JSON.parse(JSON.stringify(pages))

  function next () {
    if (list.length > 0) {
      var page = list.pop()
      xrayPage(page, function (error, data) {
        if (error) {
          console.error(error)
        } else {
          var content = repackContent(data)
          content.url = page
          addIndex(content, function (err, payload) {
            console.log(page)
            if (err) {
              console.error(err)
            } else {
              console.log(payload)
              next()
            }
          })
        }
      })
    } else {
      console.log('Finished indexing')
    }
  }

  next()
}

smtaStream.on('data', function (data) {
  var json = JSON.parse(data.toString())
  pages.push(json.loc)
})

smtaStream.on('end', function () {
  console.log('Finished collecting pages')
  indexPages(pages)
})

deleteIndex(function (error, payload) {
  if (error) {
    console.error(error)
  } else {
    console.log(payload)
    http.get(config.SITEMAP_URL, function (response) {
      response
        .pipe(smtaStream)
    })
  }
})
