import type { PageLoad } from '@sveltejs/kit'
import { base64Thumbnail, fetchYaml } from '../fetch'

export const load: PageLoad = async () => {
  const yaml = await fetchYaml(`Landing Page`)

  yaml.hero.img.base64 = await base64Thumbnail(yaml.hero.img.src)
  // forEach doesn't work here: https://stackoverflow.com/a/37576787
  for (const itm of yaml.spotlights) {
    itm.img.base64 = await base64Thumbnail(itm.img.src)
  }
  return { yaml }
}
