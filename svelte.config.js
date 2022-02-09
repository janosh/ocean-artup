import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

export default {
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),

    // https://kit.svelte.dev/docs#configuration-trailingslash
    trailingSlash: `ignore`, // GitHub issue discussing Netlify: https://git.io/JngRL
  },
}
