<script lang="ts">
  import Logo from './Logo.svelte'
</script>

<footer>
  <span>© {new Date().getFullYear()} Ocean artUp</span>
  <Logo width="3em" />
</footer>

<style>
  footer {
    place-content: center;
    place-items: center;
    background: var(--dark-bg);
    padding: 2em calc(1em + 3vw);
    color: white;
    display: flex;
    gap: 1ex;
  }
</style>
