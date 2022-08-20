<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'
  import Footer from '../components/Footer.svelte'
  import Header from '../components/Header.svelte'
  import type { Link } from '../types'
  import { fetchYaml } from '../fetch'
  import '../app.css'

  export const load: Load = async () => {
    const nav = await fetchYaml(`Nav`)
    return { props: { nav } }
  }
</script>

<script lang="ts">
  export let nav: Link[]
</script>

<Header {nav} />
<main>
  <slot />
</main>
<Footer />
