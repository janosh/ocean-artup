<script context="module">
  import { fetchPersons, fetchAsset } from '../utils/queries'

  export async function preload() {
    const persons = await fetchPersons(`onTeamPage: true`)
    const cover = await fetchAsset(`42EIuEhA9Oicq4AewcwKaC`)
    return { persons, cover }
  }
</script>

<script>
  import Img from '../components/Img.svelte'
  import BasePage from '../components/BasePage.svelte'

  export let persons, cover

  const scientists = persons.filter((p) => p.role !== `Support`)
  const staff = persons.filter((p) => p.role === `Support`)

  const piIdx = scientists.map((s) => s.role).indexOf(`Principle Investigator`)
  const [pi] = scientists.splice(piIdx, 1)
  const sections = [
    [`Scientists`, scientists],
    [`Support Staff`, staff],
  ]
  const imgStyle = `border-radius: 50%; margin-bottom: 1em; max-width: 12em;`
</script>

<BasePage page={{ cover, title: `Team` }} />
<article>
  <Img
    src={pi.photo.src}
    alt={pi.name}
    sizes={[{ w: 300, h: 300 }]}
    {imgStyle}
    pictureStyle="justify-self: center;" />
  <a href="mailto:{pi.email}">{pi.name}</a>
  <small>{pi.role}</small>
  {#each sections as [title, arr]}
    <h2>{title}</h2>
    <ul>
      {#each arr as { name, email, photo, role, tasks, interests }}
        <li>
          <Img src={photo.src} alt={name} sizes={[{ w: 300, h: 300 }]} {imgStyle} />
          <a href="mailto:{email}">{name}</a>
          {#if role && role !== `Support`}
            <small>{role}</small>
          {/if}
          {#if title !== `Scientists`}
            <small>{tasks.join(`, `)}</small>
          {/if}
          {#if interests}
            <small>{interests.join(`, `)}</small>
          {/if}
        </li>
      {/each}
    </ul>
  {/each}
</article>

<style>
  article {
    text-align: center;
    max-width: 55em;
    margin: 4em auto;
    display: grid;
  }
  ul {
    display: grid;
    padding: 0;
    margin: 1em;
    list-style: none;
    grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
    grid-gap: 5em calc(1em + 1vw);
  }
  small {
    display: block;
    font-weight: lighter;
  }
</style>
