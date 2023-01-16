<script lang="ts">
  import { Footer, Header } from '$lib'
  import '../app.css'
  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<Header nav={data.nav} />
<main>
  <slot />
</main>
<Footer />
