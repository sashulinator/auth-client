import { TreeData, TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { IconButton, Label, PrimaryButton, Stack } from '@fluentui/react'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import './validator-picker.css'

import buildTree from '../lib/build-tree'
import { defaultCompValidators } from '../lib/constants'
import TreeLeaf from './tree-leaf'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-final-form'
import uniqid from 'uniqid'

import { ROOT_ID } from '@/constants/common'
import { Comp, Norm, Schema, ValidatorItem, ValidatorItemType } from '@/entities/schema'
import { dummySchemas } from '@/entities/schema/model/dummy-schemas'
import { replace } from '@/lib/change-unmutable'
import { addEntity, findEntity, moveEntity, removeEntity } from '@/lib/entity-actions'
import Autosave from '@/shared/autosave'
import SchemaDrawer from '@/shared/schema-drawer'
import { assertionList, isWithValueAssertionItem } from '@/shared/schema-drawer/lib/assertion-list'
import Tree from '@/shared/tree/ui/tree'

export interface ValidatorsTreeProps {
  comp: Comp
  comps: Norm<Comp>
  onChange: (value: Norm<ValidatorItem> | undefined) => void
  schemas: Norm<Schema>
  value: Norm<ValidatorItem> | undefined
  name?: string
  label?: string
}

export default function ValidatorPicker(props: ValidatorsTreeProps): JSX.Element {
  // TODO сделать проверку на невалидное значение
  const [selectedItemId, selectItemId] = useState('')
  const [tree, setTree] = useState<TreeData | undefined>(() => rebuildTree())
  const validatorItems = props.value
  const validatorItem = validatorItems?.[selectedItemId]
  const assertionItem = assertionList[validatorItem?.name || '']

  useEffect(() => setTree(rebuildTree), [props.value, selectedItemId])

  function rebuildTree() {
    return buildTree(props.value || undefined, {
      changeValidator,
      remove,
      selectItemId,
      selectedItemId,
    })
  }

  function changeValidator(id: string | number, name: string, newValidatorItemProps: unknown) {
    if (validatorItems && props.name) {
      const validator = findEntity(id, validatorItems)
      const newValidators = replace(validatorItems, id, {
        id: validator.id,
        name,
        newValProps: newValidatorItemProps,
      })

      props.onChange(newValidators)
    }
  }

  function onDragEnd(from: TreeSourcePosition, to?: TreeDestinationPosition) {
    if (!to || !tree || !validatorItems || to.parentId === 'rootId') {
      return
    }

    const toParentValidator = findEntity(to.parentId, validatorItems)
    const fromParentValidator = findEntity(from.parentId, validatorItems)
    const validatorId = fromParentValidator.children[from.index]

    assertNotUndefined(validatorId)

    const validator = findEntity(validatorId, validatorItems)

    const isParentOperator = toParentValidator?.name === 'and' || toParentValidator?.name === 'or'

    if (!isParentOperator) {
      return
    }

    if (validatorItems) {
      props.onChange(moveEntity(validator, to.parentId, to.index || 0, validatorItems))
      setTree(moveItemOnTree(tree, from, to))
    }
  }

  function addAssertion(): void {
    const id = uniqid()
    const currentValidators = validatorItems ? validatorItems : defaultCompValidators
    const validator: ValidatorItem = {
      id,
      type: ValidatorItemType.ASSERTION,
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
    const currentValidators = validatorItems ? validatorItems : defaultCompValidators
    const validator: ValidatorItem = {
      id,
      name: 'and',
      type: ValidatorItemType.OPERATOR,
      children: [],
    }

    const newValidators = addEntity(validator, ROOT_ID, 0, currentValidators)

    if (validatorItems) {
      props.onChange(newValidators)
    }
  }

  function remove(id: string | number): void {
    if (validatorItems) {
      const newValidators = removeEntity(id, validatorItems)

      if (newValidators === undefined) {
        props.onChange(undefined)
      } else if (Object.keys(newValidators).length === 1) {
        props.onChange(undefined)
      } else {
        props.onChange(removeEntity(id, validatorItems))
      }
    }
  }

  return (
    <div className={clsx('ValidatorPicker', validatorItems && 'notEmpty')}>
      {props.label && <Label>{props.label}</Label>}
      <Stack className="wrapper" verticalAlign="space-between">
        <div className="validatorPickerBackground" />
        <Stack>
          <Stack horizontal horizontalAlign="space-between">
            <PrimaryButton onClick={addAssertion}>add assertion</PrimaryButton>
            <IconButton iconProps={{ iconName: 'DrillExpand' }} onClick={addOperator} />
          </Stack>
          {tree && (
            <Stack tokens={{ padding: '2px 0' }}>
              {/* eslint-disable-next-line @typescript-eslint/no-empty-function*/}
              <Tree tree={tree} setTree={setTree} onDragStart={() => {}} renderItem={TreeLeaf} onDragEnd={onDragEnd} />
            </Stack>
          )}
        </Stack>
        {isWithValueAssertionItem(assertionItem) && validatorItem && (
          <Form
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onSubmit={() => {}}
            initialValues={validatorItem.props}
            render={(formProps) => {
              return (
                <>
                  <Autosave
                    save={(input2) => changeValidator(validatorItem.id, validatorItem.name, input2)}
                    debounce={500}
                  />
                  <SchemaDrawer
                    schema={assertionItem.schema}
                    schemas={dummySchemas}
                    context={{
                      formState: formProps.form.getState(),
                      formProps,
                    }}
                  />
                </>
              )
            }}
          />
        )}
      </Stack>
    </div>
  )
}
