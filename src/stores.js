import { writable } from 'svelte/store'

const hasLocalStore = typeof localStorage !== `undefined`

export const colorModeKey = `colorMode`

export const colorMode = writable(
  (hasLocalStore && localStorage[colorModeKey]) || `auto`
)

colorMode.subscribe(
  (val) => hasLocalStore && (localStorage[colorModeKey] = val)
)
