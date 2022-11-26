import { base64_thumbnail, fetch_yaml } from '../fetch'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const yaml = await fetch_yaml(`Landing Page`)

  yaml.hero.img.base64 = await base64_thumbnail(yaml.hero.img.src)
  for (const itm of yaml.spotlights) {
    itm.img.base64 = await base64_thumbnail(itm.img.src)
  }
  return { yaml }
}
