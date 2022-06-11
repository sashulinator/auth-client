import { PartialTheme } from '@fluentui/react'

interface AdditionalCSS {
  [key: string]: {
    palette: {
      redBackground: string
      blueBackground: string
      greenBackground: string
      yellowBackground: string
      violetBackground: string
    }
  }
}

const darkPrimary = 'rgba(255, 212, 112, alfa)'
const defaultPrimary = 'rgba(0, 120, 212, alfa)'

export const themes: AdditionalCSS & PartialTheme = {
  dark: {
    palette: {
      redBackground: '#e74c3c',
      blueBackground: '#3498db',
      greenBackground: '#07bc0c',
      yellowBackground: '#f1c40f',
      violetBackground: '#bb86fc',

      themePrimaryTransparent05: darkPrimary.replace('alfa', '0.5'),
      themePrimaryTransparent03: darkPrimary.replace('alfa', '0.3'),
      themePrimaryTransparent01: darkPrimary.replace('alfa', '0.1'),

      themePrimary: darkPrimary.replace('alfa', '1'),
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
      black: '#f9f9f9',
      white: '#2e2e2e',
    },
  },
  default: {
    palette: {
      redBackground: '#e74c3c',
      blueBackground: '#3498db',
      greenBackground: '#07bc0c',
      yellowBackground: '#f1c40f',
      violetBackground: '#bb86fc',
      themePrimaryTransparent05: defaultPrimary.replace('alfa', '0.5'),
      themePrimaryTransparent03: defaultPrimary.replace('alfa', '0.3'),
      themePrimaryTransparent01: defaultPrimary.replace('alfa', '0.1'),

      themePrimary: defaultPrimary.replace('alfa', '1'),
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
      black: '#000000',
      white: '#ffffff',
    },
  },
}
