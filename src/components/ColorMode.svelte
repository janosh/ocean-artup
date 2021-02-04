<script>
  import Modal from './Modal.svelte'
  import { colorMode, colorModeKey } from '../stores'
  import { modeColors, colors } from '../colors'
  import Sun from '@svg-icons/fa-solid/sun.svg'
  import Moon from '@svg-icons/entypo/moon.svg'
  import BrightnessAuto from '@svg-icons/material-sharp/brightness-auto.svg'

  const setModeFactory = (mode) => () => {
    open = false
    $colorMode = mode
    applyColors()
  }

  function applyColors() {
    // 🎨
    // If colorMode is `auto` we pick dark or light depending on prefersDark media query.
    const prefersDark = window.matchMedia(`(prefers-color-scheme: dark)`).matches
    let activeMode
    if ($colorMode === `auto`) activeMode = prefersDark ? `dark` : `light`
    else activeMode = $colorMode

    // Define CSS vars for moded colors (both during SSR and in production).
    for (const [key, val] of Object.entries(modeColors[activeMode])) {
      if (val === undefined) console.error(`CSS variable ${key} is undefined`)
      document.body.style.setProperty(`--${key}`, val)
    }

    // Define CSS vars for non-moded colors as well while we're at it
    for (const [key, val] of Object.entries(colors)) {
      document.body.style.setProperty(`--${key}`, val)
    }
  }

  // boundFn and the svelte:head script below provide SSR support
  // we modify a stringified version of applyColors so it can run before hydration
  const ssrModeVar = `const colorMode = localStorage.${colorModeKey} ?? 'auto'\n\t\t`
  const ssrModedColors = `const modeColors = ${JSON.stringify(modeColors)}\n\t\t`
  const ssrColors = `const colors = ${JSON.stringify(colors)}`
  const boundFn = String(applyColors)
    .replace(`// 🎨`, ssrModeVar + ssrModedColors + ssrColors)
    .replaceAll(`$colorMode`, `colorMode`)

  // eslint-disable-next-line no-useless-escape
  const script = `<script>window.addEventListener('DOMContentLoaded', ${boundFn})<\/script>`

  let open = false

  const handleKeydown = (event) => {
    if (!event.ctrlKey) return
    if (event.key === `1`) setModeFactory(`light`)()
    if (event.key === `2`) setModeFactory(`dark`)()
    if (event.key === `3`) setModeFactory(`auto`)()
  }
</script>

<button class="opener" on:click={() => (open = true)} aria-label="Set color mode">
  <Moon alt="Color Mode" height="2.5ex" style="vertical-align: text-bottom;" />
</button>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <Modal on:close={() => (open = false)} style="width: max-content; max-width: 90vw;">
    <div>
      <button on:click={setModeFactory(`light`)} class="choice light"
        ><Sun />Light</button>
      <button on:click={setModeFactory(`dark`)} class="choice dark">
        <Moon color="yellow" />Dark</button>
      <button on:click={setModeFactory(`auto`)} class="choice auto">
        <BrightnessAuto color="var(--bodyBg)" />Auto</button>
    </div>
  </Modal>
{/if}

<svelte:head>
  {@html script}
</svelte:head>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    place-content: center;
  }
  @media (max-width: 700px) {
    div {
      width: min-content;
    }
  }
  button.opener {
    padding: 0;
    grid-area: colormode;
    background: transparent;
    color: var(--yellow);
  }
  button.choice {
    height: 7ex;
    width: 10ex;
    display: grid;
    place-items: center;
    font-size: 3ex;
    box-shadow: 0 0 1em black;
    transition: 0.3s;
  }
  button.choice:hover {
    transform: scale(1.02);
  }
  button.choice.light {
    background: #f1f1f1;
    color: black;
  }
  button.choice.dark {
    background: #061725;
    color: white;
  }
  button.choice.auto {
    color: var(--textColor);
    background: linear-gradient(to right bottom, var(--textColor) 50%, var(--bodyBg) 50%);
  }
  button.choice :global(svg) {
    height: 3ex;
    padding-bottom: 12pt;
  }
</style>