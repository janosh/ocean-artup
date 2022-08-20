import type { PageLoad } from '@sveltejs/kit'
import { fetchAsset, fetchPersons } from '../../fetch'

export const load: PageLoad = async () => {
  const persons = await fetchPersons(`onTeamPage: true`)
  const cover = await fetchAsset(`42EIuEhA9Oicq4AewcwKaC`)
  return { persons, cover }
}
