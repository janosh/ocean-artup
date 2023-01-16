<script lang="ts">
  import { Banner, Img } from '$lib'
  import type { Person } from '$lib/types'
  import type { PageData } from './$types'

  export let data: PageData

  const scientists = data.persons.filter((p) => p.role !== `Support`)
  const staff = data.persons.filter((p) => p.role === `Support`)

  // remove PI from scientists list to render at the top
  const piIdx = scientists.map((s) => s.role).indexOf(`Principle Investigator`)
  const [pi] = scientists.splice(piIdx, 1)

  const sections: [string, Person[]][] = [
    [`Scientists`, scientists],
    [`Support Staff`, staff],
  ]
  const imgStyle = `border-radius: 50%; max-height: 12em; max-width: 12em;`
</script>

<Banner title="Team" cover={data.cover} />

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
