import { assertNotNull, assertNotUndefined } from '@savchenko91/schema-validator'

import componentList from '../lib/component-list'
import { CompComponentFactory, CompDrawerProps } from '../types'
import ContentComponent from './content-component'
import FieldComponent from './field-component'
import React from 'react'

import { ROOT_ID } from '@/constants/common'

export default function CompDrawer(props: CompDrawerProps): JSX.Element {
  const rootComp = props.comps[ROOT_ID]

  assertNotUndefined(rootComp)

  return (
    <ComponentFactory
      bindingContext={props.bindingContext}
      comps={props.comps}
      compId={rootComp.id}
      schemas={props.schemas}
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
export function ComponentFactory(props: CompComponentFactory): JSX.Element | null {
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
    return (
      <FieldComponent bindingContext={props.bindingContext} schemas={props.schemas} comp={comp} comps={props.comps} />
    )
  }

  return (
    <ContentComponent bindingContext={props.bindingContext} schemas={props.schemas} comp={comp} comps={props.comps} />
  )
}
