<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'
  import Banner from '../components/Banner.svelte'
  import Img from '../components/Img.svelte'
  import type { Image, Person } from '../types'
  import { fetchAsset, fetchPersons } from '../utils/queries'

  export const load: Load = async () => {
    const persons = await fetchPersons(`onTeamPage: true`)
    const cover = await fetchAsset(`42EIuEhA9Oicq4AewcwKaC`)
    return { props: { persons, cover } }
  }
</script>

<script lang="ts">
  export let persons: Person[]
  export let cover: Image

  const scientists = persons.filter((p) => p.role !== `Support`)
  const staff = persons.filter((p) => p.role === `Support`)

  // remove PI from scientists list to render at the top
  const piIdx = scientists.map((s) => s.role).indexOf(`Principle Investigator`)
  const [pi] = scientists.splice(piIdx, 1)

  const sections: [string, Person[]][] = [
    [`Scientists`, scientists],
    [`Support Staff`, staff],
  ]
  const imgStyle = `border-radius: 50%; max-height: 12em; max-width: 12em;`
</script>

<Banner title="Team" {cover} />

<article>
  <Img
    src={pi.photo.src}
    alt={pi.name}
    sizes={[{ w: 250, h: 250 }]}
    {imgStyle}
    pictureStyle="justify-self: center;"
  />
  <a href="mailto:{pi.email}">{pi.name}</a>
  <small>{pi.role}</small>
  {#each sections as [title, arr]}
    <h2>{title}</h2>
    <ul>
      {#each arr as { name, email, photo, role, tasks, interests }}
        <li>
          <Img src={photo.src} alt={name} sizes={[{ w: 250, h: 250 }]} {imgStyle} />
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
