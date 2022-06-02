import { Label, Stack } from '@fluentui/react'

import React from 'react'

interface HorizontalLineProps {
  color: string
  label: string
  leftWidth: string
  rightWidth: string
}

export default function HorizontalLine(props: HorizontalLineProps): JSX.Element {
  return (
    <Stack horizontal verticalAlign="center">
      <hr
        style={{
          boxSizing: 'border-box',
          border: '0',
          height: '1px',
          opacity: '0.1',
          background: 'var(--black)',
          margin: '0',
          width: props.leftWidth || '24px',
          color: props.color,
        }}
      />
      {props.label && <Label styles={{ root: { padding: '0 4px', margin: '0' } }}>{props.label}</Label>}
      <hr
        style={{
          boxSizing: 'border-box',
          border: '0',
          height: '1px',
          opacity: '0.1',
          background: 'var(--black)',
          margin: '0',
          width: props.rightWidth || '100%',
          color: props.color,
        }}
      />
    </Stack>
  )
}
