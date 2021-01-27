<script>
  import { onMount } from 'svelte'
  import algoliasearch from 'algoliasearch/lite'
  import { stores } from '@sapper/app'
  import Search from '@svg-icons/fa-solid/search.svg'

  import SearchHit from './SearchHit.svelte'
  import { onClickOutside } from '../utils/actions'

  const { session } = stores()
  const { ALGOLIA_APP_ID: appId, ALGOLIA_SEARCH_KEY: searchKey } = $session

  export let indices = []
  let client, input, query, promise
  let hasFocus = false

  onMount(() => (client = algoliasearch(appId, searchKey)))

  const processHits = (hits) =>
    hits.map((hit) => {
      for (const [key, val] of Object.entries(hit)) {
        hit[key] =
          hit?._snippetResult?.[key]?.value || hit?._highlightResult?.[key]?.value || val
      }
      return hit
    })

  async function search() {
    const { results } = await client.multipleQueries(
      indices.map((indexName) => ({ indexName, query }))
    )
    return results.map(({ hits, index }) => ({ hits: processHits(hits), index }))
  }

  const style = `vertical-align: middle; z-index: 0;`
</script>

<aside use:onClickOutside={() => (hasFocus = false)}>
  <input
    type="text"
    bind:this={input}
    bind:value={query}
    on:keyup={() => (promise = search())}
    placeholder="Suchen"
    aria-label="Suche"
    class:hasFocus />
  <button
    on:click={() => {
      hasFocus = true
      input.focus()
    }}
    title="Suche">
    <Search alt="Lupe" height="{hasFocus ? 1.9 : 2.3}ex" {style} />
  </button>
  {#if hasFocus && query}
    <div class="results">
      {#await promise}
        <p>Searching...</p>
      {:then allHits}
        {#if allHits?.some(({ hits }) => hits.length)}
          {#each allHits as { index, hits } (index)}
            {#if hits.length}
              <section>
                <h2>
                  {index}
                  {#if hits.length > 0}<span>Results: {hits.length}</span>{/if}
                </h2>
                {#each hits as hit (hit.objectID)}
                  <SearchHit {hit} clickHandler={() => (hasFocus = false)} />
                {/each}
              </section>
            {/if}
          {/each}
        {:else}No results for '{query}'{/if}
      {/await}
    </div>
  {/if}
</aside>

<style>
  aside {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    color: var(--textColor);
  }
  button {
    align-items: center;
    padding: 0;
    grid-area: search;
    position: relative;
    color: white;
  }
  h2 {
    border-bottom: 1px solid;
    text-align: center;
    position: relative;
  }
  h2 span {
    position: absolute;
    font-size: 1ex;
    bottom: 0;
    right: 0;
  }
  input {
    font-size: 1em;
    background: var(--darkGray);
    border-radius: 5pt;
    border: 0;
    outline: none;
    width: 0;
    cursor: pointer;
    transition: 0.3s;
    opacity: 0;
    padding: 0;
    height: 2.5ex;
    line-height: inherit;
    color: var(--lightGray);
  }
  input.hasFocus {
    opacity: 1;
    width: 7em;
    margin-left: -2.5ex;
    padding-left: 3ex;
  }
  input::placeholder {
    color: var(--lightGray);
  }
  input.hasFocus + button {
    color: var(--lightGray);
  }
  div.results {
    z-index: 1;
    background: var(--bodyBg);
    top: 3ex;
    max-height: 60vh;
    position: absolute;
    width: 30em;
    max-width: 80vw;
    overflow: auto;
    right: 0;
    box-shadow: 0 0 1ex black;
    padding: 1ex 1em;
    border-radius: 5pt;
    overscroll-behavior: none;
  }
  section {
    font-size: 0.7em;
    white-space: initial;
    width: 100%;
  }
  section :global(em) {
    background: var(--lightGreen);
    line-height: 1.2em;
    border-radius: 3pt;
    font-style: normal;
  }
</style>
