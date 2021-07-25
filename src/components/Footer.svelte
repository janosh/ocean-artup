<script lang="ts">
  import OpenSource from '@svicons/remix-fill/open-source.svelte'

  import Logo from './Logo.svelte'
</script>

<footer>
  <span>© {new Date().getFullYear()} Ocean artUp</span>
  <Logo style="height: 5ex; grid-row: 1;" />
  <span>
    This site is
    <a href="https://github.com/janosh/ocean-artup">
      <OpenSource
        height="2.5ex"
        style="vertical-align: middle; margin: 0 3pt 0 1pt;" />open source
    </a>
  </span>
</footer>

<style>
  footer {
    text-align: center;
    place-content: center;
    place-items: center;
    background: var(--darkBg);
    padding: 4em calc(1em + 3vw);
    color: white;
    display: grid;
    grid-gap: calc(2em + 3vw);
  }
  @media (min-width: 550px) {
    footer {
      grid-auto-flow: column;
    }
  }
  footer :global(a) {
    color: var(--orange);
  }
  footer :global(a:hover) {
    color: var(--lightGreen);
  }
</style>
