export const colors = {
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

export const modeColors = {
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
