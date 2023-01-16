import { fetchPosts, fetch_asset } from '$lib/fetch'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  return {
    posts: fetchPosts(),
    cover: fetch_asset(`42EIuEhA9Oicq4AewcwKaC`), // Contentful image asset ID
  }
}
