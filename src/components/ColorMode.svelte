<script>
  import Modal from './Modal.svelte'
  import { colorMode, colorModeKey } from '../stores'
  import Sun from '@svicons/fa-solid/sun.svelte'
  import Moon from '@svicons/entypo/moon.svelte'
  import BrightnessAuto from '@svicons/material-sharp/brightness-auto.svelte'

  const colors = {
    blue: `#2A4FA8`,
    darkBlue: `#002e9d`,
    lightBlue: `#3da0f5`,

    lightGreen: `#0ab3a5`,

    orange: `#ecb517`,
    darkOrange: `#cc9700`,

    yellow: `#fffa00`,

    lightestGray: `#fafafa`,
    lighterGray: `#f1f1f1`,
    lightGray: `#dcdcdc`,
    gray: `#2b363f`,
    darkGray: `#1d242a`,
    darkerGray: `#191818`,
  }

  const modeColors = {
    light: {
      textColor: `black`,
      linkColor: colors.darkBlue,
      bodyBg: colors.lightestGray,
      accentBg: colors.lighterGray,
      lightBg: `white`,
      darkBg: colors.darkGray,
      gray_darkGray: colors.gray,
      white_darkGray: `white`,
      borderColor: colors.lightBlue,
      headingColor: colors.lightBlue,
    },
    dark: {
      textColor: `white`,
      linkColor: colors.lightBlue,
      bodyBg: colors.darkGray,
      accentBg: colors.darkerGray,
      lightBg: colors.gray,
      darkBg: colors.darkerGray,
      gray_darkGray: colors.darkGray,
      white_darkGray: colors.darkerGray,
      borderColor: colors.lightGreen,
      headingColor: colors.lightGreen,
    },
  }

  const setModeFactory = (mode) => () => {
    open = false
    $colorMode = mode
    applyColors()
  }

  function applyColors() {
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

  // boundFn and <svelte:head> below provide SSR support
  // we modify a stringified version of applyColors so it can run before hydration
  // and prevent color falshes on page load
  const boundFn = String(applyColors).replaceAll(`$colorMode`, `colorMode`)

  /* eslint-disable no-useless-escape */
  const script = `
    <script>const colorMode = localStorage.${colorModeKey} ?? 'auto'
      const modeColors = ${JSON.stringify(modeColors)}
      const colors = ${JSON.stringify(colors)}
      window.addEventListener('DOMContentLoaded', ${boundFn})
    <\/script>`
  /* eslint-enable no-useless-escape */

  let open = false

  const handleKeydown = (event) => {
    if (!event.ctrlKey) return
    if (event.key === `1`) setModeFactory(`light`)()
    if (event.key === `2`) setModeFactory(`dark`)()
    if (event.key === `3`) setModeFactory(`auto`)()
  }
</script>

<button class="opener" on:click={() => (open = true)} aria-label="Change color mode">
  <Moon width="30px" style="vertical-align: text-bottom;" />
</button>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <Modal on:close={() => (open = false)} style="width: max-content; max-width: 90vw;">
    <div>
      <button on:click={setModeFactory(`light`)} class="choice light">
        <Sun />
        Hell</button>
      <button on:click={setModeFactory(`dark`)} class="choice dark">
        <Moon color="yellow" />
        Dunkel</button>
      <button on:click={setModeFactory(`auto`)} class="choice auto">
        <BrightnessAuto color="var(--bodyBg)" />
        Auto</button>
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
