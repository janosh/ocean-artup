import { dev } from '$app/env'
import { indexAlgolia } from 'svelte-algolia/server-side'
import { algoliaConfig } from './algolia'

const appId = import.meta.env.VITE_ALGOLIA_APP_ID as string
const apiKey = import.meta.env.VITE_ALGOLIA_ADMIN_KEY as string

if (dev === false && appId && apiKey) {
  // update Algolia search indices on production builds
  indexAlgolia({ ...algoliaConfig, appId, apiKey })
}
