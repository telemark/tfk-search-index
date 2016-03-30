'use strict'

// var fs = require('fs')
var xrayPage = require('./lib/xray-page')
var page = 'http://www.telemark.no/Vaare-tjenester/Arealbruk-og-transport/Aktuelt/Gratis-fartekort'
// var page = fs.readFileSync('test/data/data.html').toString()

xrayPage(page, function (error, data) {
  if (error) {
    console.error(error)
  } else {
    console.log(JSON.stringify(data, null, 2))
  }
})
