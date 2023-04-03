export type Link = {
  title: string
  url: string
}

export type Page = {
  title: string
  slug: string
  cover: Image
  body: string
  plainBody: string // for creating excerpts and search previews
  date?: string
  yaml?: Yaml
  sys: { publishedAt: string }
}

export type Author = {
  name: string
  bio: string
  url: string
  email: string
  photo: Image
  fieldOfStudy: string
}

export const BlogTags = [
  `All`,
  `Events`,
  `Logistics`,
  `Science`,
  `Announcements`,
  `Tech`,
  `Social`,
  `Field Campaign 2018`,
  `Field Campaign 2019`,
] as const

export type BlogTag = (typeof BlogTags)[number]

export type Post = Page & {
  author: Author
  date: string
  tags: BlogTag[]
  plainBody: string
}

export type Image = {
  src: string
  alt: string
  width: number
  height: number
  base64: string
  title: string
}

export type Yaml = {
  [key: string]: unknown
}

export type Person = {
  name: string
  email: string
  photo: Image
  role: string
  tasks: string[]
  interests: string[]
}
