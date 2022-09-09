import type { LayoutLoad } from '@sveltejs/kit'
import { fetchYaml } from '../fetch'

export const load: LayoutLoad = async () => {
  const nav = await fetchYaml(`Nav`)
  return { nav }
}

export const prerender = true
