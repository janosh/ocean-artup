<script lang="ts">
  import type { Image } from '../types'
  import Img from './Img.svelte'

  export let cover: Image
  export let title: string
</script>

<figure>
  <Img {...cover} imgStyle="height: 100%" />
  <h1>{title}</h1>
</figure>

<style>
  figure {
    position: relative;
    overflow: hidden;
    height: 30em;
    max-height: 50vh;
    margin: 0;
  }
  figure > h1 {
    color: white;
    background: rgba(0, 0, 0, 0.4);
    font-size: 5ex;
    padding: 0 1ex;
    border-radius: 1ex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(calc(-50% - 1em), -50%);
    text-align: center;
    margin: 0 1em;
    width: max-content;
    box-sizing: border-box;
    max-width: 80vw;
  }
</style>
