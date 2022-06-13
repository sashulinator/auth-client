import { TreeData, TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { Stack } from '@fluentui/react'
import { ValidationError, assertNotUndefined } from '@savchenko91/schema-validator'

import { typeIcons } from '../constants/type-icons'
import buildTree from '../lib/build-tree'
import { defaultCompBindings } from '../lib/constants'
import TreeLeaf from './tree-leaf'
import React, { LegacyRef, forwardRef, useEffect, useState } from 'react'
import { Form } from 'react-final-form'
import uniqid from 'uniqid'

import { ROOT_ID } from '@/constants/common'
import componentList from '@/constants/component-list'
import { addEntity, findEntity, moveEntity, removeEntity } from '@/lib/entity-actions'
import Autosave from '@/shared/autosave'
import { BindingEditor } from '@/shared/binding-editor'
import { useBindingActions } from '@/shared/binding-editor/lib/use-binding-actions'
import { FocusHOC } from '@/shared/focus-hoc'
import SchemaDrawer, {
  Catalog,
  Comp,
  EventUnit,
  EventUnitType,
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

export interface BindingSetterProps {
  comp: Comp
  comps: Catalog<Comp>
  onChange: (value: Catalog<EventUnit> | undefined) => void
  schemas: Catalog<Schema>
  value: Catalog<EventUnit> | undefined
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
  const bindingItems = props.value
  const bindingItem = bindingItems?.[selectedItemId]
  const { changeBinding } = useBindingActions(props.onChange, bindingItems)
  const [tree, setTree] = useState<TreeData | undefined>(() => rebuildTree())
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
    <BindingEditor.Root ref={ref} label={props.label}>
      <BindingEditor isFocused={props.isFocused} isNotEmpty={Boolean(bindingItems)}>
        <BindingEditor.ActionPanel
          mainButton={{ iconName: typeIcons.ASSERTION, onClick: addAssertion, name: 'Assertion' }}
          buttons={[
            { iconName: typeIcons.EVENT, onClick: addEvent, name: 'Event' },
            { iconName: typeIcons.ACTION, onClick: addAction, name: 'Action' },
            { iconName: typeIcons.OPERATOR, onClick: addOperator, name: 'Operator' },
          ]}
        />
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
                  <Autosave save={(input2) => changeBinding(bindingItem.id, bindingItem.name, input2)} debounce={500} />
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
      </BindingEditor>
    </BindingEditor.Root>
  )
})

export default FocusHOC(BindingSetter)
