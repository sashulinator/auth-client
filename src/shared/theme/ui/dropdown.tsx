import { Dropdown, IDropdownOption } from '@fluentui/react'

import { themes } from '../lib/themes'
import { themeState } from '../model'
import React from 'react'
import { useRecoilState } from 'recoil'

const themeOptions = Object.keys(themes).map((themeName) => {
  return {
    text: themeName,
    key: themeName,
  }
})

export default function ThemeDropdown(): JSX.Element {
  const [, setTheme] = useRecoilState(themeState)
  const currentTheme = localStorage.getItem('theme') || 'default'

  function onChange(value: unknown, option?: IDropdownOption<any>) {
    const newThemeName = option?.key.toString()
    const theme = themes[(newThemeName || '') as keyof typeof themes]

    if (newThemeName && theme) {
      setTheme(theme)
      localStorage.setItem('theme', option?.key.toString() || '')
    }
  }

  return (
    <Dropdown
      styles={{ root: { width: '150px' } }}
      aria-label="Change language"
      onChange={onChange}
      defaultValue={currentTheme}
      defaultSelectedKey={currentTheme}
      placeholder="language"
      options={themeOptions}
    />
  )
}
