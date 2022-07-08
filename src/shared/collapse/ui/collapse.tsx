import React from 'react'
import useCollapse from 'react-collapsed'

import { Button } from '@/shared/button'

type CollapseProps = {
  children: React.ReactNode
  labelExpanded: string
  labelCollapsed: string
  isExpanded: boolean
  'data-comp-id': string
}

export const Collapse = (props: CollapseProps) => {
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } = useCollapse({
    defaultExpanded: props.isExpanded,
  })

  return (
    <div data-comp-id={props['data-comp-id']}>
      <Button
        {...getToggleProps()}
        variant="action"
        iconProps={{ iconName: isExpanded ? 'ChevronDown' : 'ChevronRight' }}
        onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        text={isExpanded ? props.labelExpanded : props.labelCollapsed}
      />

      <section {...getCollapseProps()}>
        <div>{props.children}</div>
      </section>
    </div>
  )
}

export default Collapse
