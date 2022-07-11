import { ActionButton, IButtonProps, IButtonStyles, IconButton, PrimaryButton } from '@fluentui/react'

import React, { ReactNode, memo } from 'react'
import { useTranslation } from 'react-i18next'

const actionButtonStyles: IButtonStyles = {
  rootHovered: {
    backgroundColor: 'var(--themePrimary01)',
  },
  labelDisabled: {
    color: 'var(--themePrimary05)',
  },
  root: {
    height: '32px',
  },
  label: {
    color: 'var(--themePrimary)',
  },
}

interface ButtonProps extends IButtonProps {
  children?: ReactNode
  text?: string
  variant?: 'primary' | 'icon' | 'action'
  iconName?: string
}

export default memo(function Button(props: ButtonProps): JSX.Element {
  const { variant, text = '', ...restProps } = props

  const { t } = useTranslation()

  if (variant === 'action') {
    return (
      <ActionButton {...restProps} styles={{ ...actionButtonStyles, ...restProps?.styles }}>
        {t(text).toString()}
      </ActionButton>
    )
  }

  if (variant === 'icon') {
    return <IconButton {...restProps} />
  }

  return <PrimaryButton {...restProps}>{t(text).toString()}</PrimaryButton>
})
