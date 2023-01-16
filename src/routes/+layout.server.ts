import { fetch_yaml } from '$lib/fetch'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async () => {
  return { nav: fetch_yaml(`Nav`), yaml: fetch_yaml(`Landing Page`) }
}

export const prerender = true
