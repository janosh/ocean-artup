<script lang="ts">
  import mapboxgl from 'mapbox-gl'
  import 'mapbox-gl/dist/mapbox-gl.css'
  import { onMount } from 'svelte'

  export let map: mapboxgl.Map | null = null
  export let markers: MapMarker[] = []
  export let lng = 10
  export let lat = 51.3
  export let zoom = 5.05
  export let minZoom = 2
  export let maxZoom = 10
  export let css = ``

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_PUBLIC_KEY
  let map_div: HTMLDivElement
  type MapMarker = {
    lng: number
    lat: number
    title: string
    url?: string
    classes?: string[]
  }

  // sort markers from north to south so southern makers have higher z-index
  $: markers = markers.sort((m1, m2) => m2.lat - m1.lat)

  onMount(() => {
    map = new mapboxgl.Map({
      cooperativeGestures: true,
      container: map_div,
      style: `mapbox://styles/mapbox/outdoors-v11?optimize=true`,
      center: [lng, lat],
      zoom,
      minZoom,
      maxZoom,
    })

    // map.on(`load`, map.resize) // ensure map takes up full available width

    for (const { lng, lat, title, url, classes = [`marker`] } of markers) {
      const node = document.createElement(url ? `a` : `span`)
      node.innerHTML = title
      if (url) node.href = url
      if (classes?.length) node.classList.add(...classes)

      const marker = new mapboxgl.Marker(node, { anchor: `bottom`, offset: [0, -11] })
      marker.setLngLat([lng, lat]).addTo(map)
    }
  })
</script>

<div bind:this={map_div} style={css} on:resize={map.resize} />

<style>
  div {
    height: 700px;
    max-height: 75vh;
    min-height: 530px;
    border-radius: 3pt;
  }
  :global(.mapboxgl-ctrl-attrib-inner, .mapboxgl-ctrl-bottom-left) {
    display: none;
  }
  :global(.marker) {
    color: white;
    border-radius: 3pt;
    padding: 0 3pt;
    background-color: rgba(0, 0, 0, 0.7);
    text-align: center;
  }
  :global(.marker::after) {
    content: '';
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%);
    border: solid;
    border-width: 8pt 6pt;
    box-sizing: border-box;
    border-color: rgba(0, 0, 0, 0.7) transparent transparent transparent;
  }
</style>
