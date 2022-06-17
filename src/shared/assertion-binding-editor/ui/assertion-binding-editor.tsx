import { TreeData, TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { Stack } from '@fluentui/react'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import './assertion-binding-editor.css'

import { typeIcons } from '../constatnts/type-icons'
import buildTree from '../lib/build-tree'
import TreeLeaf from './tree-leaf'
import omitEmpty from 'omit-empty-es'
import React, { forwardRef, useEffect, useState } from 'react'
import { Field, Form } from 'react-final-form'

import componentList from '@/constants/component-list'
import { replace } from '@/lib/change-unmutable'
import { findEntity, moveEntity, removeEntity } from '@/lib/entity-actions'
import Autosave from '@/shared/autosave'
import { BindingEditor } from '@/shared/binding-editor'
import { useBindingStates } from '@/shared/binding-editor/lib/use-binding-states'
import { Dropdown } from '@/shared/dropdown'
import SchemaDrawer, {
  AssertionBinding,
  AssertionBindingSchema,
  AssertionBindingType,
  Catalog,
  Comp,
  CompSchema,
  EventToShowError,
  assertionList,
  basicComponentsSchemas,
  hasSchema,
} from '@/shared/schema-drawer'
import Tree from '@/shared/tree/ui/tree'

export interface AssertionBindingEditorProps {
  // string приходит от final-form при инициализации
  value: AssertionBindingSchema | undefined | string
  comp: Comp
  comps: Catalog<Comp>
  schemas: Catalog<CompSchema>
  name?: string
  label?: string
  isFocused: boolean
  onChange: (value: AssertionBindingSchema | undefined) => void
}

const AssertionBindingEditor = forwardRef<HTMLDivElement | null, AssertionBindingEditorProps>(function ValidatorPicker(
  props,
  ref
): JSX.Element {
  const {
    schema,
    catalog,
    selectedItemId,
    selectedBinding,
    addBinding,
    changeBinding,
    selectItemId,
  } = useBindingStates<AssertionBinding, AssertionBindingSchema>(props.onChange, props.value)

  const [tree, setTree] = useState<TreeData | undefined>(() => rebuildTree())

  const assertionItem = assertionList[selectedBinding?.name || '']

  useEffect(() => setTree(rebuildTree), [props.value, selectedItemId])

  function rebuildTree() {
    return buildTree(schema?.catalog || undefined, {
      changeValidator,
      remove,
      selectItemId,
      selectedItemId,
    })
  }

  function changeValidator(id: string | number, name: string, newValidatorItemProps: unknown) {
    if (catalog && props.name) {
      const validator = findEntity(id, catalog)
      const newValidators = replace(catalog, id, {
        ...validator,
        name,
        props: newValidatorItemProps,
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const units: any = omitEmpty(newValidators)
      assertNotUndefined(schema)

      props.onChange({ ...schema, catalog: units })
    }
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
      props.onChange({ catalog: newCatalog, eventToShowError: EventToShowError.onTouched })
      setTree(moveItemOnTree(tree, from, to))
    }
  }

  function addAssertion() {
    addBinding({ type: AssertionBindingType.ASSERTION, name: 'string' })
  }

  function addOperator() {
    addBinding({ type: AssertionBindingType.OPERATOR, name: 'and' })
  }

  function remove(id: string | number): void {
    if (catalog) {
      const units = removeEntity(id, catalog)
      assertNotUndefined(units)

      // isOnlyRoot?
      if (Object.keys(units).length === 1) {
        props.onChange(undefined)
      } else {
        const newSchema = schema ?? { eventToShowError: EventToShowError.onVisited }
        props.onChange({ ...newSchema, catalog: units })
      }
    }
  }

  return (
    <BindingEditor.Root ref={ref} label={props.label}>
      <BindingEditor isFocused={props.isFocused} isNotEmpty={Boolean(catalog)}>
        <Stack>
          <BindingEditor.ActionPanel
            mainButton={{ iconName: typeIcons.ASSERTION, onClick: addAssertion, name: 'Assertion' }}
            buttons={[{ iconName: typeIcons.OPERATOR, onClick: addOperator, name: 'Operator' }]}
          />
          {tree && (
            <Stack tokens={{ padding: '2px 0' }}>
              {/* eslint-disable-next-line @typescript-eslint/no-empty-function*/}
              <Tree tree={tree} setTree={setTree} onDragStart={() => {}} renderItem={TreeLeaf} onDragEnd={onDragEnd} />
            </Stack>
          )}
        </Stack>

        {props.value && (
          <Form
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onSubmit={() => {}}
            initialValues={props.value}
            render={() => {
              return (
                <>
                  <Autosave save={(newSchema) => props.onChange(newSchema)} debounce={500} />
                  <Field<string> name="eventToShowError">
                    {({ input }) => <Dropdown label="eventToShowError" {...input} options={EventToShowError} />}
                  </Field>
                </>
              )
            }}
          />
        )}

        {hasSchema(assertionItem) && selectedBinding && (
          <Form
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

export default AssertionBindingEditor
