import { error } from '@sveltejs/kit'
import { fetch_page } from '../../fetch'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  const page = await fetch_page(params.slug)
  if (!page) return error(404, `No page for slug ${params.slug} on Contentful`)
  return { page }
}
