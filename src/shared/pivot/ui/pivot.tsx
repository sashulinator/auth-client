import { IPivotProps, PivotItem, Pivot as PivotUI } from '@fluentui/react'

import React from 'react'

import { Comp, Dictionary } from '@/shared/schema-drawer'

type PivotProps = IPivotProps & {
  label: string
  children: React.ReactNode[]
  paddingLeft: string
}

export default function Pivot(props: PivotProps): JSX.Element {
  return (
    <PivotUI {...props} styles={{ root: { paddingLeft: `${props.paddingLeft}px` } }}>
      {props.children?.map((child) => {
        // @ts-expect-error because
        const { compId, comps } = child.props as { compId: string; comps: Dictionary<Comp> }
        const comp = comps[compId] as Comp

        return (
          <PivotItem key={comp.id} {...comp.props}>
            {child}
          </PivotItem>
        )
      })}
    </PivotUI>
  )
}

Pivot.defaultProps = {
  paddingLeft: 0,
}
