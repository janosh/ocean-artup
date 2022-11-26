<script lang="ts">
  import Icon from '@iconify/svelte'
  import { fade, slide } from 'svelte/transition'
  import type { BlogTag } from '../types'

  export let tagOccurrences: [BlogTag, number][]
  export let activeTag = `All`

  const icon_map = {
    All: `ic:select-all`,
    Events: `ic:event-available`,
    Logistics: `bx:package`,
    Science: `ic:round-biotech`,
    Announcements: `ic:announcement`,
    Tech: `ic:settings`,
    Social: `fa:brands/connectdevelop`,
    'Field Campaign 2018': `ic:round-waves`,
    'Field Campaign 2019': `ic:round-waves`,
  }

  let open = false
  let viewWidth: number
</script>

<svelte:window bind:innerWidth={viewWidth} />

<h2>
  <Icon icon="fa-solid:tags" style="height: 18pt; margin: 0 2pt 0 0;" />Tags
  {#if viewWidth < 750}
    <button on:click={() => (open = !open)} aria-label="Open blog tags">
      {#if open}
        <Icon inline icon="ic:round-close" />
      {:else}
        <Icon inline icon="bi:chevron-expand" />
      {/if}
    </button>
  {/if}
</h2>
{#if viewWidth > 750 || open}
  <ul transition:slide>
    {#each tagOccurrences as [tag, count]}
      <li>
        <button
          transition:fade
          aria-label="Nach Tag {tag} filtern"
          class:active={activeTag === tag}
          on:click={() => (activeTag = tag)}
        >
          <Icon inline icon={icon_map[tag]} style="margin: 0 6pt 0 0" />
          {tag} ({count})
        </button>
      </li>
    {/each}
  </ul>
{/if}

<style>
  h2 {
    text-align: center;
    margin-top: 2em;
  }
  ul {
    font-size: 0.9em;
    padding: 0 1em 2em;
    max-width: 50em;
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    place-content: center;
    margin: auto;
    list-style: none;
  }
  ul > li > button {
    padding: 3pt 7pt;
    transition: 0.4s;
    display: flex;
    align-items: center;
    background: var(--light-gray);
    border-radius: 3pt;
  }
  ul > li > button.active {
    background: var(--orange);
  }
</style>
