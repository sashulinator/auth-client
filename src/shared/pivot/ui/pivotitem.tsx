import { IPivotItemProps } from '@fluentui/react'

import React from 'react'

type PivotItemProps = IPivotItemProps

export default function PivotItem(props: PivotItemProps): boolean | React.ReactChild | React.ReactFragment | null {
  return props.children ?? null
}
