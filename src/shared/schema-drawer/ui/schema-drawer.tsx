import { assertNotUndefined } from '@savchenko91/schema-validator'

import { assertCompSchema } from '../lib/assertions'
import isInputType from '../lib/is'
import {
  Catalog,
  Comp,
  CompSchema,
  ComponentCompSchema,
  ComponentContext,
  ComponentItem,
  Context,
  DrawerContext,
} from '../model/types'
import ContentComponent from './content-component'
import FieldComponent from './field-component'
import { FormState } from 'final-form'
import React, { useEffect, useRef, useState } from 'react'

import { ROOT_ID } from '@/constants/common'
import { replace } from '@/lib/change-unmutable'

interface SchemaDrawerProps {
  schemas: Catalog<CompSchema>
  schema: CompSchema
  context: Context
  componentList: Record<string, ComponentItem>
}

export default function SchemaDrawer(props: SchemaDrawerProps): JSX.Element | null {
  const [fetchedDataContext, setFetchedDataToContext] = useState<Record<string, unknown>>({})
  const [comps, setComps] = useState<Catalog<Comp>>(props.schema.comps)

  useEffect(() => setComps(props.schema.comps), [props.schema.comps])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formStatePrev = useRef<FormState<any, any>>(props.context.formState)

  const context: DrawerContext = {
    ...props.context,
    ...{ formStatePrev: formStatePrev.current },
    fetchedData: fetchedDataContext,
    comps: comps,
    compIds: Object.keys(comps),
    schemas: props.schemas,
    fns: {
      ...props.context.fns,
      setFetchedDataToContext,
      setComp: (comp) => setComps((comps) => replace(comps, comp.id, comp)),
    },
  }

  const rootComp = comps[ROOT_ID]
  assertNotUndefined(rootComp)

  if (props.schemas === null) {
    return null
  }
  return (
    <ComponentFactory
      context={context}
      comps={comps}
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
  schemas: Catalog<CompSchema>
  comps: Catalog<Comp>
  compId: string
  context: DrawerContext
  componentList: Record<string, ComponentItem>
}

export function ComponentFactory(props: ComponentFactoryProps): JSX.Element | null {
  const comp = props.comps[props.compId]
  assertNotUndefined(comp)

  const schema = props.schemas[comp.compSchemaId] as ComponentCompSchema

  const context: ComponentContext = {
    ...props.context,
    comp: comp,
    schema: schema,
  }

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
