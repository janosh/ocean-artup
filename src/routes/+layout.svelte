<script lang="ts">
  import '../app.css'
  import Footer from '../components/Footer.svelte'
  import Header from '../components/Header.svelte'
  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<Header nav={data.nav} />
<main>
  <slot />
</main>
<Footer />
