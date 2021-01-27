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

<svelte:head>
  <meta
    name="description"
    content="Research project funded by an ERC advanced-grant aiming to investigate the risks and benefits of artificial upwelling of deep ocean water" />
</svelte:head>

<GoogleAnalytics />
<Header {nav} />
<main>
  <slot />
</main>
<Footer />
