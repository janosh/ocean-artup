<script lang="ts">
  import BasePage from '$lib/BasePage.svelte'
  import Map from '$lib/Map.svelte'
  import type { PageData } from './$types'

  export let data: PageData

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

<BasePage page={data.page}>
  <Map {mapProps} {onLoad} />
</BasePage>
