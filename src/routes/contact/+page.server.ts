import { fetch_page } from '$lib/fetch'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
  return { page: fetch_page(`contact`) }
}
