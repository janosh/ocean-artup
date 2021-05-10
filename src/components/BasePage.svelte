<script>
  import Update from '@svicons/material-sharp/update.svelte'

  import Img from '../components/Img.svelte'
  import { dateToStr } from '../utils'

  export let page

  $: ({ title, cover, sys, slug } = page || {})

  const style = `height: 3ex; vertical-align: bottom; padding-right: 4pt;`
</script>

<svelte:head>
  <title>Ocean artUp{title ? ` - ${title}` : ``}</title>
  <meta name="date" content={dateToStr(sys?.publishedAt)} />
</svelte:head>
{#if page}
  <figure>
    <Img {...cover} imgStyle="height: 100%" />
    <h1>{title}</h1>
  </figure>
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
{/if}

<style>
  article {
    max-width: 42em;
    padding: 1em;
    margin: 2em auto;
  }
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
    max-width: 80vw;
  }
  time {
    display: block;
    font-size: 1ex;
    margin: 2em;
    margin-top: 4em;
    text-align: center;
  }
</style>
