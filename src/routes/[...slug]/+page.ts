import type { PageLoad } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'
import { fetchPage } from '../../fetch'

export const load: PageLoad = async ({ params }) => {
  const page = await fetchPage(params.slug)

  // If no page data could be fetched for params.slug, the page doesn't exist,
  // so we fall through to src/routes/+error.svelte.
  if (!page) throw error(404)

  return { page }
}
