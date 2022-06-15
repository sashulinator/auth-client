import { ActionButton } from '@fluentui/react'

import React from 'react'
import useCollapse from 'react-collapsed'

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
      <ActionButton
        {...getToggleProps()}
        styles={{
          root: {
            paddingLeft: '0',
          },
          icon: {
            marginLeft: '0',
          },
          label: {
            color: 'var(--themePrimary)',
          },
        }}
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
