import { assertNotUndefined } from '@savchenko91/schema-validator'

import { assertCompSchema } from '../lib/assertions'
import { generateInitComps } from '../lib/generate-init-comps'
import injectToComp from '../lib/inject-to-comp'
import { assertNotLinkedComp, isInputType, isLinkedComp } from '../lib/is'
import { Observer } from '../lib/observer'
import {
  Catalog,
  Comp,
  CompMeta,
  CompSchema,
  ComponentCompSchema,
  ComponentContext,
  Context,
  CreateCompSchema,
  DrawerContext,
  LinkedComp,
} from '../model/types'
import ContentComponent from './content-component'
import FieldComponent from './field-component'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { ROOT_ID } from '@/constants/common'
import { replace } from '@/lib/change-unmutable'

interface SchemaDrawerProps {
  values: Record<string, unknown>
  schema: CompSchema | CreateCompSchema
  schemas: Catalog<CompSchema>
  context: Context
  componentList: Record<string, CompMeta>
}

SchemaDrawer.defaultProps = {
  values: {},
}

export default function SchemaDrawer(props: SchemaDrawerProps): JSX.Element | null {
  const [fetchedDataContext, setFetchedDataToContext] = useState<Record<string, unknown>>({})
  const formStatePrev = useRef(props.context?.form?.getState?.())

  const context: DrawerContext = {
    ...props.context,
    ...{ formStatePrev: formStatePrev.current },
    fetchedData: fetchedDataContext,
    comps: props.schema.data,
    compIds: Object.keys(props.schema.data),
    schemas: props.schemas,
    schema: props.schema,
    fns: {
      ...props.context.fns,
      setFetchedDataToContext,
      setComp: (comp: Comp | LinkedComp) => setComps((comps) => replace(comps, comp.id, comp)),
    },
  }

  const [comps, setComps] = useState<Catalog<Comp | LinkedComp>>(() =>
    generateInitComps(props.schema.data, context, props.values)
  )

  useEffect(() => setComps(generateInitComps(props.schema.data, context, props.values)), [props.schema.data])

  const rootComp = comps[ROOT_ID]
  assertNotLinkedComp(rootComp)
  assertNotUndefined(rootComp)

  if (props.schemas === null) {
    return null
  }

  return (
    <ComponentFactory
      context={{ ...context, comps }}
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
  comps: Catalog<Comp | LinkedComp>
  compId: string
  context: DrawerContext
  componentList: Record<string, CompMeta>
}

export function ComponentFactory(props: ComponentFactoryProps): JSX.Element | null {
  const comp = props.comps[props.compId]
  assertNotUndefined(comp)

  if (isLinkedComp(comp)) {
    const schema = props.schemas[comp.linkedSchemaId]

    // Схема еще не прогрузилась и поэтому undefined
    if (schema === undefined) {
      return null
    }

    return <SchemaDrawer {...props} schema={schema} />
  }

  const injectedComp = injectToComp(comp, props.context)

  const schema = props.schemas[injectedComp.compSchemaId] as ComponentCompSchema

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context: ComponentContext = useMemo(
    () => ({
      ...props.context,
      comp: injectedComp,
      schema: schema,
      observer: new Observer(),
    }),
    [comp.id]
  )

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

  return isInputType(сomponentItem) ? (
    <FieldComponent
      context={context}
      comp={injectedComp}
      schema={schema}
      schemas={props.schemas}
      componentList={props.componentList}
    />
  ) : (
    <ContentComponent
      context={context}
      comp={injectedComp}
      schema={schema}
      schemas={props.schemas}
      comps={props.comps}
      componentList={props.componentList}
    />
  )
}
