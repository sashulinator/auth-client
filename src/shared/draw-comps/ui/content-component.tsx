import { assertNotNull, assertNotUndefined } from '@savchenko91/schema-validator'

import componentList from '../lib/component-list'
import { DrawerComponentProps } from '../types'
// import { runAction } from '../../helpers/constructor-actions'
import { ComponentFactory } from './index'
import React, { memo } from 'react'

const ContentComponent = memo(function ContentComponent(props: DrawerComponentProps): JSX.Element | null {
  assertNotUndefined(props.comp)

  const CSchema = props.schemas[props.comp.compSchemaId]

  // Схема еще не прогрузилась и поэтому undefined
  if (CSchema === undefined) {
    return null
  }

  assertNotNull(CSchema.componentName)

  const сomponentItem = componentList[CSchema.componentName]

  assertNotUndefined(сomponentItem)

  const Component = сomponentItem.component

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
