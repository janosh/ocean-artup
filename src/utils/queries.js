/* eslint-disable indent */
import marked from './marked.js'
import yaml from 'js-yaml'

export async function contentfulFetch(query) {
  const token = process.env.CONTENTFUL_ACCESS_TOKEN
  const id = process.env.CONTENTFUL_SPACE_ID

  if (!token || !id)
    throw `Missing Contentful access token and/or space ID. Please add to .env`

  const ctfGqlUrl = `https://graphql.contentful.com/content/v1/spaces`
  const ctfGraphqlEndPoint = `${ctfGqlUrl}/${id}?access_token=${token}`

  const response = await fetch(ctfGraphqlEndPoint, {
    method: `POST`,
    headers: { 'Content-Type': `application/json` },
    body: JSON.stringify({ query }),
  })

  const { data, error } = await response.json()

  if (error) throw error
  return data
}

export async function base64Thumbnail(url, type = `jpg`) {
  if (!url.startsWith(`https:`)) url = `https:${url}`
  const response = await fetch(`${url}?w=15&h=5&q=80`)
  try {
    // server side (node) https://stackoverflow.com/a/52467372
    const buffer = await response.buffer()
    return `data:image/${type};base64,` + buffer.toString(`base64`)
  } catch (err) {
    // client side (browser) https://stackoverflow.com/a/20285053
    const blob = await response.blob()
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }
}

function renderBody(itm) {
  if (!itm?.body) return itm

  itm.body = marked(itm.body) // generate HTML
  itm.plainBody = itm.body.replace(/<[^>]*>/g, ``) // strip HTML tags to get plain text

  return itm
}

const imgFields = `
  src: url
  alt: description
  title
  width
  height
`

const pageFragment = `
  items {
    title
    slug
    body
    sys {
      publishedAt
    }
  }
`

const pageQuery = (slug) => `{
  pages: pageCollection(where: {slug_in: ["${slug}", "/${slug}"]}) {
    ${pageFragment}
  }
}`

const pagesQuery = `{
  pages: pageCollection {
    ${pageFragment}
  }
}`

export async function fetchPage(slug) {
  if (!slug) throw `fetchPage requires a slug, got '${slug}'`
  const data = await contentfulFetch(pageQuery(slug))
  const page = data?.pages?.items[0]
  if (page) {
    page.cover = await fetchAsset(`42EIuEhA9Oicq4AewcwKaC`)
  }

  return renderBody(page)
}

export async function fetchPages() {
  const data = await contentfulFetch(pagesQuery)
  return data?.pages?.items?.map(renderBody)
}

const assetQuery = (id) => `{
  asset(id: "${id}") {
    ${imgFields}
  }
}`

export async function fetchAsset(id) {
  const { asset } = await contentfulFetch(assetQuery(id))
  asset.base64 = await base64Thumbnail(asset.src)
  return asset
}

const personQuery = (filters) => `{
  persons: personCollection(where: {${filters}}) {
    items {
      name
      email
      homepage
      bio
      linkedIn
      googleScholar
      orcid
      researchGate
      onTeamPage
      role
      interests
      tasks
      photo {
        ${imgFields}
      }
    }
  }
}
`

export async function fetchPersons(filters) {
  if (!filters) throw `must currently be used with a filter`
  const { persons } = await contentfulFetch(personQuery(filters))
  return persons.items
}

const postFragment = `
  items {
    title
    slug
    date
    body
    cover {
      ${imgFields}
    }
    tags
    author {
      name
      email
      bio
      photo {
        src: url
        width
        height
      }
    }
  }
`

const postQuery = (slug) => `{
  posts: postCollection(order: date_DESC, where: {slug_in: ["${slug}", "/${slug}"]}) {
    ${postFragment}
  }
}`

const postsQuery = `{
  posts: postCollection(order: date_DESC) {
    ${postFragment}
  }
}`

async function processPost(post) {
  renderBody(post)

  post.slug = `/blog/${post.slug}`

  post.cover.base64 = await base64Thumbnail(post?.cover?.src)
  return post
}

export async function fetchPost(slug) {
  if (!slug) throw `fetchPost requires a slug, got '${slug}'`
  const data = await contentfulFetch(postQuery(slug))
  const post = data?.posts?.items[0]
  return processPost(post)
}

export async function fetchPosts() {
  const data = await contentfulFetch(postsQuery)
  const posts = data?.posts?.items
  return await Promise.all(posts.map(processPost))
}

const yamlQuery = (title) => `{
  yml: yamlCollection(where: {title: "${title}"}) {
    items {
      data
    }
  }
}`

export async function fetchYaml(title) {
  if (!title) throw `fetchYaml requires a title, got '${title}'`
  const { yml } = await contentfulFetch(yamlQuery(title))
  return yaml.load(yml?.items[0]?.data)
}
