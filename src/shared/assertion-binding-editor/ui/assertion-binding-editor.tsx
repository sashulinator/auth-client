import { TreeData } from '@atlaskit/tree'
import { Stack } from '@fluentui/react'
import { useId } from '@fluentui/react-hooks'
import { ValidationError } from '@savchenko91/schema-validator'

import './assertion-binding-editor.css'

import { typeIcons } from '../constatnts/type-icons'
import { initialSchema } from '../lib/constants'
import React, { forwardRef, useEffect, useState } from 'react'
import { Field } from 'react-final-form'

import componentList from '@/constants/component-list'
import withFocus from '@/lib/with-focus'
import { FormAutosave } from '@/shared/autosave'
import { BindingEditor, TreeNode, createRemoveHandler } from '@/shared/binding-editor'
import { createDragEndHandler } from '@/shared/binding-editor/lib/create-drag-end-handler'
import { useBindingStates } from '@/shared/binding-editor/lib/use-binding-states'
import { Dropdown } from '@/shared/dropdown'
import SchemaDrawer, {
  AssertionBinding,
  AssertionBindingSchema,
  AssertionBindingType,
  BindingSchema,
  Comp,
  CompSchema,
  Dictionary,
  EventToShowError,
  assertionList,
  basicComponentsSchemas,
  hasSchema,
} from '@/shared/schema-drawer'
import { buildTree } from '@/shared/tree'
import Tree from '@/shared/tree/ui/tree'

export interface AssertionBindingEditorProps {
  // string приходит от final-form при инициализации
  value: AssertionBindingSchema | undefined | string
  comp: Comp
  comps: Dictionary<Comp>
  schemas: Dictionary<CompSchema>
  name?: string
  label?: string
  isFocused: boolean
  validationError?: ValidationError
  onChange: (value: BindingSchema<AssertionBinding> | undefined) => void
}

const AssertionBindingEditor = forwardRef<HTMLDivElement | null, AssertionBindingEditorProps>(function ValidatorPicker(
  props,
  ref
): JSX.Element {
  const bindingEditorId = `binding-${useId()}`

  const { schema, data, selectedItemId, selectedBinding, addBinding, changeBinding, selectItemId } = useBindingStates<
    AssertionBinding,
    AssertionBindingSchema
  >(props.onChange, props.value, initialSchema)

  const remove = createRemoveHandler(schema, { eventToShowError: EventToShowError.onVisited }, props.onChange)

  const [tree, setTree] = useState<TreeData | undefined>()

  const assertionItem = assertionList[selectedBinding?.name || '']

  useEffect(rebuildTree, [props.value, selectedItemId])

  function rebuildTree() {
    const newTree = buildTree(tree, schema?.data || undefined, {
      bindingEditorId,
      isInitialExpanded: true,
      assertionNames: Object.keys(assertionList),
      errorId: props.validationError?._inputName,
      selectedItemId,
      selectItemId,
      changeBinding,
      remove,
    })

    setTree(newTree)
  }

  function addAssertion() {
    addBinding({ type: AssertionBindingType.ASSERTION, name: 'string' })
  }

  function addOperator() {
    addBinding({ type: AssertionBindingType.OPERATOR, name: 'and' })
  }

  const onDragEnd = createDragEndHandler(schema, tree, data, setTree, props.onChange)

  return (
    <BindingEditor.Root ref={ref} label={props.label}>
      <BindingEditor isFocused={props.isFocused} isNotEmpty={Boolean(data)}>
        <BindingEditor.ActionPanel
          mainButton={{ iconName: typeIcons.ASSERTION, onClick: addAssertion, name: 'Assertion' }}
          buttons={[{ iconName: typeIcons.OPERATOR, onClick: addOperator, name: 'Operator' }]}
        />
        {tree && (
          <Stack tokens={{ padding: '2px 0' }}>
            {/* eslint-disable-next-line @typescript-eslint/no-empty-function*/}
            <Tree tree={tree} setTree={setTree} onDragStart={() => {}} renderItem={TreeNode} onDragEnd={onDragEnd} />
          </Stack>
        )}
        {props.value && (
          <FormAutosave<AssertionBindingSchema>
            initialValues={schema}
            onSubmit={(newSchema) => props.onChange(newSchema)}
            debounce={500}
            render={() => {
              return (
                <Field<string> name="eventToShowError">
                  {({ input }) => <Dropdown label="eventToShowError" {...input} options={EventToShowError} />}
                </Field>
              )
            }}
          />
        )}

        {hasSchema(assertionItem) && selectedBinding && (
          <FormAutosave<AssertionBindingSchema>
            onSubmit={(input2) => changeBinding(selectedBinding.id, selectedBinding.name, input2)}
            initialValues={selectedBinding.props}
            debounce={500}
            render={(formProps) => {
              return (
                <SchemaDrawer
                  componentList={componentList}
                  schema={assertionItem.schema}
                  schemas={basicComponentsSchemas}
                  context={{ form: formProps.form }}
                />
              )
            }}
          />
        )}
      </BindingEditor>
    </BindingEditor.Root>
  )
})

export default withFocus(AssertionBindingEditor)
