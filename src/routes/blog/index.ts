import type { RequestHandler } from '@sveltejs/kit'
import { fetchAsset, fetchPosts } from '../../fetch'

export const get: RequestHandler = async () => {
  const posts = await fetchPosts()
  const cover = await fetchAsset(`42EIuEhA9Oicq4AewcwKaC`)

  if (posts && cover) return { body: { posts, cover } }
  else return { fallthrough: true }
}
