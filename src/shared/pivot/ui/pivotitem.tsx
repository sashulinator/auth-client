import { ILabelStyles, IPivotItemProps, IStyleSet, Label, PivotItem as PivotItemUI } from '@fluentui/react'

import React, { FC } from 'react'

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
}

const PivotItem: FC<IPivotItemProps & { label: string; name: string; headerText: string; linkText: string }> = (
  props
): JSX.Element => {
  return (
    <div>
      <PivotItemUI {...props} headerText={props.headerText} linkText={props.linkText}>
        <Label styles={labelStyles}>{props.label}</Label>
      </PivotItemUI>
    </div>
  )
}

export default PivotItem
