import { fetch_asset, fetch_persons } from '$lib/fetch'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
  return {
    persons: fetch_persons(`onTeamPage: true`),
    cover: fetch_asset(`42EIuEhA9Oicq4AewcwKaC`),
  }
}
