<script lang="ts">
  import { Footer, Header } from '$lib'
  import '../app.css'

  export let data
</script>

<Header nav={data.nav} />
<main>
  <slot />
</main>
<Footer />
