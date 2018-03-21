const path = require('path')
const parsePage = require('./lib/parse-page')
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
        let content = await parsePage(page)
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
