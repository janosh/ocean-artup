<script lang="ts">
  import { page } from '$app/stores'
  import Menu from '@svicons/heroicons-solid/menu.svelte'
  import type { Link } from '../types'
  import { onClickOutside } from '../actions'
  import Logo from './Logo.svelte'

  export let nav: Link[]

  let isOpen = false

  // isCurrent needs to be reactive to respond to changes in $page.url.pathname
  $: isCurrent = (url: string) => {
    if (url === $page.url.pathname) return `page`
    if (url !== `/` && $page.url.pathname.includes(url)) return `page`
    return undefined
  }
</script>

<button on:click|preventDefault={() => (isOpen = true)} aria-label="Open nav bar">
  <Menu height="2.9ex" style="vertical-align: middle;" />
</button>

<a sveltekit:prefetch class="logo" href="/" aria-current={isCurrent(`/`)}>
  <Logo style="height: 2em;" />
</a>

<nav class:isOpen use:onClickOutside={() => (isOpen = false)}>
  <ul>
    {#each nav as { title, url }, idx}
      <li>
        <a
          on:click={() => (isOpen = false)}
          sveltekit:prefetch
          aria-current={isCurrent(url)}
          href={url}
        >
          {title}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  button {
    grid-area: nav;
    padding: 0;
  }
  a,
  button {
    transition: 0.4s;
    border-radius: 50%;
    color: white;
  }
  button:hover {
    background: var(--gray);
  }
  a[aria-current] {
    color: var(--orange);
  }
  a.logo {
    grid-area: logo;
    border-radius: 50%;
    padding: 2pt;
    display: flex;
  }
  ul {
    list-style: none;
  }
  nav {
    overflow: auto;
  }
  @media (max-width: 900px) {
    /* mobile styles */
    nav {
      position: fixed;
      top: 1em;
      left: 1em;
      padding: 1em;
      transition: 0.4s;
      max-height: calc(100vh - 2em);
      background: var(--gray);
      transform: translate(-120%);
      box-sizing: border-box;
      overscroll-behavior: none;
    }
    nav.isOpen {
      box-shadow: 0 0 1em black;
      transform: translate(0);
    }
    nav > ul {
      display: grid;
      grid-gap: 1ex;
      padding: 0;
      margin: 0;
    }
    a.logo {
      /* needed for centering logo since menu button takes less space than colormode + search */
      margin-left: 4vw;
    }
  }
  @media (min-width: 901px) {
    /* desktop styles */
    nav,
    nav > ul {
      display: contents;
    }
    nav > ul > li {
      position: relative;
    }
    button:first-child {
      display: none;
    }
  }
</style>
