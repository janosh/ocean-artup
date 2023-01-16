import { fetchPosts, fetch_pages, fetch_persons } from '$lib/fetch'

const bodyToPlainText =
  (fetchFunction: typeof fetch_pages | typeof fetchPosts) => async () => {
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
  const people = await fetch_persons(`onTeamPage: true`)
  return people.map((person) => ({ ...person, id: person.name }))
}

export const algoliaConfig = {
  indices: [
    { name: `Pages`, getData: bodyToPlainText(fetch_pages) },
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
