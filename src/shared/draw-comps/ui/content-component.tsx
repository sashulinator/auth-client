import { DrawerComponentProps } from '../types'
// import { runAction } from '../../helpers/constructor-actions'
import { ComponentFactory } from './index'
import React, { memo } from 'react'

const ContentComponent = memo(function ContentComponent(props: DrawerComponentProps): JSX.Element {
  const Component = props.Component

  if (props.comp.childCompIds === undefined) {
    return <Component {...props.comp.props}>{props.comp?.props?.children}</Component>
  }

  return (
    <Component {...props.comp.props}>
      {props.comp.childCompIds.map((compId) => {
        return <ComponentFactory key={compId} comps={props.comps} compId={compId} schemas={props.schemas} />
      })}
    </Component>
  )
})

export default ContentComponent
