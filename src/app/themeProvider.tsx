import { ThemeProvider } from '@fluentui/react'
import React, { FC } from 'react'
import { darkTheme } from './themes'

const MyThemeProvider: FC = ({ children }) => {
  setCSSVariables({ ...darkTheme.palette, headerHeight: 50 })

  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
}

const setCSSVariable = (key: string, value: number | string) => {
  document.body.style.setProperty(`--${key}`, value.toString())
}

export const setCSSVariables = (
  theme: Record<string, string | number>
): void => {
  // setCurrentThemeName(themeName)

  // const theme = getAll()

  document.body.setAttribute('style', '')

  Object.entries(theme).forEach(([key, value]) => {
    setCSSVariable(key, value as string)
  })
}

export default MyThemeProvider
