<script lang="ts">
  import Search from 'svelte-algolia'
  import Nav from './Nav.svelte'
  import SearchHit from './SearchHit.svelte'
  import type { Link } from './types'

  export let nav: Link[]

  const appId = import.meta.env.VITE_ALGOLIA_APP_ID as string
  const searchKey = import.meta.env.VITE_ALGOLIA_SEARCH_KEY as string

  let scrollY: number
</script>

<svelte:window bind:scrollY />

<header class:opaque={scrollY > 200}>
  <Nav links={nav} />
  <Search
    indices={{ Pages: SearchHit, Posts: SearchHit, People: SearchHit }}
    {appId}
    {searchKey}
    --search-hits-bg-color="var(--lighter-gray)"
    --search-icon-color="white"
    --search-input-color="white"
  />
</header>

<style>
  header {
    place-content: center;
    place-items: center;
    gap: calc(1ex + 2vw);
    white-space: nowrap;
    display: grid;
    top: 0;
    font-weight: 300;
    z-index: 2;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    transition: 0.2s;
  }
  header.opaque {
    background: var(--dark-bg);
  }
  @media (max-width: 900px) {
    header {
      font-size: 1.4em;
      gap: 5vw;
      grid-template-columns: auto 1fr auto auto;
      grid-template-areas: 'nav logo search'; /* switch order of nav and logo*/
      padding: 3pt 2ex;
    }
  }
  @media (min-width: 901px) {
    header {
      padding: 3pt 1ex;
      font-size: 1.2em;
      display: flex;
    }
  }
</style>
