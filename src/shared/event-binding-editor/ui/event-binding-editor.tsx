import { TreeData } from '@atlaskit/tree'
import { Stack } from '@fluentui/react'
import { ValidationError, and } from '@savchenko91/schema-validator'

import { typeIcons } from '../constants/type-icons'
import buildTree from '../lib/build-tree'
import TreeLeaf from './tree-leaf'
import React, { LegacyRef, forwardRef, useEffect, useState } from 'react'
import { Form } from 'react-final-form'

import componentList from '@/constants/component-list'
import withFocus from '@/lib/with-focus'
import Autosave from '@/shared/autosave'
import { BindingEditor, createRemoveHandler } from '@/shared/binding-editor'
import { createDragEndHandler } from '@/shared/binding-editor/lib/create-drag-end-handler'
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

  const {
    addBinding,
    changeBinding,
    catalog,
    schema,
    selectedBinding,
    selectItemId,
    selectedItemId,
  } = useBindingStates<EventBinding, EventBindingSchema>(props.onChange, props.value)

  const remove = createRemoveHandler(schema, {}, props.onChange)

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

  const onDragEnd = createDragEndHandler(schema, tree, catalog, setTree, props.onChange)

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
