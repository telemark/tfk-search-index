const Xray = require('x-ray')

module.exports = data => {
  return new Promise((resolve, reject) => {
    const xray = Xray()

    if (!data) {
      return reject(new Error('Missing required input'))
    }

    xray(data, {
      title: 'title',
      header: '.article__header',
      description: '.byline',
      content: xray('.ezxmltext-field', [
        {
          description: ''
        }
      ])
    })((error, json) => {
      if (error) {
        return reject(error)
      } else {
        return resolve(JSON.parse(JSON.stringify(json, null, 2)))
      }
    })
  })
}
