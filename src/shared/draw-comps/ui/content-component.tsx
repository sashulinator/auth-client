import componentList from '../lib/component-list'
import { DrawerComponentProps } from '../types'
// import { runAction } from '../../helpers/constructor-actions'
import { ComponentFactory } from './index'
import React, { memo } from 'react'

const ContentComponent = memo(function ContentComponent(props: DrawerComponentProps): JSX.Element {
  const Component = componentList[props.comp.compName]?.component

  if (props.comp.childCompIds === undefined) {
    return <Component {...props.comp.props}>{props.comp?.props?.children}</Component>
  }

  return (
    <Component {...props.comp.props}>
      {props.comp.childCompIds.map((compId) => {
        return <ComponentFactory key={compId} comps={props.comps} compId={compId} />
      })}
    </Component>
  )
})

export default ContentComponent
