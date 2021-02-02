import 'dotenv/config'
import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'

const keys = [
  `NODE_ENV`,
  `ALGOLIA_APP_ID`,
  `ALGOLIA_SEARCH_KEY`,
  `GOOGLE_MAPS_API_KEY`,
  `GOOGLE_MAPS_EMBED_API_KEY`,
]

const session = Object.fromEntries(keys.map((key) => [key, process.env[key]]))

const dev = session.NODE_ENV === `development`

const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } = process.env
const ctfGqlUrl = `https://graphql.contentful.com/content/v1/spaces/`
session.gqlUri = `${ctfGqlUrl}${CONTENTFUL_SPACE_ID}?access_token=${CONTENTFUL_ACCESS_TOKEN}`

polka()
  .use(
    compression({ threshold: 0 }),
    sirv(`static`, { dev }),
    sapper.middleware({ session: () => session })
  )
  .listen(process.env.PORT, (err) => {
    // eslint-disable-next-line no-console
    if (err) console.log(`error`, err)
  })
