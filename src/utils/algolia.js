import { fetchPages, fetchPersons, fetchPosts } from './queries'

const bodyToPlainText = (fetchFunction) => async () => {
  const items = await fetchFunction()
  items.forEach((itm) => {
    if (!itm.id) itm.id = itm?.slug || itm?.title
    if (itm.body && itm.plainBody) {
      itm.body = itm.plainBody.slice(0, 2000)
      delete itm.plainBody
    }
  })
  return items
}

async function fetchPeople() {
  const people = await fetchPersons(`onTeamPage: true`)
  people.forEach((p) => (p.id = p.name))
  return people
}

export const algoliaConfig = {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_ADMIN_KEY,
  indices: [
    { name: `Pages`, getData: bodyToPlainText(fetchPages) },
    { name: `Posts`, getData: bodyToPlainText(fetchPosts) },
    { name: `People`, getData: fetchPeople },
  ],
  settings: {
    attributesToSnippet: [`body:20`],
    attributesToHighlight: [
      `title`,
      `date`,
      `body`,
      `cover.description`,
      `author.name`,
      `author.email`,
    ],
  },
}
