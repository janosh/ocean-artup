<script lang="ts">
  import Icon from '@iconify/svelte'
  import { Banner } from '.'
  import type { Page } from './types'

  export let page: Page

  $: ({ title, cover, sys, slug, body } = page)
  $: date = new Date(sys?.publishedAt).toLocaleDateString(`en`)

  const style = `height: 3ex; vertical-align: bottom; padding-right: 4pt;`
</script>

<svelte:head>
  <title>Ocean artUp{title ? ` - ${title}` : ``}</title>
  <meta name="date" content={date} />
</svelte:head>
<Banner {title} {cover} />
{#if body}
  <article>
    {@html body}
    <slot />
    {#if sys?.publishedAt && !(slug ?? ``).includes(`blog`)}
      <time>
        <Icon icon="ic:round-update" {style} /> Last updated:
        {date}
      </time>
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
