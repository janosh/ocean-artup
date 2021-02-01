<script context="module">
  import { fetchYaml } from '../utils/queries'

  export async function preload() {
    const nav = await fetchYaml(`Nav`)
    return { nav }
  }
</script>

<script>
  import Header from '../components/Header.svelte'
  import Footer from '../components/Footer.svelte'
  import GoogleAnalytics from '../components/GoogleAnalytics.svelte'

  export let nav
</script>

<GoogleAnalytics />
<Header {nav} />
<main>
  <slot />
</main>
<Footer />
