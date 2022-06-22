import React from 'react'

import CheckBox from '@/shared/checkbox/ui/checkbox'

interface DimensionLeafProps {
  value: boolean
  text: string
  name: string
}

export default function DimensionLeaf(props: DimensionLeafProps): JSX.Element {
  return (
    <div className="DimensionLeaf">
      {props.text}
      <CheckBox {...props} />
    </div>
  )
}
