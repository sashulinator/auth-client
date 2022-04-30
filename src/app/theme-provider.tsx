import { ThemeProvider } from '@fluentui/react'

import * as themes from './themes'
import React from 'react'

interface MyThemeProviderProps {
  children: React.ReactNode
}

const MyThemeProvider = ({ children }: MyThemeProviderProps) => {
  setCSSVariables({
    ...themes.defaultTheme.palette,
    headerHeight: 50,
    errorColor: '#ff8080',
  })

  return <ThemeProvider theme={themes.defaultTheme}>{children}</ThemeProvider>
}

const setCSSVariable = (key: string, value?: number | string) => {
  value && document.body.style.setProperty(`--${key}`, value.toString())
}

export const setCSSVariables = (theme: Record<string, string | number | undefined>): void => {
  // setCurrentThemeName(themeName)

  // const theme = getAll()

  document.body.setAttribute('style', '')

  Object.entries(theme).forEach(([key, value]) => {
    setCSSVariable(key, value as string)
  })
}

export default MyThemeProvider
