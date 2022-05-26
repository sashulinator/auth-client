import { ActionButton } from '@fluentui/react'

import React, { CSSProperties } from 'react'
import useCollapse from 'react-collapsed'

const collapseStyles = {
  width: '100%',
}

type CollapseProps = {
  children: React.ReactNode
  style?: CSSProperties
}
// eslint-disable-next-line react/display-name
/*const Collapse = forwardRef(
  (props: CollapseProps, ref?: React.Ref<HTMLDivElement>): JSX.Element => {
    return (
      <div {...props} ref={ref}>
        <div>{props.children}</div>
      </div>
    )
  }
) */

export const Collapse = (props: CollapseProps) => {
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } = useCollapse({
    defaultExpanded: true,
  })

  console.log(props)

  return (
    <div>
      <ActionButton
        {...getToggleProps()}
        iconProps={{ iconName: isExpanded ? 'ChevronUp' : 'ChevronDown' }}
        onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
      >
        {isExpanded ? 'Close' : 'Open'}
      </ActionButton>
      <section {...getCollapseProps()}>
        <div style={collapseStyles}>{props.children}</div>
      </section>
    </div>
  )
}

export default Collapse
