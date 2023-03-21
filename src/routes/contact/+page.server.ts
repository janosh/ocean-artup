import { fetch_page } from '$lib/fetch'

export const load = () => {
  return { page: fetch_page(`contact`) }
}
