'use strict'

var tap = require('tap')
var jwt = require('jsonwebtoken')
var generateToken = require('../lib/generate-token')
var secret = 'NeverShareYourSecret'
var payload = {
  name: 'zrrrzt',
  description: 'general nice guy'
}
var expected = jwt.sign(payload, secret)
var token = generateToken({key: secret, payload: payload})

tap.equal(expected, token, 'Generates expected token')
