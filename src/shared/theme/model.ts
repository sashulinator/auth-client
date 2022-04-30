import { themes } from './lib/themes'
import { atom } from 'recoil'

const currentThemeName = localStorage.getItem('theme') || 'default'
const currentTheme = themes[currentThemeName as keyof typeof themes]

export const themeState = atom({
  key: 'themeState',
  default: currentTheme ? currentTheme : themes.default,
})
