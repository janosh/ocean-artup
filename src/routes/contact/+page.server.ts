import { fetch_page } from '../../fetch'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
  return { page: fetch_page(`contact`) }
}
