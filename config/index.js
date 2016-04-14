'use strict'

var config = {
  JWT_KEY: process.env.JWT_KEY || 'Louie Louie, oh no, I got to go',
  SEARCH_SERVICE_URL: process.env.SEARCH_SERVICE_URL || 'https://search.service.com/api',
  SEARCH_SERVICE_INDEX: process.env.SEARCH_SERVICE_INDEX || 'www',
  SEARCH_SERVICE_INDEX_TYPE: process.env.SEARCH_SERVICE_INDEX_TYPE || 'article',
  SITEMAP_URL: process.env.SITEMAP_URL || 'http://www.yoursite.com/sitemap.xml'
}

module.exports = config
