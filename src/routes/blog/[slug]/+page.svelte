<script lang="ts">
  import { Img } from '$lib'
  import { Tooltip } from 'svelte-zoo'

  export let data

  $: ({ title, body, cover, date } = data.post)
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
        <Tooltip min_width="18em">
          <strong>{name}</strong>
          <span slot="tip">
            {bio}
          </span>
        </Tooltip>
      {:else}
        <strong>{name}</strong>
      {/if}
      on
      <strong>{new Date(date).toLocaleDateString(`de`)}</strong>
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
