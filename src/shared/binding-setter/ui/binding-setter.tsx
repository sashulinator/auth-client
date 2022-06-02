import { TreeData, TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { ActionButton, Label, Stack } from '@fluentui/react'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import './binding-setter.css'

import buildTree from '../lib/build-tree'
import { defaultCompBindings } from '../lib/constants'
import TreeLeaf from './tree-leaf'
import clsx from 'clsx'
import omitEmpty from 'omit-empty-es'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-final-form'
import uniqid from 'uniqid'

import { ROOT_ID } from '@/constants/common'
import { Comp, EventUnit, EventUnitType, Norm, Schema } from '@/entities/schema'
import { dummySchemas } from '@/entities/schema/model/dummy-schemas'
import SchemaDrawer from '@/entities/schema/schema-drawer'
import actionList from '@/entities/schema/schema-drawer/lib/action-list'
import { isWithValueAssertionItem } from '@/entities/schema/schema-drawer/lib/assertion-list'
import { replace } from '@/lib/change-unmutable'
import { addEntity, findEntity, moveEntity, removeEntity } from '@/lib/entity-actions'
import Autosave from '@/shared/autosave'
import Tree from '@/shared/tree/ui/tree'

export interface BindingSetterProps {
  comp: Comp
  comps: Norm<Comp>
  onChange: (value: Norm<EventUnit> | undefined) => void
  schemas: Norm<Schema>
  value: Norm<EventUnit> | undefined
  name?: string
  label?: string
  context?: any
}

export default function BindingSetter(props: BindingSetterProps): JSX.Element {
  // TODO сделать проверку на невалидное значение
  const [selectedItemId, selectItemId] = useState('')
  const [tree, setTree] = useState<TreeData | undefined>(() => rebuildTree())
  const bindingItems = props.value
  const bindingItem = bindingItems?.[selectedItemId]
  const assertionItem = actionList[bindingItem?.name || '']

  useEffect(() => setTree(rebuildTree), [props.value, selectedItemId])

  function rebuildTree() {
    return buildTree(props.value || undefined, {
      changeBinding,
      remove,
      selectItemId,
      selectedItemId,
    })
  }

  function changeBinding(id: string | number, name: string, newBindingItemProps: unknown) {
    if (bindingItems && props.name) {
      const binding = findEntity(id, bindingItems)
      const newBindings = replace(bindingItems, id, {
        ...binding,
        name,
        ...(newBindingItemProps ? { props: newBindingItemProps } : undefined),
      })

      props.onChange(omitEmpty(newBindings))
    }
  }

  function onDragEnd(from: TreeSourcePosition, to?: TreeDestinationPosition) {
    if (!to || !tree || !bindingItems || to.parentId === 'rootId') {
      return
    }

    const fromParentBinding = findEntity(from.parentId, bindingItems)
    const bindingId = fromParentBinding?.children?.[from.index]

    assertNotUndefined(bindingId)

    const binding = findEntity(bindingId, bindingItems)

    if (bindingItems) {
      props.onChange(moveEntity(binding, to.parentId, to.index || 0, bindingItems))
      setTree(moveItemOnTree(tree, from, to))
    }
  }

  function addAssertion(): void {
    const id = uniqid()
    const currentBindings = bindingItems ? bindingItems : defaultCompBindings
    const binding: EventUnit = {
      id,
      type: EventUnitType.ASSERTION,
      name: 'string',
      children: [],
    }

    const newBindings = addEntity(binding, ROOT_ID, 1, currentBindings)

    if (props.name) {
      props.onChange(newBindings)
    }
  }

  function addOperator() {
    const id = uniqid()
    const currentBindings = bindingItems ? bindingItems : defaultCompBindings
    const bindingItem: EventUnit = {
      id,
      name: 'and',
      type: EventUnitType.OPERATOR,
      children: [],
    }

    const newBindingItems = addEntity(bindingItem, ROOT_ID, 1, currentBindings)

    if (bindingItems) {
      props.onChange(newBindingItems)
    }
  }

  function addAction() {
    const id = uniqid()
    const currentBindings = bindingItems ? bindingItems : defaultCompBindings
    const bindingItem: EventUnit = {
      id,
      name: 'setValue',
      type: EventUnitType.ACTION,
      children: [],
    }

    const newBindingItems = addEntity(bindingItem, ROOT_ID, 1, currentBindings)

    if (bindingItems) {
      props.onChange(newBindingItems)
    }
  }

  function addEvent() {
    const id = uniqid()
    const currentBindings = bindingItems ? bindingItems : defaultCompBindings
    const bindingItem: EventUnit = {
      id,
      name: 'onChange',
      type: EventUnitType.EVENT,
      children: [],
    }

    const newBindingItems = addEntity(bindingItem, ROOT_ID, 0, currentBindings)

    if (bindingItems) {
      props.onChange(newBindingItems)
    }
  }

  function remove(id: string | number): void {
    if (bindingItems) {
      const newBindings = removeEntity(id, bindingItems)
      assertNotUndefined(newBindings)

      if (Object.keys(newBindings).length === 1) {
        props.onChange(undefined)
      } else {
        props.onChange(removeEntity(id, bindingItems))
      }
    }
  }

  return (
    <div className={clsx('BindingSetter', bindingItems && 'notEmpty')}>
      {props.label && <Label>{props.label}</Label>}
      <Stack className="wrapper" verticalAlign="space-between">
        <div className="bindingSetterBackground" />
        <Stack>
          <Stack horizontal horizontalAlign="space-between">
            <ActionButton iconProps={{ iconName: 'Add' }} onClick={addAssertion}>
              assertion
            </ActionButton>
            <Stack horizontal>
              <ActionButton iconProps={{ iconName: 'TouchPointer' }} onClick={addEvent} />
              <ActionButton iconProps={{ iconName: 'LightningBolt' }} onClick={addAction} />
              <ActionButton iconProps={{ iconName: 'DrillExpand' }} onClick={addOperator} />
            </Stack>
          </Stack>
          {tree && (
            <Stack tokens={{ padding: '2px 0' }}>
              {/* eslint-disable-next-line @typescript-eslint/no-empty-function*/}
              <Tree tree={tree} setTree={setTree} onDragStart={() => {}} renderItem={TreeLeaf} onDragEnd={onDragEnd} />
            </Stack>
          )}
        </Stack>
        {isWithValueAssertionItem(assertionItem) && bindingItem && (
          <Form
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onSubmit={() => {}}
            initialValues={bindingItem.props}
            render={(formProps) => {
              return (
                <>
                  <Autosave save={(input2) => changeBinding(bindingItem.id, bindingItem.name, input2)} debounce={500} />
                  <SchemaDrawer
                    schema={assertionItem.schema}
                    schemas={dummySchemas}
                    context={{
                      previewSchema: props.context?.previewSchema,
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
