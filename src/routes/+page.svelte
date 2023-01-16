<script lang="ts">
  import { Img } from '$lib'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<svelte:head>
  <title>Ocean artUp</title>
</svelte:head>

<figure>
  <Img
    {...data.yaml.hero.img}
    imgStyle="height: 100%"
    pictureStyle="height: 100%"
    sizes={[{ w: 2000 }, { w: 1500 }, { w: 1200 }, { w: 900 }, { w: 500 }, { w: 400 }]}
  />
  <hgroup>
    <h1>{data.yaml.hero.title}</h1>
    <h2>{data.yaml.hero.subtitle}</h2>
  </hgroup>
</figure>

<section class="about">
  <p>{data.yaml.about}</p>
</section>

<article>
  {#each data.yaml.spotlights as { title, slug, text, img }}
    <section class="spotlight">
      <div>
        <h2><a href={slug}>{title}</a></h2>
        <p>{@html text}</p>
      </div>
      <a href={slug} style="width: 100%;">
        <Img {...img} imgStyle="height: 100%" pictureStyle="height: 100%;" />
      </a>
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
    {#each Object.entries(data.yaml.participants) as [key, arr] (key)}
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
  :is(section, figure) {
    color: white;
    text-align: center;
    hyphens: none;
  }
  a {
    color: var(--dark-orange);
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
    background: var(--gray);
  }
  section p {
    max-width: 30em;
    margin: auto;
  }
  section.about {
    background: var(--light-green);
    padding: 5em 10vw;
    font-size: 2.5ex;
  }
  section.spotlight {
    display: flex;
    flex-direction: column;
  }
  section.spotlight div {
    display: grid;
    place-content: center;
    margin: 2em 5em;
  }
  @media (min-width: 800px) {
    section.spotlight {
      max-width: 75em;
      margin: auto;
      max-height: 25em;
      flex-direction: row;
    }
    section.spotlight:nth-child(odd) {
      flex-direction: row-reverse;
    }
  }
  section.participants {
    padding: calc(1em + 3vw);
    display: grid;
    place-items: center;
    background: white;
  }
  section.participants h2 {
    background: var(--light-green);
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
