'use strict'

var fs = require('fs')
var xrayPage = require('./lib/xray-page')
var repackContent = require('./lib/repack-content')
// var page = 'http://www.telemark.no/Vaare-tjenester/Arealbruk-og-transport/Aktuelt/Gratis-fartekort'
// var page = 'http://www.telemark.no'
var page = fs.readFileSync('test/data/data.html').toString()

xrayPage(page, function (error, data) {
  if (error) {
    console.error(error)
  } else {
    console.log(JSON.stringify(repackContent(data), null, 2))
  }
})
