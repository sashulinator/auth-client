import { assertNotUndefined } from '@savchenko91/schema-validator'

import { CompComponentFactory, CompDrawerProps } from '../types'
import ContentComponent from './content-component'
import FieldComponent from './field-component'
import React from 'react'

import { ROOT_COMP_ID } from '@/constants/common'

export default function CompDrawer(props: CompDrawerProps): JSX.Element {
  const rootComp = props.comps[ROOT_COMP_ID]

  assertNotUndefined(rootComp)

  return <ComponentFactory comps={props.comps} compId={rootComp.id} />
}

/**
 * Компонент который не является инпутом это ContentComponent
 * Отличия FieldComponent от ContentComponent:
 * 1. могут быть дети
 * 2. не оборачивается в Field
 * 3. не генерирует ошибки
 */
export function ComponentFactory(props: CompComponentFactory): JSX.Element {
  const comp = props.comps[props.compId]

  assertNotUndefined(comp)

  if (/checkbox/.test(comp.compName) && comp.type !== 'checkbox') {
    throw new Error('Вы создали компонент со словом "checkbox" в componentName, но type не "checkbox"')
  }

  if (comp.type === 'input' || comp.type === 'checkbox') {
    return <FieldComponent comp={comp} comps={props.comps} />
  }

  return <ContentComponent comp={comp} comps={props.comps} />
}
