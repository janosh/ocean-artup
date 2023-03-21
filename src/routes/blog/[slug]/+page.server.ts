import { fetch_post } from '$lib/fetch'

export const load = async ({ params }) => {
  return { post: fetch_post(params.slug) }
}
