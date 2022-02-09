<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'
  import BasePage from '../components/BasePage.svelte'
  import Map from '../components/Map.svelte'
  import type { Page } from '../types'
  import { fetchPage } from '../fetch'

  export const load: Load = async () => {
    const page = await fetchPage(`contact`)
    return { props: { page } }
  }
</script>

<script lang="ts">
  export let page: Page

  const mapProps = {
    center: { lat: 43, lng: -10 },
    zoom: 4,
  }
  function onLoad(map: google.maps.Map) {
    new google.maps.Marker({
      position: { lat: 54.32791765, lng: 10.179823233482258 },
      map,
      title: `GEOMAR Helmholtz Centre for Ocean Research, Kiel`,
    })
    new google.maps.Marker({
      position: { lat: 27.9924864, lng: -15.3737573 },
      map,
      title: `Research Site: Taliarte, Spain`,
    })
  }
</script>

<BasePage {page}>
  <Map {mapProps} {onLoad} />
</BasePage>
