import { PartialTheme, ThemeProvider, createTheme } from '@fluentui/react'

import { setCSSVariables } from '../lib/set-css-variables'
import { themeState } from '../model'
import React from 'react'
import { useRecoilState } from 'recoil'

interface MyThemeProviderProps {
  children: React.ReactNode
}

export default function MyThemeProvider(props: MyThemeProviderProps) {
  const [theme] = useRecoilState(themeState)
  const generatedState = createTheme(theme as PartialTheme)

  setCSSVariables({
    ...generatedState.palette,
    headerHeight: 50,
    errorColor: '#ff8080',
  })

  return (
    <ThemeProvider className="themeProvider" theme={theme as PartialTheme}>
      {props.children}
    </ThemeProvider>
  )
}
