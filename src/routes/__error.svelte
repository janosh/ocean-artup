<script context="module">
  export function load({ error, status }) {
    return {
      props: { error, status },
    }
  }
</script>

<script>
  import { dev } from '$app/env'

  export let status
  export let error

  const offline = typeof navigator !== `undefined` && navigator.onLine === false

  const title = offline ? `Offline` : status
  const message = offline ? `Find the internet and try again` : error.message
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<h1>{title}</h1>

<p>{message}</p>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}

<style>
  pre {
    width: max-content;
    max-width: 30em;
    margin: 1em auto;
    white-space: pre-wrap;
  }
</style>
