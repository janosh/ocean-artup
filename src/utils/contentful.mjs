/* eslint-disable no-console */
import 'dotenv/config.js'
import contentful from 'contentful-management'

// to use any of the functions in this file, generate a Content Management Token (CMT) at
// https://app.contentful.com/spaces/gi9muc70s4ub/api/cma_tokens and add it to your .env
// file along with the space's ID.

// Contentful entries returned by env.getEntries() are objects with update/publish/archive/etc. methods
// as well as a fields and a sys key. Only the attributes in fields can be changed and then e.g.
// published(). The data in entry.sys can be consumed but is non-user editable. The API will throw
// if you modify sys and then try to publish()/update() an entry.

// See https://github.com/contentful/contentful-management.js/issues/57 for how to link entries/assets.

const getSpace = async () =>
  await contentful
    .createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    })
    .getSpace(process.env.CONTENTFUL_SPACE_ID)

export async function searchStringInContentType() {
  const cli_args = process.argv.slice(2)
  if (cli_args.length < 1 || cli_args.length > 3)
    throw `wrong number of CLI args, expected between 1 and 3, got ${cli_args.length}`

  const [searchTerm, contentType = `page`, field = `body`] = cli_args

  const space = await getSpace()

  const env = await space.getEnvironment(`master`)
  let { items } = await env.getEntries({ content_type: contentType })
  items = items.filter((item) => item?.fields[field]?.en?.includes(searchTerm))
  items = items.map((item) => item.fields.slug.en)
  console.log(
    `'${contentType}' items containing '${searchTerm}' in field '${field}': ${items}`
  )
}

export async function replaceStringInContentType() {
  const cli_args = process.argv.slice(2)
  if (cli_args.length !== 4)
    throw `wrong number of CLI args, expected 4, got ${cli_args.length}`

  const [searchTerm, replaceTerm, contentType, field] = cli_args
  const space = await getSpace()

  const env = await space.getEnvironment(`master`)
  let { items } = await env.getEntries({ content_type: contentType })
  items = items.filter((itm) => itm?.fields[field]?.en?.includes(searchTerm))
  items.forEach((itm) => {
    itm.fields[field].en = itm?.fields[field]?.en?.replaceAll(
      searchTerm,
      replaceTerm
    )
    itm.update()
    // itm.publish()
  })
}

export async function convertBlogTagsFromRefsToList() {
  const space = await getSpace()

  const env = await space.getEnvironment(`master`)
  let { items } = await env.getEntries({ content_type: `post` })
  let { items: tags } = await env.getEntries({ content_type: `tag` })
  items.forEach((post) => {
    const tagIds = post.fields.tags.en.map((tag) => tag.sys.id)
    const newTags = tags
      .filter((tag) => {
        return tagIds.includes(tag.sys.id)
      })
      .map((tag) => tag.fields.title.en)
      .filter((tag) => tag !== `All`)
    // console.log(`newTags:`, newTags)

    post.fields.tags2 = {}
    post.fields.tags2.en = newTags
    post.update()
    // post.publish()
  })
}

// run with: node src/utils/contentful.mjs
replaceStringInContentType()
