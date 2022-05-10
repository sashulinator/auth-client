import { assertNotNull, assertNotUndefined } from '@savchenko91/schema-validator'

import componentList from '../lib/component-list'
import { Context } from '../types'
import { ComponentFactory } from './schema-drawer'
import React, { memo } from 'react'

import { Comp, Norm, Schema } from '@/entities/schema'

interface ContentComponentProps {
  schemas: Norm<Schema>
  comps: Norm<Comp>
  comp: Comp
  context: Context
}

const ContentComponent = memo(function ContentComponent(props: ContentComponentProps): JSX.Element | null {
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

  if (props.comp.children === undefined) {
    return (
      <Component data-comp-id={props.comp.id} {...props.comp.props}>
        {props.comp?.props?.children}
      </Component>
    )
  }

  return (
    <Component {...props.comp.props} data-comp-id={props.comp.id}>
      {props.comp.children.map((compId) => {
        return (
          <ComponentFactory
            key={compId}
            comps={props.comps}
            compId={compId}
            schemas={props.schemas}
            context={props.context}
          />
        )
      })}
    </Component>
  )
})

export default ContentComponent
