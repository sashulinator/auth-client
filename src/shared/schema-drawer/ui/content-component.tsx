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

  const readOnly =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!(props.context?.formState as any)?.values?.instanceId &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (props.context as any)?.fetchedData?.availableActions?.dataBlock?.screenReadOnly

  if (props.comp.children === undefined) {
    return (
      <сomponentItem.component
        data-comp-id={props.comp.id}
        {...props.comp.props}
        context={props.context}
        disabled={props.comp.props?.disabled || readOnly}
      >
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
