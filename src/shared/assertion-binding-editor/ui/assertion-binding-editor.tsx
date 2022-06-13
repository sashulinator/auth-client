import { TreeData, TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { ActionButton, Stack } from '@fluentui/react'
import { assertNotUndefined, isString } from '@savchenko91/schema-validator'

import './assertion-binding-editor.css'

import buildTree from '../lib/build-tree'
import { defaultCompValidators } from '../lib/constants'
import TreeLeaf from './tree-leaf'
import omitEmpty from 'omit-empty-es'
import React, { forwardRef, useEffect, useState } from 'react'
import { Field, Form } from 'react-final-form'
import uniqid from 'uniqid'

import { ROOT_ID } from '@/constants/common'
import componentList from '@/constants/component-list'
import { replace } from '@/lib/change-unmutable'
import { addEntity, findEntity, moveEntity, removeEntity } from '@/lib/entity-actions'
import Autosave from '@/shared/autosave'
import { BindingEditor } from '@/shared/binding-editor'
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
  comp: Comp
  comps: Catalog<Comp>
  onChange: (value: AssertionBindingSchema | undefined) => void
  schemas: Catalog<CompSchema>
  // string приходит от final-form при инициализации
  value: AssertionBindingSchema | undefined | string
  name?: string
  label?: string
  isFocused: boolean
}

const AssertionBindingEditor = forwardRef<HTMLDivElement | null, AssertionBindingEditorProps>(function ValidatorPicker(
  props,
  ref
): JSX.Element {
  // TODO сделать проверку на невалидное значение
  const assertionBindingSchema = isString(props.value) ? undefined : props.value

  const [selectedItemId, selectItemId] = useState('')
  const [tree, setTree] = useState<TreeData | undefined>(() => rebuildTree())

  const catalog = assertionBindingSchema?.catalog
  const validatorItem = catalog?.[selectedItemId]
  const assertionItem = assertionList[validatorItem?.name || '']

  useEffect(() => setTree(rebuildTree), [props.value, selectedItemId])

  function rebuildTree() {
    return buildTree(assertionBindingSchema?.catalog || undefined, {
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
      assertNotUndefined(assertionBindingSchema)

      props.onChange({ ...assertionBindingSchema, catalog: units })
    }
  }

  function onDragEnd(from: TreeSourcePosition, to?: TreeDestinationPosition) {
    if (!to || !tree || !catalog || to.parentId === 'rootId') {
      return
    }

    const toParentValidator = findEntity(to.parentId, catalog)
    const fromParentValidator = findEntity(from.parentId, catalog)
    const validatorId = fromParentValidator?.children?.[from.index]

    assertNotUndefined(validatorId)

    const validator = findEntity(validatorId, catalog)

    const isParentOperator = toParentValidator?.name === 'and' || toParentValidator?.name === 'or'

    if (!isParentOperator) {
      return
    }

    if (catalog) {
      const units = moveEntity(validator, to.parentId, to.index || 0, catalog)
      const schema = assertionBindingSchema ?? { eventToShowError: EventToShowError.onTouched }
      props.onChange({ ...schema, catalog: units })
      setTree(moveItemOnTree(tree, from, to))
    }
  }

  function addAssertion(): void {
    const id = uniqid()
    const currentValidators = catalog ? catalog : defaultCompValidators
    const validator: AssertionBinding = {
      id,
      type: AssertionBindingType.ASSERTION,
      name: 'string',
      children: [],
    }

    const units = addEntity(validator, ROOT_ID, 0, currentValidators)
    const schema = assertionBindingSchema ?? { eventToShowError: EventToShowError.onTouched }

    if (props.name) {
      props.onChange({ ...schema, catalog: units })
    }
  }

  function addOperator() {
    const id = uniqid()
    const currentValidators = catalog ? catalog : defaultCompValidators
    const validatorItem: AssertionBinding = {
      id,
      name: 'and',
      type: AssertionBindingType.OPERATOR,
      children: [],
    }

    const units = addEntity(validatorItem, ROOT_ID, 0, currentValidators)
    const schema = assertionBindingSchema || { eventToShowError: EventToShowError.onTouched }

    if (catalog) {
      props.onChange({ ...schema, catalog: units })
    }
  }

  function remove(id: string | number): void {
    if (catalog) {
      const units = removeEntity(id, catalog)
      assertNotUndefined(units)

      // isOnlyRoot?
      if (Object.keys(units).length === 1) {
        props.onChange(undefined)
      } else {
        const schema = assertionBindingSchema ?? { eventToShowError: EventToShowError.onVisited }
        props.onChange({ ...schema, catalog: units })
      }
    }
  }

  return (
    <BindingEditor.Root ref={ref} label={props.label}>
      <BindingEditor isFocused={props.isFocused} isNotEmpty={Boolean(catalog)}>
        <Stack>
          <Stack horizontal horizontalAlign="space-between">
            <ActionButton iconProps={{ iconName: 'Add' }} onClick={addAssertion}>
              assertion
            </ActionButton>
            <ActionButton iconProps={{ iconName: 'DrillExpand' }} onClick={addOperator} />
          </Stack>
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

        {hasSchema(assertionItem) && validatorItem && (
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
