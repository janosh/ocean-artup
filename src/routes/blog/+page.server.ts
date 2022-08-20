import { error, PageServerLoad } from '@sveltejs/kit'
import { fetchAsset, fetchPosts } from '../../fetch'

export const load: PageServerLoad = async () => {
  const posts = await fetchPosts()
  const cover = await fetchAsset(`42EIuEhA9Oicq4AewcwKaC`) // Contentful image asset ID

  if (posts && cover) return { posts, cover }
  error(404, `No posts or cover found`)
}
