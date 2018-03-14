const axios = require('axios')
const { parseString } = require('xml2js')

module.exports = url => {
  return new Promise(async (resolve, reject) => {
    const result = await axios.get(url)
    parseString(result.data, {explicitArray: false, trim: true}, (error, data) => {
      if (error) {
        reject(error)
      } else {
        if (data.urlset || data.urlset.url) {
          resolve(Array.isArray(data.urlset.url) ? data.urlset.url : [data.urlset.url])
        } else {
          resolve([])
        }
      }
    })
  })
}
