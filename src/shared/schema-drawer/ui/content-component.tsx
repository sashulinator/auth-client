import { assertNotUndefined } from '@savchenko91/schema-validator'

import { componentListBlind } from '../lib/component-list'
import { DrawerContext } from '../model/types'
import { ComponentFactory } from './schema-drawer'
import React, { memo } from 'react'

import { Comp, CompSchema, Norm, Schema } from '@/entities/schema'

export interface ContentComponentProps {
  schemas: Norm<Schema>
  schema: CompSchema
  comps: Norm<Comp>
  comp: Comp
  context: DrawerContext
}

const ContentComponent = memo(function ContentComponent(props: ContentComponentProps): JSX.Element | null {
  const сomponentItem = componentListBlind[props.schema.componentName]
  assertNotUndefined(сomponentItem)

  if (props.comp.children === undefined) {
    return (
      <сomponentItem.component data-comp-id={props.comp.id} {...props.comp.props}>
        {props.comp?.props?.children}
      </сomponentItem.component>
    )
  }

  return (
    <сomponentItem.component {...props.comp.props} data-comp-id={props.comp.id}>
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
    </сomponentItem.component>
  )
})

export default ContentComponent
