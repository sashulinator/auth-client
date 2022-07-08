import { Dropdown, IDropdownOption, IDropdownProps } from '@fluentui/react'

import React from 'react'
import { useTranslation } from 'react-i18next'

const options: IDropdownOption[] = [
  {
    text: 'Русский',
    key: 'ru',
  },
  {
    text: 'English',
    key: 'en',
  },
]

export default function LanguageDropdown(): JSX.Element {
  const { i18n } = useTranslation()

  const selectLanguage: IDropdownProps['onChange'] = (event, item) => {
    if (typeof item?.key === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      i18n.changeLanguage(item.key)
    }
  }

  return (
    <Dropdown
      styles={{ root: { width: '150px' } }}
      aria-label="Change language"
      onChange={selectLanguage}
      defaultValue={i18n.language}
      defaultSelectedKey={i18n.language}
      placeholder="language"
      options={options}
    />
  )
}
