const path = require('path')
const xrayPage = require('./lib/xray-page')
const repackContent = require('./lib/repack-content')
const getSitemap = require('./lib/get-sitemap')
const addIndex = require('./lib/add-index')
const deleteIndex = require('./lib/delete-index')
const prepareIndex = require('./lib/prepare-index')
const logger = require('./lib/logger')
const env = process.argv[2]

if (env) {
  const envFilePath = path.resolve(process.cwd(), env)
  logger('info', ['index', 'loading environment', env])
  require('dotenv').config({path: envFilePath})
} else {
  logger('warn', ['index', 'no environment loaded'])
}

async function indexPages () {
  const sitemap = await getSitemap(process.env.SITEMAP_URL)
  let pages = sitemap.map(page => page.loc)
  logger('info', ['index', 'indexPages', 'pages to index', pages.length])
  const msg = await deleteIndex()
  logger('info', ['index', 'indexPages', 'index deleted', JSON.stringify(msg)])
  let success = 0
  let fails = 0
  const next = async () => {
    if (pages.length > 0) {
      const page = pages.pop()
      logger('info', ['index', 'indexPages', 'indexing', page])
      try {
        const data = await xrayPage(page)
        let content = repackContent(data)
        content.url = page
        const index = prepareIndex(content)
        await addIndex(index)
        success++
      } catch (error) {
        logger('error', ['index', 'indexPages', 'next', page, error])
        fails++
      }
      await next()
    } else {
      logger('info', ['index', 'indexPages', 'finished', 'success', success, 'fails', fails])
    }
  }
  await next()
}

indexPages()

/*
function indexPages (pages) {
  let list = JSON.parse(JSON.stringify(pages))

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

smtaStream.on('data', data => {
  const json = JSON.parse(data.toString())
  pages.push(json.loc)
})

smtaStream.on('end', () => {
  console.log('Finished collecting pages')
  indexPages(pages)
})

deleteIndex(function (error, payload) {
  if (error) {
    console.error(error)
  } else {
    console.log(payload)
    http.get(process.env.SITEMAP_URL, function (response) {
      response
        .pipe(smtaStream)
    })
  }
})
*/
