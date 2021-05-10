<script context="module">
  import { fetchYaml } from '../utils/queries'

  export async function load() {
    const nav = await fetchYaml(`Nav`)
    return { props: { nav } }
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
