import 'dotenv/config.js'
import fs from 'fs'
import yaml from 'js-yaml'
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

export async function searchStringInContentType(
  searchTerm = process.argv[2],
  contentType = process.argv[3] || `page`
) {
  const space = await getSpace()

  const env = await space.getEnvironment(`master`)
  let { items } = await env.getEntries({ content_type: contentType })
  items = items.filter((item) => item?.fields?.slug?.en?.includes(searchTerm))
  items = items.map((item) => item.fields.slug.en)
  // eslint-disable-next-line no-console
  console.log(`items of type ${contentType} containing ${searchTerm}:`, items)
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

export async function createPersons() {
  const space = await getSpace()

  const env = await space.getEnvironment(`master`)
  let { items } = await env.getEntries({ content_type: `person` })
  const team = yaml.load(fs.readFileSync(`team.yml`))
  // console.log(`items[0].fields.photo:`, items[0].fields.photo)
  // const notInTeam = team.filter(
  //   (p) => !items.map((t) => t.fields.name.en).includes(p.name)
  // )
  // console.log(`notInTeam.length:`, notInTeam.length)
  // console.log(`notInTeam:`, notInTeam)
  // const notInTeam = items
  //   .filter((p) => !team.map((t) => t.name).includes(p.fields.name.en))
  //   .map((t) => t.fields.name.en)
  // console.log(`notInTeam.length:`, notInTeam.length)
  // console.log(`notInTeam:`, notInTeam)
  team.forEach(async (p) => {
    const person = items.find((itm) => itm.fields.name.en === p.name)
    person.fields.onTeamPage = { en: true }
    await person.update()
    // if (existing) {
    //   // const fields = Object.fromEntries(
    //   //   Object.entries(p).map(([key, val]) => [key, { en: val }])
    //   // )
    //   // existing.fields = { ...existing.fields, ...fields }
    //   // delete existing.fields.img
    //   // await existing.update()
    //   // console.log(`updated:`, existing.fields.name.en)
    // } else {
    //   const { img, ...rest } = p
    //   const fields = Object.fromEntries(
    //     Object.entries(rest).map(([key, val]) => [key, { en: val }])
    //   )
    //   fields.photo = {
    //     en: { sys: { type: `Link`, linkType: `Asset`, id: img } },
    //   }
    //   const entry = await env.createEntry(`person`, { fields })
    //   console.log(`created:`, entry.fields.name.en)
    //   // await entry.publish()
    // }
  })
}

// run with: node src/utils/contentful.js
createPersons()
