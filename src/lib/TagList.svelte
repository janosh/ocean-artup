<script lang="ts">
  import { fade, slide } from 'svelte/transition'
  import ChevronExpand from '~icons/bi/chevron-expand'
  import PackageIcon from '~icons/bx/package'
  import Connectdevelop from '~icons/fa-brands/connectdevelop'
  import Tags from '~icons/fa-solid/tags'
  import Announcements from '~icons/ic/announcement'
  import EventAvailable from '~icons/ic/event-available'
  import Biotech from '~icons/ic/round-biotech'
  import CloseCross from '~icons/ic/round-close'
  import Waves from '~icons/ic/round-waves'
  import SelectAll from '~icons/ic/select-all'
  import Settings from '~icons/ic/settings'
  import type { BlogTag } from '../types'

  export let tagOccurrences: [BlogTag, number][]
  export let activeTag = `All`

  const icons = {
    All: SelectAll,
    Events: EventAvailable,
    Logistics: PackageIcon,
    Science: Biotech,
    Announcements,
    Tech: Settings,
    Social: Connectdevelop,
    'Field Campaign 2018': Waves,
    'Field Campaign 2019': Waves,
  }

  let open = false
  let viewWidth: number
  const style = `height: 18pt; vertical-align: middle; margin-right: 5pt;`
</script>

<svelte:window bind:innerWidth={viewWidth} />

<h2>
  <Tags style="height: 16pt; margin-right: 5pt;" />Tags
  {#if viewWidth < 750}
    <button on:click={() => (open = !open)} aria-label="Open blog tags">
      {#if open}
        <CloseCross {style} />
      {:else}
        <ChevronExpand {style} />
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
          <svelte:component
            this={icons[tag]}
            style="height: 2.2ex; vertical-align: -3pt; margin-right: 6pt"
          />
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
    background: var(--accent-bg);
    border-radius: 3pt;
  }
  ul > li > button.active {
    background: var(--orange);
  }
</style>
