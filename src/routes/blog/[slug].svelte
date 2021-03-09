<script context="module">
  import { fetchPost } from '../../utils/queries'

  export async function preload({ params }) {
    const post = await fetchPost(params.slug)
    return { post }
  }
</script>

<script>
  import ToolTip from '../../components/ToolTip.svelte'

  import Calendar from '@svg-icons/octicons/calendar.svg'
  import PersonCircle from '@svg-icons/bootstrap/person-circle.svg'
  import Img from '../../components/Img.svelte'

  export let post

  $: ({ title, body, cover } = post)
  $: ({ bio, name, photo } = post.author)
  const style = `height: 18pt; vertical-align: -3pt; padding: 0 3pt;`
</script>

<Img {...cover} imgStyle="max-height: 60vh;" />
<article>
  <h1>{title}</h1>
  <section>
    <Img sizes={[{ w: 150 }]} {...photo} alt={name} />
    <span>
      von
      {#if bio}
        <ToolTip minWidth="18em">
          <PersonCircle {style} />
          <strong>{name}</strong>
          <span slot="tip">
            {bio}
          </span>
        </ToolTip>
      {:else}
        <PersonCircle {style} />
        <strong>{name}</strong>
      {/if}
      am
      <Calendar {style} />
      <strong>{new Date(post.date).toLocaleDateString(`de`)}</strong>
    </span>
  </section>
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
