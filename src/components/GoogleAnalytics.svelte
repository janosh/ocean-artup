<script>
  // https://analytics.google.com
  import { page } from '$app/stores'

  $: if (typeof gtag !== `undefined`) {
    window.gtag(`config`, `G-W2Z4T7NLQH`, { page_path: $page.path })
  }
</script>

<svelte:head>
  <script async src="https://googletagmanager.com/gtag/js?id=G-W2Z4T7NLQH"></script>
  <script>
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }

    gtag('js', new Date())

    gtag('config', 'G-W2Z4T7NLQH')
  </script>
</svelte:head>
