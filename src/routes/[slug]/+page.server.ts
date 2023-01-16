import { fetch_page } from '$lib/fetch'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  const page = await fetch_page(params.slug)

  if (!page) return error(404, `Page '${params.slug}' not found`)

  return { page }
}
