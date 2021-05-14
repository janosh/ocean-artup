<script>
  import Img from './Img.svelte'

  export let hit
  export let clickHandler = () => {}

  $: ({ title, slug, body, cover = {}, date, author } = hit)
  const imgStyle = `border-radius: 3pt; max-height: 125px`
</script>

<div>
  {#if cover.src}
    <a href={slug} on:click={clickHandler}>
      <Img {...cover} sizes={[{ w: 150 }]} {imgStyle} />
    </a>
  {/if}
  <h3>
    <a href={slug} on:click={clickHandler}>{@html title}</a>
  </h3>
  {#if date}<span>{@html new Date(date).toLocaleDateString(`de`)}</span>{/if}
  {#if author}<span>{@html author.name}</span>{/if}
  {#if body}
    <p>
      {@html body}
    </p>
  {/if}
</div>

<style>
  div {
    background: var(--accentBg);
    padding: 1ex 1em;
    border-radius: 5pt;
    margin: 1em 0;
  }
  div > h3 {
    margin-top: 0;
  }
  div > p {
    margin-bottom: 0;
  }
  div :global(picture) {
    float: right;
    margin: 1ex 0 1ex 1ex;
  }
  div :global(em) {
    background: var(--orange);
    line-height: 1.2em;
    border-radius: 2pt;
    font-style: normal;
  }
</style>
