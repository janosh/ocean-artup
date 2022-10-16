import { fetch_yaml } from '../fetch'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async () => {
  return { nav: fetch_yaml(`Nav`) }
}

export const prerender = true
