import { fetch_post } from '../../../fetch'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  return { post: fetch_post(params.slug) }
}
