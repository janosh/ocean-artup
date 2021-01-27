<script context="module">
  import { fetchPage } from '../utils/queries'

  export async function preload() {
    const page = await fetchPage(`contact`)
    return { page }
  }
</script>

<script>
  import Map from '../components/Map.svelte'
  import BasePage from '../components/BasePage.svelte'

  export let page

  const mapProps = {
    options: {
      center: { lat: 43, lng: -10 },
      zoom: 4,
    },
  }
  function onLoad(map) {
    new window.google.maps.Marker({
      position: { lat: 54.32791765, lng: 10.179823233482258 },
      map,
      title: `GEOMAR Helmholtz-Zentrum für Ozeanforschung Kiel`,
    })
    new window.google.maps.Marker({
      position: { lat: 27.9924864, lng: -15.3737573 },
      map,
      title: `Research Site: Taliarte, Spain`,
    })
  }
</script>

<BasePage {page}>
  <Map {mapProps} {onLoad} />
</BasePage>
