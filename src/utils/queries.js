/* eslint-disable indent */
import 'cross-fetch/polyfill'
import marked from 'marked'
import yaml from 'js-yaml'

const renderer = {
  // responsive markdown images
  image(href, title, text) {
    if (href?.includes(`images.ctfassets.net`) && !href.endsWith(`.svg`)) {
      title = title ? `title="${title}"` : ``
      return `
      <picture>
        <source media="(min-width: 900px)" type="image/webp" srcset="${href}?w=900&q=80&fm=webp" />
        <source media="(min-width: 600px)" type="image/webp" srcset="${href}?w=600&q=80&fm=webp" />
        <source media="(min-width: 400px)" type="image/webp" srcset="${href}?w=400&q=80&fm=webp" />
        <img src="${href}?w=1000&q=80" alt="${text}" ${title} loading="lazy" />
      </picture>`
    }

    return false // delegate to default marked image renderer
  },
  // add Sapper prefetching for local markdown links
  link(href, title, text) {
    if (href.startsWith(`/`)) {
      title = title ? `title="${title}"` : ``
      return `<a sapper:prefetch href="${href}" ${title}>${text}</a>`
    }
    return false // delegate to default marked link renderer
  },
  // responsive iframes for video embeds
  codespan(code) {
    if (code.startsWith(`youtube:`) || code.startsWith(`vimeo:`)) {
      const [platform, id] = code.split(/:\s?/)
      const embed = {
        youtube: (id) => `https://youtube.com/embed/${id}`,
        vimeo: (id) => `https://player.vimeo.com/video/${id}`,
      }
      // padding-top: 56.25%; corresponds to 16/9 = most common video aspect ratio
      return `
        <div style="padding-top: 56.25%; position: relative;">
          <iframe
            title="${platform} video"
            loading="lazy"
            src="${embed[platform](id)}"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
            allowfullscreen></iframe>
        </div>`
    }
    return false // delegate to default marked codespan renderer
  },
}

marked.use({ renderer })

const prefixSlug = (prefix) => (obj) => {
  obj.slug = prefix + obj.slug
  return obj
}

export async function ctfFetch(query) {
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
  const data = await ctfFetch(pageQuery(slug))
  const page = data?.pages?.items[0]
  if (page) {
    page.cover = await fetchAsset(`42EIuEhA9Oicq4AewcwKaC`)
  }

  return renderBody(page)
}

export async function fetchPages() {
  const data = await ctfFetch(pagesQuery)
  return data?.pages?.items?.map(renderBody)
}

const assetQuery = (id) => `{
  asset(id: "${id}") {
    ${imgFields}
  }
}`

export async function fetchAsset(id) {
  const { asset } = await ctfFetch(assetQuery(id))
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
  if (!filters) `must currently be used with a filter`
  const { persons } = await ctfFetch(personQuery(filters))
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
  prefixSlug(`blog/`)(post)
  post.cover.base64 = await base64Thumbnail(post?.cover?.src)
  return post
}

export async function fetchPost(slug) {
  if (!slug) throw `fetchPost requires a slug, got '${slug}'`
  const data = await ctfFetch(postQuery(slug))
  const post = data?.posts?.items[0]
  return processPost(post)
}

export async function fetchPosts() {
  const data = await ctfFetch(postsQuery)
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
  const { yml } = await ctfFetch(yamlQuery(title))
  return yaml.load(yml?.items[0]?.data)
}
