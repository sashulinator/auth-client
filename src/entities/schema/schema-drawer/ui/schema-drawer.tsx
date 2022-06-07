import { assertNotUndefined } from '@savchenko91/schema-validator'

import isInputType from '../../lib/is'
import { assertCompSchema } from '../lib/assertions'
import createOnFieldChangeEvent from '../lib/create-on-field-change-event'
import handleBindEvents from '../lib/handle-bind-events'
import { Comp, CompSchema, ComponentContext, ComponentItem, Context, DrawerContext, Norm, Schema } from '../model/types'
import ContentComponent from './content-component'
import FieldComponent from './field-component'
import { FormState } from 'final-form'
import React, { useEffect, useRef, useState } from 'react'

import { ROOT_ID } from '@/constants/common'

interface SchemaDrawerProps {
  schemas: Norm<Schema>
  schema: Schema
  context: Context
  componentList: Record<string, ComponentItem>
}

export default function SchemaDrawer(props: SchemaDrawerProps): JSX.Element | null {
  const [fetchedDataContext, setFetchedDataToContext] = useState<Record<string, unknown>>({})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formStatePrev = useRef<FormState<any, any>>(props.context.formState)

  const onFieldChange = createOnFieldChangeEvent(props.context as DrawerContext)

  const context: DrawerContext = {
    ...props.context,
    ...{ formStatePrev: formStatePrev.current },
    fetchedData: fetchedDataContext,
    comps: props.schema.comps,
    compIds: Object.keys(props.schema.comps),
    schemas: props.schemas,
    eventUnsubscribers: [],
    fns: {
      ...props.context.fns,
      setFetchedDataToContext,
      onFieldChange,
    },
  }

  const rootComp = props.schema.comps[ROOT_ID]
  assertNotUndefined(rootComp)

  if (props.schemas === null) {
    return null
  }
  return (
    <ComponentFactory
      context={context}
      comps={props.schema.comps}
      compId={rootComp.id}
      schemas={props.schemas}
      componentList={props.componentList}
    />
  )
}

/**
 * Компонент который не является инпутом это ContentComponent
 * Отличия ContentComponent от FieldComponent:
 * 1. могут быть дети
 * 2. не оборачивается в Field
 * 3. не генерирует ошибки
 */
interface ComponentFactoryProps {
  schemas: Norm<Schema>
  comps: Norm<Comp>
  compId: string
  context: DrawerContext
  componentList: Record<string, ComponentItem>
}

export function ComponentFactory(props: ComponentFactoryProps): JSX.Element | null {
  const comp = props.comps[props.compId]
  assertNotUndefined(comp)

  const schema = props.schemas[comp.compSchemaId] as CompSchema

  const context: ComponentContext = {
    ...props.context,
    comp: comp,
    schema: schema,
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    schema && handleBindEvents(context)
  }, [comp.bindings, schema])

  // Схема еще не прогрузилась и поэтому undefined
  if (schema === undefined) {
    return null
  }

  assertCompSchema(schema)

  const сomponentItem = props.componentList[schema.componentName]

  if (!сomponentItem) {
    return (
      <div style={{ backgroundColor: 'red' }}>
        Похоже вы используете старую версию фронта, в которой {schema.componentName} ещё не существует
      </div>
    )
  }

  if (isInputType(сomponentItem)) {
    return (
      <FieldComponent
        context={context}
        comp={comp}
        schema={schema}
        schemas={props.schemas}
        componentList={props.componentList}
      />
    )
  }

  return (
    <ContentComponent
      context={context}
      comp={comp}
      schema={schema}
      schemas={props.schemas}
      comps={props.comps}
      componentList={props.componentList}
    />
  )
}
