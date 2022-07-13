import { PartialTheme } from '@fluentui/react'

interface AdditionalCSS {
  [key: string]: {
    palette: {
      red: string
      blue: string
      green: string
      yellow: string
      violet: string
    }
  }
}

const darkPrimary = 'rgba(255, 212, 112, alpha)'
const defaultPrimary = 'rgba(0, 120, 212, alpha)'

const darkWhite = 'rgba(46, 46, 46, alpha)'
const defaultWhite = 'rgba(255, 255, 255, alpha)'

const defaultBlack = 'rgba(46, 46, 46, alpha)'
const darkBlack = 'rgba(249, 249, 249, alpha)'

const alwaysWhite = 'rgba(255, 255, 255, alpha)'
const alwaysBlack = 'rgba(0, 0, 0, alpha)'

const red = 'rgba(231, 77, 60, alpha)'
const blue = 'rgba(52, 152, 219, alpha)'
const green = 'rgba(153, 229, 133, alpha)'
const yellow = 'rgba(241, 196, 15, alpha)'
const violet = 'rgba(187, 134, 252, alpha)'

export const themes: AdditionalCSS & PartialTheme = {
  dark: {
    palette: {
      red: red.replace('alpha', '1'),
      blue: blue.replace('alpha', '1'),
      green: green.replace('alpha', '1'),
      yellow: yellow.replace('alpha', '1'),
      violet: violet.replace('alpha', '1'),
      red02: red.replace('alpha', '0.2'),
      red03: red.replace('alpha', '0.3'),
      red05: red.replace('alpha', '0.5'),
      blue02: blue.replace('alpha', '0.2'),
      green02: green.replace('alpha', '0.2'),
      yellow02: yellow.replace('alpha', '0.2'),
      violet02: violet.replace('alpha', '0.2'),
      alwaysWhite,
      alwaysWhite02: alwaysWhite.replace('alpha', '0.2'),
      alwaysWhite01: alwaysWhite.replace('alpha', '0.05'),
      alwaysBlack,
      alwaysBlack02: alwaysBlack.replace('alpha', '0.2'),
      alwaysBlack01: alwaysBlack.replace('alpha', '0.1'),

      themePrimary05: darkPrimary.replace('alpha', '0.5'),
      themePrimary03: darkPrimary.replace('alpha', '0.3'),
      themePrimary02: darkPrimary.replace('alpha', '0.2'),
      themePrimary01: darkPrimary.replace('alpha', '0.1'),

      themePrimary: darkPrimary.replace('alpha', '1'),
      themeLighterAlt: '#0a0804',
      themeLighter: '#292212',
      themeLight: '#4d4022',
      themeTertiary: '#997f43',
      themeSecondary: '#e0bb63',
      themeDarkAlt: '#ffd87e',
      themeDark: '#ffde92',
      themeDarker: '#ffe7af',
      neutralLighterAlt: '#373737',
      neutralLighter: '#3f3f3f',
      neutralLight: '#4c4c4c',
      neutralQuaternaryAlt: '#545454',
      neutralQuaternary: '#5b5b5b',
      neutralTertiaryAlt: '#777777',
      neutralTertiary: '#e0e0e0',
      neutralSecondary: '#e5e5e5',
      neutralPrimaryAlt: '#eaeaea',
      neutralPrimary: '#d1d1d1',
      neutralDark: '#f4f4f4',
      black: darkBlack.replace('alpha', '1'),
      black04: darkBlack.replace('alpha', '0.4'),
      black03: darkBlack.replace('alpha', '0.3'),
      black02: darkBlack.replace('alpha', '0.2'),
      black01: darkBlack.replace('alpha', '0.1'),
      black003: darkBlack.replace('alpha', '0.03'),
      white: darkWhite.replace('alpha', '1'),
      white02: darkWhite.replace('alpha', '0.2'),
      white01: darkWhite.replace('alpha', '0.1'),
    },
  },
  default: {
    palette: {
      red: red.replace('alpha', '1'),
      blue: blue.replace('alpha', '1'),
      green: green.replace('alpha', '1'),
      yellow: yellow.replace('alpha', '1'),
      violet: violet.replace('alpha', '1'),
      red02: red.replace('alpha', '0.2'),
      red03: red.replace('alpha', '0.3'),
      red05: red.replace('alpha', '0.5'),
      blue02: blue.replace('alpha', '0.2'),
      green02: green.replace('alpha', '0.2'),
      yellow02: yellow.replace('alpha', '0.2'),
      violet02: violet.replace('alpha', '0.2'),
      alwaysWhite,
      alwaysWhite02: alwaysWhite.replace('alpha', '0.2'),
      alwaysWhite01: alwaysWhite.replace('alpha', '0.1'),
      alwaysBlack,
      alwaysBlack02: alwaysBlack.replace('alpha', '0.2'),
      alwaysBlack01: alwaysBlack.replace('alpha', '0.1'),

      themePrimary05: defaultPrimary.replace('alpha', '0.5'),
      themePrimary03: defaultPrimary.replace('alpha', '0.3'),
      themePrimary02: defaultPrimary.replace('alpha', '0.2'),
      themePrimary01: defaultPrimary.replace('alpha', '0.1'),

      themePrimary: defaultPrimary.replace('alpha', '1'),
      themeLighterAlt: '#eff6fc',
      themeLighter: '#deecf9',
      themeLight: '#c7e0f4',
      themeTertiary: '#71afe5',
      themeSecondary: '#2b88d8',
      themeDarkAlt: '#106ebe',
      themeDark: '#005a9e',
      themeDarker: '#004578',
      neutralLighterAlt: '#faf9f8',
      neutralLighter: '#f3f2f1',
      neutralLight: '#edebe9',
      neutralQuaternaryAlt: '#e1dfdd',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c6c4',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: defaultBlack.replace('alpha', '1'),
      black04: defaultBlack.replace('alpha', '0.4'),
      black03: defaultBlack.replace('alpha', '0.3'),
      black02: defaultBlack.replace('alpha', '0.2'),
      black01: defaultBlack.replace('alpha', '0.1'),
      black003: defaultBlack.replace('alpha', '0.03'),
      white: defaultWhite.replace('alpha', '1'),
      white02: defaultWhite.replace('alpha', '0.2'),
      white01: defaultWhite.replace('alpha', '0.1'),
    },
  },
}
