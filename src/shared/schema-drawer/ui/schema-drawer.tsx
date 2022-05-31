import { assertNotUndefined } from '@savchenko91/schema-validator'

import assertCompSchema from '../lib/assert-comp-schema'
import { componentListBlind } from '../lib/component-list'
import createBindingsFactory from '../lib/create-binding-factory'
import isInputType from '../lib/is-field-component'
import { Context, DrawerContext } from '../model/types'
import ContentComponent from './content-component'
import FieldComponent from './field-component'
import { FormState } from 'final-form'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { ROOT_ID } from '@/constants/common'
import { Comp, Norm, Schema } from '@/entities/schema'

interface SchemaDrawerProps {
  schemas: Norm<Schema>
  schema: Schema
  context: Context
}

export default function SchemaDrawer(props: SchemaDrawerProps): JSX.Element | null {
  const [fetchedDataContext, setFetchedDataToContext] = useState<Record<string, unknown>>({})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formStatePrev = useRef<FormState<any, any>>(props.context.formState)

  useLayoutEffect(() => {
    formStatePrev.current = props.context.formState
  })

  const getRidOfCurrent = { formStatePrev: formStatePrev.current }

  const context: DrawerContext = {
    fetchedData: fetchedDataContext,
    eventUnsubscribers: [],
    ...getRidOfCurrent,
    ...props.context,
    fns: {
      ...props.context.fns,
      setFetchedDataToContext,
    },
  }

  const bindingFactory = useMemo(() => createBindingsFactory(context), [])

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
      bindingFactory={bindingFactory}
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bindingFactory: (...args: any[]) => any
}

export function ComponentFactory(props: ComponentFactoryProps): JSX.Element | null {
  const comp = props.comps[props.compId]
  assertNotUndefined(comp)

  const schema = props.schemas[comp.compSchemaId]

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    props.bindingFactory({ comp, schema, schemas: props.schemas })
    return () => {
      props.context.eventUnsubscribers.forEach((unsubscribe) => {
        unsubscribe()
      })
    }
  }, [comp.bindings])

  // Схема еще не прогрузилась и поэтому undefined
  if (schema === undefined) {
    return null
  }

  assertCompSchema(schema)

  const сomponentItem = componentListBlind[schema.componentName]

  if (!сomponentItem) {
    return (
      <div style={{ backgroundColor: 'red' }}>
        Похоже вы используете старую версию фронта, в которой {schema.componentName} ещё не существует
      </div>
    )
  }

  if (isInputType(сomponentItem)) {
    return <FieldComponent context={props.context} comp={comp} schema={schema} schemas={props.schemas} />
  }

  return (
    <ContentComponent
      bindingFactory={props.bindingFactory}
      context={props.context}
      comp={comp}
      schema={schema}
      schemas={props.schemas}
      comps={props.comps}
    />
  )
}
