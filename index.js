'use strict'

const config = require('./config')
const protocol = /https/.test(config.SITEMAP_URL) ? 'https' : 'http'
const http = require(protocol)
const smtaStream = require('sitemap-to-array').stream
const xrayPage = require('./lib/xray-page')
const repackContent = require('./lib/repack-content')
const addIndex = require('./lib/add-index')
const deleteIndex = require('./lib/delete-index')
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
