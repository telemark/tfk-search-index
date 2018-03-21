const normalizeWhitespace = require('normalize-html-whitespace')

function cleanupText (text) {
  text = text.replace(/\./g, '. ')
  text = text.replace(/\n/g, ' ')
  text = normalizeWhitespace(text)
  text = text.trim()

  return text
}

module.exports = cleanupText
