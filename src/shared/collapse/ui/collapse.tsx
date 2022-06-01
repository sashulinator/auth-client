import { ActionButton } from '@fluentui/react'

import React from 'react'
import useCollapse from 'react-collapsed'

type CollapseProps = {
  children: React.ReactNode
  labelExpanded: string
  labelCollapsed: string
  isExpanded: boolean
}

export const Collapse = (props: CollapseProps) => {
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } = useCollapse({
    defaultExpanded: props.isExpanded,
  })

  return (
    <div>
      <ActionButton
        {...getToggleProps()}
        iconProps={{ iconName: isExpanded ? 'ChevronDown' : 'ChevronRight' }}
        onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
      >
        {isExpanded ? props.labelExpanded : props.labelCollapsed}
      </ActionButton>
      <section {...getCollapseProps()}>
        <div>{props.children}</div>
      </section>
    </div>
  )
}

export default Collapse
