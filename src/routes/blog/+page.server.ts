import { fetchPosts, fetch_asset } from '$lib/fetch'

export const load = async () => {
  return {
    posts: fetchPosts(),
    cover: fetch_asset(`42EIuEhA9Oicq4AewcwKaC`), // Contentful image asset ID
  }
}
