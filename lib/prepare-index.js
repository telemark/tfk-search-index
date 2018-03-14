const uuid = require('uuid/v4')

module.exports = data => {
  return {
    index: process.env.SEARCH_INDEX,
    type: process.env.SEARCH_INDEX_TYPE,
    id: uuid(),
    body: data
  }
}
