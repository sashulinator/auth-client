import { IPivotProps, Label, PivotItem as PivotItemUI, Pivot as PivotUI } from '@fluentui/react'

import React, { FC } from 'react'

const Pivot: FC<
  IPivotProps & { label: string; name: string; headerText: string; ariaLabel: string; linkSize?: 'normal' | 'large' }
> = (props): JSX.Element => {
  return (
    <PivotUI aria-label={props.ariaLabel} {...props}>
      <Label>{props.label}</Label>
      <PivotItemUI headerText="Tab 1">
        <Label>Label 1</Label>
      </PivotItemUI>
      <PivotItemUI headerText="Tab 2">
        <Label>Label 2</Label>
      </PivotItemUI>
      <PivotItemUI headerText="Tab 3">
        <Label>Label 3</Label>
      </PivotItemUI>
    </PivotUI>
  )
}

export default Pivot
