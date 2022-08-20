import type { RequestHandler } from '@sveltejs/kit'
import { fetchAsset, fetchPosts } from '../../fetch'

export const GET: RequestHandler = async () => {
  const posts = await fetchPosts()
  const cover = await fetchAsset(`42EIuEhA9Oicq4AewcwKaC`) // Contentful image asset ID

  if (posts && cover) return { body: { posts, cover } }
  return { status: 404 }
}
