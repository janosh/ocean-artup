<script lang="ts">
  import type { PageData } from './$types'

  import Img from '../../../components/Img.svelte'
  import ToolTip from '../../../components/ToolTip.svelte'

  export let data: PageData

  $: ({ title, body, cover } = data.post)
  $: ({ bio, name, photo } = data.post.author)
</script>

<Img {...cover} imgStyle="max-height: 80vh;" />
<article>
  <h1>{title}</h1>
  <section>
    <Img sizes={[{ w: 150 }]} {...photo} alt={name} />
    <span>
      by
      {#if bio}
        <ToolTip minWidth="18em">
          <strong>{name}</strong>
          <span slot="tip">
            {bio}
          </span>
        </ToolTip>
      {:else}
        <strong>{name}</strong>
      {/if}
      on
      <strong>{new Date(data.post.date).toLocaleDateString(`de`)}</strong>
    </span>
  </section>
  <br />
  {@html body}
</article>

<style>
  article {
    max-width: 42em;
    padding: 2em;
    margin: auto;
  }
  h1 {
    text-align: center;
  }
  article:first-child {
    margin-top: 4em;
  }
  section {
    text-align: center;
    font-weight: lighter;
  }
  section :global(img) {
    margin: 1em auto;
    display: block;
    width: 3em;
    height: 3em;
    border-radius: 50%;
  }
</style>
