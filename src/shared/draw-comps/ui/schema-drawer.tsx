import { assertNotNull, assertNotUndefined } from '@savchenko91/schema-validator'

import componentList from '../lib/component-list'
import { Context } from '../types'
import ContentComponent from './content-component'
import FieldComponent from './field-component'
import React from 'react'

import { ROOT_ID } from '@/constants/common'
import { Comp, Norm, Schema } from '@/entities/schema'

interface SchemaDrawerProps {
  schemas: Norm<Schema>
  schema: Schema
  context: Context
}

export default function SchemaDrawer(props: SchemaDrawerProps): JSX.Element | null {
  const rootComp = props.schema.comps[ROOT_ID]

  assertNotUndefined(rootComp)

  if (props.schemas === null) {
    return null
  }
  return (
    <ComponentFactory context={props.context} comps={props.schema.comps} compId={rootComp.id} schemas={props.schemas} />
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
  context: Context
}

export function ComponentFactory(props: ComponentFactoryProps): JSX.Element | null {
  const comp = props.comps[props.compId]

  assertNotUndefined(comp)

  const CSchema = props.schemas[comp.compSchemaId]

  // Схема еще не прогрузилась и поэтому undefined
  if (CSchema === undefined) {
    return null
  }

  assertNotNull(CSchema.componentName)

  const сomponentItem = componentList[CSchema.componentName]

  assertNotUndefined(сomponentItem)

  if (сomponentItem.type === 'input' || сomponentItem.type === 'checkbox') {
    return <FieldComponent context={props.context} schemas={props.schemas} comp={comp} />
  }

  return <ContentComponent context={props.context} schemas={props.schemas} comp={comp} comps={props.comps} />
}
