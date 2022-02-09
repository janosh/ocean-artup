import 'cross-fetch/dist/node-polyfill.js'
import { fetchPages, fetchPersons, fetchPosts } from './fetch'

const bodyToPlainText =
  (fetchFunction: typeof fetchPages | typeof fetchPosts) => async () => {
    const items = await fetchFunction()
    items.forEach((itm) => {
      if (!itm.id) itm.id = itm?.slug || itm?.title

      if (itm.body && itm.plainBody) {
        itm.body = itm.plainBody.slice(0, 2000)
        delete itm.plainBody
        if (itm?.cover?.base64) delete itm.cover.base64
      }
    })
    return items
  }

async function fetchPeople() {
  const people = await fetchPersons(`onTeamPage: true`)
  return people.map((person) => ({ ...person, id: person.name }))
}

export const algoliaConfig = {
  appId: import.meta.env.VITE_ALGOLIA_APP_ID,
  apiKey: import.meta.env.VITE_ALGOLIA_ADMIN_KEY,
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
