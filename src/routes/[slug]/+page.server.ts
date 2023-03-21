import { fetch_page } from '$lib/fetch'
import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
  const page = await fetch_page(params.slug)

  if (!page) return error(404, `Page '${params.slug}' not found`)

  return { page }
}
