<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'
  import Img from '../components/Img.svelte'
  import type { Image } from '../types'
  import { base64Thumbnail, fetchYaml } from '../fetch'

  export const load: Load = async () => {
    const yaml = await fetchYaml(`Landing Page`)

    yaml.hero.img.base64 = await base64Thumbnail(yaml.hero.img.src)
    // forEach doesn't work here: https://stackoverflow.com/a/37576787
    for (const itm of yaml.spotlights) {
      itm.img.base64 = await base64Thumbnail(itm.img.src)
    }
    return { props: { yaml } }
  }
</script>

<script lang="ts">
  export let yaml: {
    hero: Hero
    about: string
    spotlights: Spotlight[]
    participants: Record<string, Participant[]>
  }

  type Hero = { img: Image; title: string; subtitle: string }
  type Spotlight = { img: Image; title: string; slug: string; text: string }
  type Participant = { src: string; alt: string; url: string }

  const { hero, about, spotlights, participants } = yaml
</script>

<svelte:head>
  <title>Ocean artUp</title>
</svelte:head>

<figure>
  <Img
    {...hero.img}
    imgStyle="height: 100%"
    pictureStyle="height: 100%"
    sizes={[{ w: 2000 }, { w: 1500 }, { w: 1200 }, { w: 900 }, { w: 500 }, { w: 400 }]}
  />
  <hgroup>
    <h1>{hero.title}</h1>
    <h2>{hero.subtitle}</h2>
  </hgroup>
</figure>

<section class="about">
  <p>{about}</p>
</section>

<article>
  {#each spotlights as { title, slug, text, img }}
    <section class="spotlight">
      <div>
        <h2><a href={slug}>{title}</a></h2>
        <p>{@html text}</p>
      </div>
      <a href={slug}><Img {...img} imgStyle="height: 100%" /></a>
    </section>
  {/each}
</article>

<section class="participants">
  <img
    src="logo-with-name.svg"
    alt="Ocean artUp Logo"
    style="width: 15em; margin: 2em;"
  />
  <div>
    {#each Object.entries(participants) as [key, arr] (key)}
      <div>
        <h2>{key}</h2>
        {#each arr as { alt, src, url } (alt)}
          <a href={url}><img {src} {alt} /></a>
        {/each}
      </div>
    {/each}
  </div>
</section>

<style>
  * {
    color: white;
    text-align: center;
  }
  a {
    color: var(--darkOrange);
  }
  figure {
    margin: 0;
    position: relative;
    height: 35em;
  }
  figure hgroup {
    text-align: center;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    font-size: 2.7ex;
    width: 85%;
  }
  article {
    background: var(--gray_darkGray);
  }
  section p {
    max-width: 30em;
    margin: auto;
  }
  section.about {
    background: var(--lightGreen);
    padding: 5em 10vw;
    font-size: 2.5ex;
  }
  section.spotlight {
    max-width: 75em;
    margin: auto;
    display: flex;
    height: 25em;
  }
  section.spotlight :global(picture) {
    height: 100%;
  }
  section.spotlight:nth-child(odd) {
    flex-direction: row-reverse;
  }
  section.spotlight div {
    display: grid;
    place-content: center;
    margin: 2em;
  }
  @media (max-width: 800px) {
    section.spotlight {
      flex-direction: column !important;
      height: auto;
    }
  }
  section.participants {
    padding: calc(1em + 3vw);
    display: grid;
    place-items: center;
    background: white;
  }
  section.participants h2 {
    background: var(--lightGreen);
    border-radius: 1ex;
    height: max-content;
    width: 100%;
  }
  section.participants div {
    display: flex;
    gap: 2em;
    width: 100%;
    justify-items: center;
    max-width: 50em;
  }
  section.participants > div > div {
    display: grid;
    flex: 1;
    width: calc(10em + 2vw);
  }
  section.participants > div > div > a {
    transition: 0.3s;
  }
  section.participants > div > div > a:hover {
    transform: scale(1.02);
  }
  @media (max-width: 800px) {
    section.participants div {
      display: grid;
    }
    section.participants div div {
      display: grid;
      width: 100%;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto 6em;
    }
    section.participants div h2 {
      grid-column: 1 / -1;
    }
  }
</style>
