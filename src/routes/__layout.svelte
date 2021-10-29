<script lang="ts" context="module">
  import { fetchYaml } from '../utils/queries'

  export async function load(): Promise<LoadOutput> {
    const nav = await fetchYaml(`Nav`)
    return { props: { nav } }
  }
</script>

<script lang="ts">
  import type { LoadOutput } from '@sveltejs/kit'

  import Header from '../components/Header.svelte'
  import Footer from '../components/Footer.svelte'

  import type { Link } from '../types'

  export let nav: Link[]
</script>

<Header {nav} />
<main>
  <slot />
</main>
<Footer />
