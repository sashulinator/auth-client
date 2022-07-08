import { assertNotUndefined } from '@savchenko91/schema-validator'

import {
  Comp,
  CompMeta,
  CompSchema,
  ComponentCompSchema,
  ComponentContext,
  Dictionary,
  LinkedComp,
} from '../model/types'
import { ComponentFactory } from './schema-drawer'
import React, { memo } from 'react'

export interface ContentComponentProps {
  schemas: Dictionary<CompSchema>
  schema: ComponentCompSchema
  comps: Dictionary<Comp | LinkedComp>
  comp: Comp
  context: ComponentContext
  componentList: Record<string, CompMeta>
}

const ContentComponent = memo(function ContentComponent(props: ContentComponentProps): JSX.Element | null {
  const сomponentItem = props.componentList[props.schema.componentName]
  assertNotUndefined(сomponentItem)

  // TODO
  // useEffect(() => handleBindEvents(props.context), [props.comp.bindings, props.schema])

  if (props.comp.children === undefined) {
    return (
      <сomponentItem.component data-comp-id={props.comp.id} {...props.comp.props}>
        {props.comp?.props?.children}
      </сomponentItem.component>
    )
  }

  return (
    <сomponentItem.component data-comp-id={props.comp.id} {...props.comp.props}>
      {props.comp.children.map((compId) => {
        return (
          <ComponentFactory
            key={compId}
            comps={props.comps}
            compId={compId}
            schemas={props.schemas}
            context={props.context}
            componentList={props.componentList}
          />
        )
      })}
    </сomponentItem.component>
  )
})

export default ContentComponent
