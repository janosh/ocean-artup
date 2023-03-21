<script lang="ts">
  import { BasePage } from '$lib'

  export let data
</script>

{#if data.page}
  <BasePage page={data.page} />
{/if}
