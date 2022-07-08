import { TreeData } from '@atlaskit/tree'
import { Stack } from '@fluentui/react'
import { useId } from '@fluentui/react-hooks'
import { ValidationError, and } from '@savchenko91/schema-validator'

import React, { LegacyRef, forwardRef, useEffect, useState } from 'react'

import componentList from '@/constants/component-list'
import withFocus from '@/lib/with-focus'
import { FormAutosave } from '@/shared/autosave'
import { BindingEditor, TreeNode, createRemoveHandler, typeIcons } from '@/shared/binding-editor'
import { createDragEndHandler } from '@/shared/binding-editor/lib/create-drag-end-handler'
import { useBindingStates } from '@/shared/binding-editor/lib/use-binding-states'
import SchemaDrawer, {
  Comp,
  CompSchema,
  Dictionary,
  EventAssertionBindingMetaName,
  EventBinding,
  EventBindingSchema,
  EventBindingType,
  actionDictionary,
  basicComponentsSchemas,
  eventAssertionBindingMetaCatalog,
  eventDictionary,
  hasSchema,
  onFieldChange,
  setValue,
} from '@/shared/schema-drawer'
import Tree, { buildTree } from '@/shared/tree'

export interface BindingSetterProps {
  comp: Comp
  comps: Dictionary<Comp>
  onChange: (value: EventBindingSchema | undefined) => void
  schemas: Dictionary<CompSchema>
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
  const bindingEditorId = `binding-${useId()}`

  const { schema, data, selectedBinding, selectedItemId, addBinding, changeBinding, selectItemId } = useBindingStates<
    EventBinding,
    EventBindingSchema
  >(props.onChange, props.value)

  const remove = createRemoveHandler(schema, {}, props.onChange)

  const [tree, setTree] = useState<TreeData | undefined>()

  const assertionItem =
    eventAssertionBindingMetaCatalog[selectedBinding?.name || ''] ||
    actionDictionary[selectedBinding?.name || ''] ||
    eventDictionary[selectedBinding?.name || '']

  useEffect(rebuildTree, [props.value, selectedItemId])

  function rebuildTree() {
    const newTree = buildTree(tree, data || undefined, {
      errorId: props.validationError?._inputName,
      isInitialExpanded: true,
      assertionNames: Object.keys(EventAssertionBindingMetaName),
      bindingEditorId,
      selectedItemId,
      changeBinding,
      remove,
      selectItemId,
    })

    setTree(newTree)
  }

  const onDragEnd = createDragEndHandler(schema, tree, data, setTree, props.onChange)

  function addAssertion(): void {
    addBinding({ type: EventBindingType.EVENT_ASSERTION, name: 'undefined' })
  }

  function addOperator(): void {
    addBinding({ type: EventBindingType.OPERATOR, name: and.name })
  }

  function addAction(): void {
    addBinding({ type: EventBindingType.ACTION, name: setValue.name })
  }

  function addEvent() {
    addBinding({ type: EventBindingType.EVENT, name: onFieldChange.name })
  }

  return (
    <BindingEditor.Root ref={ref} label={props.label} className={bindingEditorId}>
      <BindingEditor isFocused={props.isFocused} isNotEmpty={Boolean(data)}>
        <BindingEditor.ActionPanel
          mainButton={{ iconName: typeIcons.EVENT, onClick: addEvent, name: 'Event' }}
          buttons={[
            { iconName: typeIcons.ACTION, onClick: addAction, name: 'Action' },
            { iconName: typeIcons.EVENT_ASSERTION, onClick: addAssertion, name: 'Assertion' },
            { iconName: typeIcons.OPERATOR, onClick: addOperator, name: 'Operator' },
          ]}
        />
        {tree && (
          <Stack tokens={{ padding: '2px 0' }}>
            {/* eslint-disable-next-line @typescript-eslint/no-empty-function*/}
            <Tree tree={tree} setTree={setTree} onDragStart={() => {}} renderItem={TreeNode} onDragEnd={onDragEnd} />
          </Stack>
        )}
        {hasSchema(assertionItem) && selectedBinding && (
          <div className="bindinForm">
            <FormAutosave
              key={JSON.stringify(assertionItem.schema)}
              initialValues={selectedBinding.props}
              debounce={500}
              onSubmit={(input2) => changeBinding(selectedBinding.id, selectedBinding.name, input2)}
              render={(formProps) => {
                return (
                  <SchemaDrawer
                    componentList={componentList}
                    schema={assertionItem.schema}
                    schemas={basicComponentsSchemas}
                    context={{
                      previewSchema: props.context?.previewSchema,
                      previewData: props.context?.previewData,
                      form: formProps.form,
                    }}
                  />
                )
              }}
            />
          </div>
        )}
      </BindingEditor>
    </BindingEditor.Root>
  )
})

export default withFocus(BindingSetter)
