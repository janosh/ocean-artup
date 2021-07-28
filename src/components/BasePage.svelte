<script lang="ts">
  import Update from '@svicons/material-sharp/update.svelte'

  import { dateToStr } from '../utils'
  import Banner from './Banner.svelte'

  import type { Page } from '../types'

  export let page: Page

  $: ({ title, cover, sys, slug } = page)

  const style = `height: 3ex; vertical-align: bottom; padding-right: 4pt;`
</script>

<svelte:head>
  <title>Ocean artUp{title ? ` - ${title}` : ``}</title>
  <meta name="date" content={dateToStr(sys?.publishedAt)} />
</svelte:head>
<Banner {title} {cover} />
{#if page?.body}
  <article>
    {@html page?.body}
    <slot />
    {#if sys?.publishedAt && !(slug ?? ``).includes(`blog`)}
      <time>
        <Update {style} /> Last updated:
        {dateToStr(sys?.publishedAt)}</time>
    {/if}
  </article>
{/if}

<style>
  article {
    max-width: 42em;
    padding: 1em;
    margin: 2em auto;
  }
  time {
    display: block;
    font-size: 1ex;
    margin: 2em;
    margin-top: 4em;
    text-align: center;
  }
</style>
