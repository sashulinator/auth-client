import { TreeData, TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { Stack } from '@fluentui/react'
import { ValidationError, and, assertNotUndefined } from '@savchenko91/schema-validator'

import { typeIcons } from '../constants/type-icons'
import buildTree from '../lib/build-tree'
import TreeLeaf from './tree-leaf'
import React, { LegacyRef, forwardRef, useEffect, useState } from 'react'
import { Form } from 'react-final-form'

import componentList from '@/constants/component-list'
import { findEntity, moveEntity, removeEntity } from '@/lib/entity-actions'
import withFocus from '@/lib/with-focus'
import Autosave from '@/shared/autosave'
import { BindingEditor } from '@/shared/binding-editor'
import { useBindingStates } from '@/shared/binding-editor/lib/use-binding-states'
import SchemaDrawer, {
  Catalog,
  Comp,
  CompSchema,
  EventBinding,
  EventBindingSchema,
  EventType,
  actionList,
  basicComponentsSchemas,
  eventAssertionBindingMetaCatalog,
  eventList,
  hasSchema,
  onFieldChange,
  setValue,
} from '@/shared/schema-drawer'
import Tree from '@/shared/tree'

export interface BindingSetterProps {
  comp: Comp
  comps: Catalog<Comp>
  onChange: (value: EventBindingSchema | undefined) => void
  schemas: Catalog<CompSchema>
  value: EventBindingSchema | undefined | string
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
  const { addBinding, changeBinding, catalog, selectedBinding, selectItemId, selectedItemId } = useBindingStates<
    EventBinding,
    EventBindingSchema
  >(props.onChange, props.value)

  const [tree, setTree] = useState<TreeData | undefined>(() => rebuildTree())
  const assertionItem =
    eventAssertionBindingMetaCatalog[selectedBinding?.name || ''] ||
    actionList[selectedBinding?.name || ''] ||
    eventList[selectedBinding?.name || '']

  useEffect(() => setTree(rebuildTree), [props.value, selectedItemId])

  function rebuildTree() {
    return buildTree(catalog || undefined, {
      changeBinding,
      remove,
      selectItemId,
      selectedItemId,
      errorId: props.validationError?._inputName,
    })
  }

  function onDragEnd(from: TreeSourcePosition, to?: TreeDestinationPosition) {
    if (!to || !tree || !catalog || to.parentId === 'rootId') {
      return
    }

    const fromParentBinding = findEntity(from.parentId, catalog)
    const bindingId = fromParentBinding?.children?.[from.index]

    assertNotUndefined(bindingId)

    const binding = findEntity(bindingId, catalog)

    if (catalog) {
      const newCatalog = moveEntity(binding, to.parentId, to.index || 0, catalog)
      props.onChange({ catalog: newCatalog })
      setTree(moveItemOnTree(tree, from, to))
    }
  }

  function addAssertion(): void {
    addBinding({ type: EventType.ASSERTION, name: 'undefined' })
  }

  function addOperator(): void {
    addBinding({ type: EventType.OPERATOR, name: and.name })
  }

  function addAction(): void {
    addBinding({ type: EventType.ACTION, name: setValue.name })
  }

  function addEvent() {
    addBinding({ type: EventType.EVENT, name: onFieldChange.name })
  }

  function remove(id: string | number): void {
    if (catalog) {
      const newBindings = removeEntity(id, catalog)
      assertNotUndefined(newBindings)

      if (Object.keys(newBindings).length === 1) {
        props.onChange(undefined)
      } else {
        const newCatalog = removeEntity(id, catalog)
        assertNotUndefined(newCatalog)
        props.onChange({ catalog: newCatalog })
      }
    }
  }

  return (
    <BindingEditor.Root ref={ref} label={props.label}>
      <BindingEditor isFocused={props.isFocused} isNotEmpty={Boolean(catalog)}>
        <BindingEditor.ActionPanel
          mainButton={{ iconName: typeIcons.EVENT, onClick: addEvent, name: 'Event' }}
          buttons={[
            { iconName: typeIcons.ACTION, onClick: addAction, name: 'Action' },
            { iconName: typeIcons.ASSERTION, onClick: addAssertion, name: 'Assertion' },
            { iconName: typeIcons.OPERATOR, onClick: addOperator, name: 'Operator' },
          ]}
        />
        {tree && (
          <Stack tokens={{ padding: '2px 0' }}>
            {/* eslint-disable-next-line @typescript-eslint/no-empty-function*/}
            <Tree tree={tree} setTree={setTree} onDragStart={() => {}} renderItem={TreeLeaf} onDragEnd={onDragEnd} />
          </Stack>
        )}
        {hasSchema(assertionItem) && selectedBinding && (
          <Form
            key={selectedItemId}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onSubmit={() => {}}
            initialValues={selectedBinding.props}
            render={(formProps) => {
              return (
                <>
                  <Autosave
                    save={(input2) => changeBinding(selectedBinding.id, selectedBinding.name, input2)}
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
      </BindingEditor>
    </BindingEditor.Root>
  )
})

export default withFocus(BindingSetter)
