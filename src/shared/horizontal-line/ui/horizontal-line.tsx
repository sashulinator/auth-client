import React from 'react'

interface HorizontalLineProps {
  color: string
  margin: string
}

export default function HorizontalLine(props: HorizontalLineProps): JSX.Element {
  return (
    <hr
      style={{
        boxSizing: 'border-box',
        border: '0',
        height: '1px',
        opacity: '0.3',
        background: 'var(--black)',
        margin: props.margin || '0',
        width: '100%',
        color: props.color,
      }}
    />
  )
}
