import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'

export default {
  plugins: [sveltekit()],

  server: {
    port: 3000,
    fs: {
      allow: [`..`],
    },
  },

  preview: {
    port: 3000,
  },
} satisfies UserConfig
