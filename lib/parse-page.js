const axios = require('axios')
const cheerio = require('cheerio')
const cleanupText = require('./cleanup-text')

module.exports = async input => {
  if (!input) {
    throw new Error('Missing required input')
  }
  try {
    const results = String(input).startsWith('http') ? await axios.get(input) : false
    const $ = cheerio.load(results ? results.data : input)
    const content = cleanupText($('.ezxmltext-field').text())

    return {
      title: cleanupText($('title').text()),
      header: cleanupText($('.article__header').text()),
      summary: cleanupText($('.byline').text()),
      description: `${content.substr(0, 300)}...`,
      content: content
    }
  } catch (error) {
    throw error
  }
}
