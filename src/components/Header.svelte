<script>
  import Nav from './Nav.svelte'
  import ColorMode from './ColorMode.svelte'
  import Search from './Search.svelte'

  export let nav

  let scrollY
</script>

<svelte:window bind:scrollY />

<header class:opaque={scrollY > 200}>
  <Nav {nav} />
  <ColorMode />
  <Search indices={[`Pages`, `Posts`, `People`]} />
</header>

<style>
  header {
    place-content: center;
    place-items: center;
    gap: calc(1ex + 2vw);
    white-space: nowrap;
    display: grid;
    position: sticky;
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
    background: var(--darkBg);
  }
  @media (max-width: 900px) {
    header {
      font-size: 1.4em;
      gap: 5vw;
      grid-template-columns: auto 1fr auto auto;
      grid-template-areas: 'nav logo colormode search'; /* switch order of nav and logo*/
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
