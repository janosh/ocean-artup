<script>
  import { slide, fade } from 'svelte/transition'

  import Tags from '@svicons/fa-solid/tags.svelte'
  import ChevronExpand from '@svicons/bootstrap/chevron-expand.svelte'
  import SelectAll from '@svicons/material-sharp/select-all.svelte'
  import CircleWithCross from '@svicons/entypo/circle-with-cross.svelte'
  import EventAvailable from '@svicons/material-sharp/event-available.svelte'
  import PackageIcon from '@svicons/boxicons-regular/package-icon.svelte'
  import Biotech from '@svicons/material-sharp/biotech.svelte'
  import Announcements from '@svicons/material-sharp/announcement.svelte'
  import Settings from '@svicons/material-sharp/settings.svelte'
  import Connectdevelop from '@svicons/fa-brands/connectdevelop.svelte'
  import Waves from '@svicons/material-sharp/waves.svelte'

  export let tags
  export let activeTag = `Alle`

  const icons = {
    Alle: SelectAll,
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
  let viewWidth
  const style = `height: 18pt; vertical-align: middle; margin-right: 5pt;`
</script>

<svelte:window bind:innerWidth={viewWidth} />

<h2>
  <Tags style="height: 16pt; margin-right: 5pt;" />Tags
  {#if viewWidth < 750}
    <button on:click={() => (open = !open)} aria-label="Open blog tags">
      {#if open}
        <CircleWithCross {style} />
      {:else}
        <ChevronExpand {style} />
      {/if}
    </button>
  {/if}
</h2>
{#if viewWidth > 750 || open}
  <ul transition:slide>
    {#each Object.entries(tags) as [tag, count]}
      <li>
        <button
          transition:fade
          aria-label="Nach Tag {tag} filtern"
          class:active={activeTag === tag}
          on:click={() => (activeTag = tag)}>
          <svelte:component
            this={icons[tag]}
            style="height: 2.2ex; vertical-align: -3pt; margin-right: 6pt" />
          {tag}
          ({count})</button>
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
    background: var(--accentBg);
    border-radius: 3pt;
  }
  ul > li > button.active {
    background: var(--orange);
  }
</style>
