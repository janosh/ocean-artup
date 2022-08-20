<script lang="ts">
  import Footer from '$lib/Footer.svelte'
  import Header from '$lib/Header.svelte'
  import '../app.css'
  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<Header nav={data.nav} />
<main>
  <slot />
</main>
<Footer />
