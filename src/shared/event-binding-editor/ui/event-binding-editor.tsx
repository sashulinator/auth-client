import { TreeData, TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { ActionButton, IButtonStyles, Label, Stack } from '@fluentui/react'
import { ValidationError, assertNotUndefined } from '@savchenko91/schema-validator'

import './event-binding-editor.css'

import { typeIcons } from '../constants/type-icons'
import buildTree from '../lib/build-tree'
import { defaultCompBindings } from '../lib/constants'
import TreeLeaf from './tree-leaf'
import clsx from 'clsx'
import omitEmpty from 'omit-empty-es'
import React, { LegacyRef, forwardRef, useEffect, useState } from 'react'
import { Form } from 'react-final-form'
import uniqid from 'uniqid'

import { ROOT_ID } from '@/constants/common'
import componentList from '@/constants/component-list'
import { replace } from '@/lib/change-unmutable'
import { addEntity, findEntity, moveEntity, removeEntity } from '@/lib/entity-actions'
import Autosave from '@/shared/autosave'
import { FocusHOC } from '@/shared/focus-hoc'
import SchemaDrawer, {
  Comp,
  EventUnit,
  EventUnitType,
  Norm,
  Schema,
  actionList,
  basicComponentsSchemas,
  eventAssertionList,
  eventList,
  hasSchema,
  onFieldChange,
  setValue,
} from '@/shared/schema-drawer'
import Tree from '@/shared/tree'

const buttonStyles: IButtonStyles = {
  rootHovered: {
    backgroundColor: 'var(--themePrimaryTransparent01)',
  },
  root: {
    height: '32px',
  },
  label: {
    color: 'var(--themePrimary)',
  },
}

export interface BindingSetterProps {
  comp: Comp
  comps: Norm<Comp>
  onChange: (value: Norm<EventUnit> | undefined) => void
  schemas: Norm<Schema>
  value: Norm<EventUnit> | undefined
  name?: string
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context?: any
  validationError?: ValidationError
  isFocused: boolean
  ref: LegacyRef<HTMLDivElement | null>
}

const BindingSetter = forwardRef<HTMLDivElement | null, BindingSetterProps>(function BindingSetter(
  props,
  ref
): JSX.Element {
  // TODO сделать проверку на невалидное значение
  const [selectedItemId, selectItemId] = useState('')
  const [tree, setTree] = useState<TreeData | undefined>(() => rebuildTree())
  const bindingItems = props.value
  const bindingItem = bindingItems?.[selectedItemId]
  const assertionItem =
    eventAssertionList[bindingItem?.name || ''] ||
    actionList[bindingItem?.name || ''] ||
    eventList[bindingItem?.name || '']

  useEffect(() => setTree(rebuildTree), [props.value, selectedItemId])

  function rebuildTree() {
    return buildTree(props.value || undefined, {
      changeBinding,
      remove,
      selectItemId,
      selectedItemId,
      errorId: props.validationError?._inputName,
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
      name: 'undefined',
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
      name: setValue.name,
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
      name: onFieldChange.name,
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
    <div className={clsx('BindingSetter', bindingItems && 'notEmpty', props.isFocused && 'isFocused')} ref={ref}>
      {props.label && <Label>{props.label}</Label>}
      <Stack className="wrapper" verticalAlign="space-between">
        <div className="bindingSetterBackground" />
        <Stack tokens={{ childrenGap: '16px' }}>
          <Stack horizontal horizontalAlign="space-between">
            <ActionButton iconProps={{ iconName: typeIcons.ASSERTION }} onClick={addAssertion} styles={buttonStyles}>
              assertion
            </ActionButton>
            <Stack horizontal tokens={{ childrenGap: '12px' }}>
              <ActionButton iconProps={{ iconName: typeIcons.EVENT }} onClick={addEvent} styles={buttonStyles} />
              <ActionButton iconProps={{ iconName: typeIcons.ACTION }} onClick={addAction} styles={buttonStyles} />
              <ActionButton iconProps={{ iconName: typeIcons.OPERATOR }} onClick={addOperator} styles={buttonStyles} />
            </Stack>
          </Stack>
          {tree && (
            <Stack tokens={{ padding: '2px 0' }}>
              {/* eslint-disable-next-line @typescript-eslint/no-empty-function*/}
              <Tree tree={tree} setTree={setTree} onDragStart={() => {}} renderItem={TreeLeaf} onDragEnd={onDragEnd} />
            </Stack>
          )}
          {hasSchema(assertionItem) && bindingItem && (
            <Form
              key={selectedItemId}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onSubmit={() => {}}
              initialValues={bindingItem.props}
              render={(formProps) => {
                return (
                  <>
                    <Autosave
                      save={(input2) => changeBinding(bindingItem.id, bindingItem.name, input2)}
                      debounce={500}
                    />
                    <SchemaDrawer
                      componentList={componentList}
                      schema={assertionItem.schema}
                      schemas={basicComponentsSchemas}
                      context={{
                        previewSchema: props.context?.previewSchema,
                        previewData: props.context?.previewData,
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
      </Stack>
    </div>
  )
})

export default FocusHOC(BindingSetter)
