<script lang="ts">
  import { page } from '$app/stores'
  import Img from '$lib/Img.svelte'
  import Icon from '@iconify/svelte'
  import { homepage, name } from '../../package.json'
  import type { LayoutData } from './$types'

  export let data: LayoutData

  let online: boolean
</script>

<svelte:head>
  <title>Error {$page.status} &bull; {name}</title>
</svelte:head>

<svelte:window bind:online />

<Img
  {...data.yaml.hero.img}
  pictureStyle="position: absolute; z-index: -1; object-fit: cover; height: 100%; width: 100%;"
  imgStyle="height: 100%;"
/>
<div>
  <h1>Error {String($page.status).replace(`0`, `😵`)}: {$page.error?.message}</h1>
  {#if $page.status >= 500}
    <p>
      If page reloading doesn't help, please raise an issue on
      <a href="{homepage}/issues" target="_blank" rel="noreferrer">GitHub</a>. Thanks! 🙏
    </p>
  {/if}
  {#if online === false}
    Looks like you're offline. If you think your connection is fine, check the
    <a href="https://githubstatus.com">GitHub status page</a>
    as this site is hosted by &thinsp;<Icon icon="octicon:mark-github" inline />&thinsp;
    GitHub Pages.
  {/if}

  <p>
    Back to <a href=".">
      <img src="favicon.svg" alt={name} height="30" />
      landing page
    </a>.
  </p>
</div>

<style>
  div {
    font-size: 1.1em;
    max-width: min(45em, 90vw);
    margin: 7em auto 0;
    text-align: center;
    color: white;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 1em 0;
    border-radius: 3pt;
  }
  a {
    color: var(--light-blue);
  }
  p img {
    vertical-align: middle;
    margin: 0 1pt 0 3pt;
    width: min-content;
  }
</style>
