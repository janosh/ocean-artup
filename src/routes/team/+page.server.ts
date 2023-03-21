import { fetch_asset, fetch_persons } from '$lib/fetch'

export const load = () => {
  return {
    persons: fetch_persons(`onTeamPage: true`),
    cover: fetch_asset(`42EIuEhA9Oicq4AewcwKaC`),
  }
}
