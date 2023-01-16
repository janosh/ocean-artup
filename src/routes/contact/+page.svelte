<script lang="ts">
  import { BasePage, Map } from '$lib'
  import type { PageData } from './$types'

  export let data: PageData

  const markers = [
    {
      lat: 54.32791765,
      lng: 10.179823233482258,
      title: `GEOMAR Helmholtz Centre<br>for Ocean Research, Kiel`,
    },
    {
      lat: 27.9924864,
      lng: -15.3737573,
      title: `Research Site: Taliarte, Spain`,
    },
  ]
</script>

<BasePage page={data.page}>
  <Map lat={43} lng={0} zoom={3.3} {markers} />
</BasePage>
