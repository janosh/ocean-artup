<script>
  import { onMount } from 'svelte'
  import { session } from '$app/stores'

  export let onLoad = () => {}
  export let mapProps = {}

  let div, map

  // default map props
  mapProps = { center: { lat: 51.5, lng: 10 }, zoom: 6, ...mapProps }

  const mountMap = () => (map = new window.google.maps.Map(div, mapProps))

  onMount(() => {
    if (!window.google) {
      const script = document.createElement(`script`)
      script.async = true
      script.src = `https://maps.googleapis.com/maps/api/js?key=${$session.GOOGLE_MAPS_API_KEY}`
      document.head.append(script)
      script.addEventListener(`load`, mountMap)
      return () => script.removeEventListener(`load`, mountMap)
    } else mountMap()
  })

  $: if (map && typeof onLoad === `function`) onLoad(map)
</script>

<div bind:this={div} />

<style>
  div {
    height: 700px;
    max-height: 75vh;
    min-height: 530px;
  }
</style>
