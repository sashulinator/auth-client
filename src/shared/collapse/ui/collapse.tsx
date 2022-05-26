import { ActionButton } from '@fluentui/react'

import React, { CSSProperties } from 'react'
import useCollapse from 'react-collapsed'

const collapseStyles = {
  width: '100%',
}

type CollapseProps = {
  children: React.ReactNode
  style?: CSSProperties
  labelUp: string
  labelDown: string
  isExpanded: boolean
}

export const Collapse = (props: CollapseProps) => {
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } = useCollapse({
    defaultExpanded: props.isExpanded,
  })

  console.log(props)

  return (
    <div>
      <ActionButton
        {...getToggleProps()}
        iconProps={{ iconName: isExpanded ? 'ChevronUp' : 'ChevronDown' }}
        onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
      >
        {isExpanded ? props.labelUp : props.labelDown}
      </ActionButton>
      <section {...getCollapseProps()}>
        <div style={collapseStyles}>{props.children}</div>
      </section>
    </div>
  )
}

export default Collapse
