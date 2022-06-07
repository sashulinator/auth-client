import { eventAssertionList } from '../constants/event-assertion-list'
import { Norm } from '../model/types'
import { EventUnit, EventUnitType } from '../model/types.bindings'
import bindAssertions from '../schema-drawer/lib/bind-assertions'
import { ActionProps } from '../schema-drawer/model/types'

import { insert, replace } from '@/lib/change-unmutable'
import { findEntity } from '@/lib/entity-actions'

const operatorId = 'operatorId'

interface SetValueProps {
  name: string
}

export function setValue(actionProps: ActionProps, value: SetValueProps) {
  const { actionUnit, context, bindings } = actionProps
  const eventFieldName = actionUnit.props.name

  if (actionUnit.children?.[0]) {
    const newBindings = addRootOperator(bindings, actionUnit.id)

    const validate = bindAssertions(eventAssertionList, newBindings, operatorId)

    const errors = validate?.(value, { payload: actionProps, path: '' })

    if (errors) {
      return
    }
  }

  context.formProps.form.change(eventFieldName, value)
}

function addRootOperator(bindings: Norm<EventUnit>, actionId: string) {
  const actionUnit = findEntity(actionId, bindings)
  const newActionUnit = { ...actionUnit, children: [operatorId] }
  const newBindings = replace(bindings, newActionUnit.id, newActionUnit)
  const orOperator: EventUnit = {
    id: operatorId,
    name: 'and',
    type: EventUnitType.OPERATOR,
    children: actionUnit.children,
  }
  const newBindings2 = insert(newBindings, operatorId, orOperator)

  return newBindings2
}
