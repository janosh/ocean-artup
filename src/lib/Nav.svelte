<script lang="ts">
  import { page } from '$app/stores'
  import Icon from '@iconify/svelte'
  import type { Link } from '../types'
  import Logo from './Logo.svelte'

  export let links: Link[]

  let isOpen = false
  let nav: HTMLElement

  // isCurrent needs to be reactive to respond to changes in $page.url.pathname
  $: isCurrent = (url: string) => {
    if (url === $page.url.pathname) return `page`
    if (url !== `/` && $page.url.pathname.includes(url)) return `page`
    return undefined
  }
</script>

<svelte:window
  on:click={(event) => {
    if (!nav.contains(event.target)) isOpen = false
  }}
/>

<button on:click|preventDefault={() => (isOpen = true)} aria-label="Open nav bar">
  <Icon icon="ic:round-menu" height="2.9ex" inline />
</button>

<a class="logo" href="/" aria-current={isCurrent(`/`)}>
  <Logo style="height: 2em;" color="white" />
</a>

<nav class:isOpen bind:this={nav}>
  <ul>
    {#each links as { title, url }, idx}
      <li>
        <a on:click={() => (isOpen = false)} aria-current={isCurrent(url)} href={url}>
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
