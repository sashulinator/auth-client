import { assertNotUndefined } from '@savchenko91/schema-validator'

import { assertCompSchema } from '../lib/assertions'
import bindEvents from '../lib/bind-events'
import { onFieldLife, onInit } from '../lib/events'
import injectToComp from '../lib/inject-to-comp'
import isInputType from '../lib/is'
import { Observer } from '../lib/observer'
import {
  Catalog,
  Comp,
  CompMeta,
  CompSchema,
  ComponentCompSchema,
  ComponentContext,
  Context,
  DrawerContext,
} from '../model/types'
import ContentComponent from './content-component'
import FieldComponent from './field-component'
import { FormApi, createForm } from 'final-form'
import React, { useRef, useState } from 'react'

import { ROOT_ID } from '@/constants/common'
import { replace } from '@/lib/change-unmutable'

interface SchemaDrawerProps {
  schemas: Catalog<CompSchema>
  schema: CompSchema
  context: Context
  componentList: Record<string, CompMeta>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setDefaultValueToFormState(comps: Catalog<Comp>, form: FormApi<any, any>) {
  Object.values(comps).forEach((comp) => {
    if (comp.name === undefined) {
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    form.registerField(comp.name, () => {}, { active: true, dirty: true, touched: true, valid: true, value: true })
    form.change(comp.name, comp.defaultValue)
  })
}

function initComps(comps: Catalog<Comp>, rawContext: DrawerContext): Catalog<Comp> {
  const fakeComps = { current: comps }

  function setComp(newComp: Comp) {
    fakeComps.current = replace(comps, newComp.id, newComp)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const form = createForm({ onSubmit: () => {} })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  form.subscribe(() => {}, { dirty: true, valid: true, values: true })

  setDefaultValueToFormState(comps, form)

  const context: DrawerContext = {
    ...rawContext,
    formState: form.getState(),
    fns: { ...rawContext.fns, setComp },
    form,
  }

  Object.values(comps).forEach((comp) => {
    const injectedComp = injectToComp(comp.injections, context, comp)
    const schema = context.schemas[comp.compSchemaId] as ComponentCompSchema

    const compContext = {
      ...context,
      comp: injectedComp,
      compSchema: schema,
      observer: new Observer(),
    }

    bindEvents(compContext)
    compContext.observer.emitEvent(onInit.name)()
    compContext.observer.emitEvent(onFieldLife.name)()
  })

  return fakeComps.current
}

export default function SchemaDrawer(props: SchemaDrawerProps): JSX.Element | null {
  const [fetchedDataContext, setFetchedDataToContext] = useState<Record<string, unknown>>({})
  const formStatePrev = useRef(props.context.form.getState())

  const context: DrawerContext = {
    ...props.context,
    ...{ formStatePrev: formStatePrev.current },
    fetchedData: fetchedDataContext,
    comps: props.schema.catalog,
    compIds: Object.keys(props.schema.catalog),
    schemas: props.schemas,
    schema: props.schema,
    fns: {
      ...props.context.fns,
      setFetchedDataToContext,
      setComp: () => {
        throw new Error('I am not here')
      },
    },
  }

  const [comps, setComps] = useState<Catalog<Comp>>(() => initComps(props.schema.catalog, context))

  const rootComp = comps[ROOT_ID]
  assertNotUndefined(rootComp)

  if (props.schemas === null) {
    return null
  }

  return (
    <ComponentFactory
      context={{
        ...context,
        comps,
        fns: {
          ...context.fns,
          setComp: (comp: Comp) => setComps((comps) => replace(comps, comp.id, comp)),
        },
      }}
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
  componentList: Record<string, CompMeta>
}

export function ComponentFactory(props: ComponentFactoryProps): JSX.Element | null {
  const comp = props.comps[props.compId]
  assertNotUndefined(comp)

  const schema = props.schemas[comp.compSchemaId] as ComponentCompSchema

  const context: ComponentContext = {
    ...props.context,
    comp: comp,
    compSchema: schema,
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
