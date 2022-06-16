import { ActionButton, IconButton, PrimaryButton } from '@fluentui/react'

import React, { ReactNode, memo } from 'react'
import { useTranslation } from 'react-i18next'

enum ButtonVariant {
  primary = 'primary',
  action = 'action',
  icon = 'icon',
}

interface ButtonProps {
  children?: ReactNode
  text?: string
  variant?: ButtonVariant
  iconName?: string
}

export default memo(function Button(props: ButtonProps): JSX.Element {
  const { variant = 'primary', text = '', ...restProps } = props

  const { t } = useTranslation()

  if (variant === ButtonVariant.action) {
    return <ActionButton {...restProps}>{t(text).toString()}</ActionButton>
  }

  if (variant === ButtonVariant.icon) {
    return <IconButton {...restProps}>{t(text).toString()}</IconButton>
  }

  return <PrimaryButton {...restProps}>{t(text).toString()}</PrimaryButton>
})
