import { dev } from '$app/env'
import { indexAlgolia } from 'svelte-algolia/server-side'
import { algoliaConfig } from './algolia'

if (dev === false) {
  // update Algolia search indices on production builds
  indexAlgolia(algoliaConfig)
}
