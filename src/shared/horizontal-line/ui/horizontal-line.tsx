import React from 'react'

interface HorizontalLineProps {
  color: string
  margin: string
}

export default function HorizontalLine(props: HorizontalLineProps): JSX.Element {
  return (
    <hr
      style={{
        margin: props.margin || '0',
        width: '100%',
        color: props.color,
      }}
    />
  )
}
