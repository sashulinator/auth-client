import { TreeData, TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { IconButton, Label, PrimaryButton, Stack } from '@fluentui/react'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import './validator-picker.css'

import buildTree from '../lib/build-tree'
import { defaultCompValidators } from '../lib/constants'
import TreeLeaf from './tree-leaf'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import uniqid from 'uniqid'

import { Comp, CompValidator, Norm, Schema } from '@/common/types'
import { ROOT_ID } from '@/constants/common'
import { replace } from '@/lib/change-unmutable'
import debounce from '@/lib/debounce'
import { addEntity, findEntity, moveEntity, removeEntity } from '@/lib/entity-actions'
import { assertionList, isWithValueAssertionItem } from '@/shared/draw-comps/lib/assertion-list'
import Tree from '@/shared/tree/ui/tree'

export interface ValidatorsTreeProps {
  comp: Comp
  comps: Norm<Comp>
  onChange: (value: Norm<CompValidator> | undefined) => void
  schemas: Norm<Schema>
  value: Norm<CompValidator> | undefined
  name?: string
  label?: string
}

export default function ValidatorPicker(props: ValidatorsTreeProps): JSX.Element {
  // TODO сделать проверку на невалидное значение
  const [pickedItemId, pickItemId] = useState('')
  const [tree, setTree] = useState<TreeData | undefined>(() => rebuildTree())
  const validators = props.value

  useEffect(() => setTree(rebuildTree), [props.value, pickedItemId])

  function rebuildTree() {
    return buildTree(props.value || undefined, {
      changeValidator,
      remove,
      pickItemId,
      pickedItemId,
    })
  }

  function changeValidator(id: string | number, name: string, input2: unknown) {
    if (validators && props.name) {
      const validator = findEntity(id, validators)
      const newValidators = replace(validators, id, {
        ...validator,
        name,
        input2,
      })

      props.onChange(newValidators)
    }
  }

  function onDragEnd(from: TreeSourcePosition, to?: TreeDestinationPosition) {
    if (!to || !tree || !validators || to.parentId === 'rootId') {
      return
    }

    const toParentValidator = findEntity(to.parentId, validators)
    const fromParentValidator = findEntity(from.parentId, validators)
    const validatorId = fromParentValidator.children[from.index]

    assertNotUndefined(validatorId)

    const validator = findEntity(validatorId, validators)

    const isParentOperator = toParentValidator?.name === 'and' || toParentValidator?.name === 'or'

    if (!isParentOperator) {
      return
    }

    if (validators) {
      props.onChange(moveEntity(validator, to.parentId, to.index || 0, validators))
      setTree(moveItemOnTree(tree, from, to))
    }
  }

  function addValidator(): void {
    const id = uniqid()
    const currentValidators = validators ? validators : defaultCompValidators
    const validator: CompValidator = {
      id,
      name: 'string',
      children: [],
    }

    const newValidators = addEntity(validator, ROOT_ID, 0, currentValidators)

    if (props.name) {
      props.onChange(newValidators)
    }
  }

  function addOperator() {
    const id = uniqid()
    const currentValidators = validators ? validators : defaultCompValidators
    const validator: CompValidator = {
      id,
      name: 'and',
      children: [],
    }

    const newValidators = addEntity(validator, ROOT_ID, 0, currentValidators)

    if (validators) {
      props.onChange(newValidators)
    }
  }

  function remove(id: string | number): void {
    if (validators) {
      const newValidators = removeEntity(id, validators)

      if (newValidators === undefined) {
        props.onChange(undefined)
      } else if (Object.keys(newValidators).length === 1) {
        props.onChange(undefined)
      } else {
        props.onChange(removeEntity(id, validators))
      }
    }
  }

  return (
    <div className={clsx('ValidatorPicker', validators && 'notEmpty')}>
      {props.label && <Label>{props.label}</Label>}
      <Stack className="wrapper" verticalAlign="space-between">
        <div className="validatorPickerBackground" />
        <Stack>
          <Stack horizontal horizontalAlign="space-between">
            <PrimaryButton onClick={addValidator}>add assertion</PrimaryButton>
            <IconButton iconProps={{ iconName: 'DrillExpand' }} onClick={addOperator} />
          </Stack>
          {tree && (
            <Stack tokens={{ padding: '2px 0' }}>
              {/* eslint-disable-next-line @typescript-eslint/no-empty-function*/}
              <Tree tree={tree} setTree={setTree} onDragStart={() => {}} renderItem={TreeLeaf} onDragEnd={onDragEnd} />
            </Stack>
          )}
        </Stack>

        <AdditionalInput
          key={pickedItemId}
          validators={validators}
          pickedItemId={pickedItemId}
          changeValidator={changeValidator}
        />
      </Stack>
    </div>
  )
}

function AdditionalInput(props: any) {
  const validator = props.validators?.[props.pickedItemId]
  const [value, setValue] = useState(validator?.input2)

  if (!props?.pickedItemId && !validator) {
    return null
  }
  const assertionItem = assertionList[validator?.name]

  if (isWithValueAssertionItem(assertionItem)) {
    const Component = assertionItem.component

    return (
      <Component
        value={value}
        onChange={(e: unknown, v: string) => {
          setValue(v)
          debounce(props.changeValidator, 500)(props.pickedItemId, validator?.name, v)
        }}
        placeholder="value"
      />
    )
  }

  return null
}
