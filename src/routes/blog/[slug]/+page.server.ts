import { error, PageServerLoad } from '@sveltejs/kit'
import { fetchPost } from '../../../fetch'

export const load: PageServerLoad = async ({ params }) => {
  const post = await fetchPost(params.slug)

  if (post) return { post }
  error(404, `Post not found`)
}
