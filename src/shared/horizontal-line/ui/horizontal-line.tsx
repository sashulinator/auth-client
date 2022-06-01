import { Label, Stack } from '@fluentui/react'

import React from 'react'

interface HorizontalLineProps {
  color: string
  margin: string
  label: string
}

export default function HorizontalLine(props: HorizontalLineProps): JSX.Element {
  return (
    <Stack horizontal verticalAlign="center">
      {props.label && <Label styles={{ root: { padding: '0 8px 3px' } }}>{props.label}</Label>}
      <hr
        style={{
          boxSizing: 'border-box',
          border: '0',
          height: '1px',
          opacity: '0.3',
          background: 'var(--black)',
          margin: '0',
          width: '100%',
          color: props.color,
        }}
      />
    </Stack>
  )
}
