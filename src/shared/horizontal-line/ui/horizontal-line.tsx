import { Stack, Text } from '@fluentui/react'

import React from 'react'
import { useTranslation } from 'react-i18next'

import capitalize from '@/lib/capitalize'

interface HorizontalLineProps {
  color: string
  label: string
}

export default function HorizontalLine(props: HorizontalLineProps): JSX.Element {
  const { color, label, ...restProps } = props

  const { t } = useTranslation()

  return (
    <Stack verticalAlign="center" style={{ width: '100%' }} {...restProps}>
      <hr
        style={{
          boxSizing: 'border-box',
          border: '0',
          height: '1px',
          borderTop: '1px solid var(--alwaysBlack02)',
          borderBottom: '1px solid var(--alwaysWhite02)',
          margin: '0',
          width: '100%',
          color,
        }}
      />
      {props.label && (
        <Text variant="mediumPlus" styles={{ root: { padding: '24px 0 0 24px', margin: '0', color: 'var(--black)' } }}>
          {capitalize(t(label).toString())}
        </Text>
      )}
    </Stack>
  )
}
