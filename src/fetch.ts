/* eslint-disable indent */
import yaml from 'js-yaml'
import marked from './marked'
import type { Page, Person, Post } from './types'

export async function contentful_fetch(query: string) {
  const token = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
  const id = import.meta.env.VITE_CONTENTFUL_SPACE_ID

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

export async function base64_thumbnail(
  url: string,
  options: { type?: string; w?: number; h?: number } = {}
): Promise<string> {
  const { type = `jpg`, w = 10, h = 10 } = options
  if (!url.startsWith(`https:`)) url = `https:${url}`

  const response = await fetch(`${url}?w=${w}&h=${h}&q=80`)

  if (typeof window === `undefined`) {
    // server side (node) https://stackoverflow.com/a/52467372
    const buffer = Buffer.from(await response.arrayBuffer())
    return `data:image/${type};base64,` + buffer.toString(`base64`)
  } else {
    // client side (browser) https://stackoverflow.com/a/20285053
    const blob = await response.blob()
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }
}

function render_body(itm: Page | Post) {
  if (!itm?.body) return itm

  itm.body = marked(itm.body) // generate HTML
  itm.plainBody = itm.body.replace(/<[^>]*>/g, ``) // strip HTML tags to get plain text

  return itm
}

const img_fields = `
  src: url
  alt: description
  title
  width
  height
`

const page_fragment = `
  items {
    title
    slug
    body
    sys {
      publishedAt
    }
  }
`

const page_query = (slug: string) => `{
  pages: pageCollection(where: {slug_in: ["${slug}", "/${slug}"]}) {
    ${page_fragment}
  }
}`

export async function fetch_page(slug: string): Promise<Page> {
  if (!slug) throw `fetchPage requires a slug, got '${slug}'`
  const data = await contentful_fetch(page_query(slug))
  const page = data?.pages?.items[0]
  if (page) {
    page.cover = await fetch_asset(`42EIuEhA9Oicq4AewcwKaC`)
  }

  return render_body(page)
}

export async function fetch_pages(): Promise<Page[]> {
  const data = await contentful_fetch(`{
    pages: pageCollection {
      ${page_fragment}
    }
  }`)
  return data?.pages?.items?.map(render_body)
}

export async function fetch_asset(id: string) {
  const { asset } = await contentful_fetch(`{
    asset(id: "${id}") {
      ${img_fields}
    }
  }`)
  asset.base64 = await base64_thumbnail(asset.src)
  return asset
}

const person_query = (filters: string) => `{
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
        ${img_fields}
      }
    }
  }
}
`

export async function fetch_persons(filters: string): Promise<Person[]> {
  if (!filters) throw `must currently be used with a filter`
  const { persons } = await contentful_fetch(person_query(filters))
  return persons.items
}

const post_fragment = `
  items {
    title
    slug
    date
    body
    cover {
      ${img_fields}
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

const post_query = (slug: string) => `{
  posts: postCollection(order: date_DESC, where: {slug_in: ["${slug}", "/${slug}"]}) {
    ${post_fragment}
  }
}`

const postsQuery = `{
  posts: postCollection(order: date_DESC) {
    ${post_fragment}
  }
}`

async function process_post(post: Post) {
  render_body(post)

  post.slug = `/blog/${post.slug}`

  if (post?.cover?.src) {
    post.cover.base64 = await base64_thumbnail(post?.cover?.src)
  } else throw `No cover image for '${post.title}'`

  return post
}

export async function fetch_post(slug: string): Promise<Post> {
  if (!slug) throw `fetchPost requires a slug, got '${slug}'`
  const data = await contentful_fetch(post_query(slug))
  const post = data?.posts?.items[0]
  await process_post(post)
  return post
}

export async function fetchPosts(): Promise<Post[]> {
  const data = await contentful_fetch(postsQuery)
  const posts = data?.posts?.items
  return await Promise.all(posts.map(process_post))
}

const yaml_query = (title: string) => `{
  yml: yamlCollection(where: {title: "${title}"}) {
    items {
      data
    }
  }
}`

export async function fetch_yaml(title: string) {
  if (!title) throw `fetchYaml requires a title, got '${title}'`
  const { yml } = await contentful_fetch(yaml_query(title))
  return yaml.load(yml?.items[0]?.data)
}
