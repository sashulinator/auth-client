import AtlasianTree, {
  RenderItemParams,
  TreeData,
  TreeDestinationPosition,
  TreeItem,
  TreeSourcePosition,
  moveItemOnTree,
} from '@atlaskit/tree'
import { Dropdown, IconButton, Stack } from '@fluentui/react'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import { buildValidatorsTree } from '../lib/build-validation-tree'
import { defaultCompValidators } from '../lib/constants'
import React, { useEffect, useState } from 'react'
import uniqid from 'uniqid'

import { Comp, CompValidator, Norm, Schema } from '@/common/types'
import { ROOT_ID } from '@/constants/common'
import { addEntity, findEntity, moveEntity, removeEntity } from '@/lib/entity-actions'
import { buildOptionsFromStringArray } from '@/shared/dropdown/lib/options'

const PADDING_PER_LEVEL = 18

interface ValidatorsTreeProps {
  comp: Comp
  comps: Norm<Comp>
  onChange: (value: Norm<CompValidator> | undefined) => void
  schemas: Norm<Schema>
  value: Norm<CompValidator> | undefined
}

export interface TreeLeafProps extends RenderItemParams {
  item: Omit<TreeItem, 'data'> & {
    data?: {
      validator: CompValidator
      remove: (id: string | number) => void
      onValidatorNameChange: (id: string | number, name: string | number) => void
    }
  }
}

function TreeLeaf(props: TreeLeafProps) {
  if (props.item.data === undefined) {
    return null
  }
  const isRoot = props.item.data.validator.id === ROOT_ID

  const { validator } = props.item.data

  return (
    <div
      ref={props.provided.innerRef}
      role="button"
      tabIndex={0}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
    >
      <Stack className="treeLeafContent" horizontal verticalAlign="center">
        {validator.name === 'and' || validator.name === 'or' ? (
          <Stack tokens={{ padding: '15px' }}>{isRoot ? 'Root' : validator.name}</Stack>
        ) : (
          <Dropdown
            onChange={(e, option) => props.item.data?.onValidatorNameChange(props.item.id, option?.key || '')}
            defaultSelectedKey={validator.name}
            styles={{ root: { width: '150px' } }}
            options={buildOptionsFromStringArray([validator.name])}
            key="1"
          />
        )}
        <IconButton iconProps={{ iconName: 'Cancel' }} onClick={() => props.item.data?.remove(props.item.id)} />
      </Stack>
    </div>
  )
}

export default function ValidatorPicker(props: ValidatorsTreeProps): JSX.Element {
  // TODO сделать проверку на невалидное значение
  const [tree, setTree] = useState<TreeData | undefined>(() => rebuildTree())

  console.log('props.value', props.value)

  const validators = props.value

  useEffect(() => setTree(rebuildTree), [props.value])

  function rebuildTree() {
    return buildValidatorsTree(props.value || undefined, {
      onChange: console.log,
      remove,
    })
  }

  function onDragEnd(from: TreeSourcePosition, to?: TreeDestinationPosition) {
    console.log('to', to, !tree)

    if (!to || !tree || !validators) {
      return
    }

    const parentValidator = findEntity(from.parentId, validators)
    const validatorId = parentValidator?.children[from.index]

    assertNotUndefined(validatorId)

    const validator = findEntity(validatorId, validators)

    // const isChildOperator = validator.name === 'and' || validator?.name === 'or'
    const isParentOperator = parentValidator?.name === 'and' || parentValidator?.name === 'or'

    if (!isParentOperator) {
      return
    }

    props.onChange(moveEntity(validator, to.parentId, to.index || 0, validators))
    setTree(moveItemOnTree(tree, from, to))
  }

  function addValidator(): void {
    const id = uniqid()
    const currentValidators = validators ? validators : defaultCompValidators
    const validator = {
      id,
      name: 'assertString',
      children: [],
    }

    const newValidators = addEntity(validator, ROOT_ID, 0, currentValidators)

    props.onChange(newValidators)
  }

  function addOperator(operatorName: 'and' | 'or') {
    return () => {
      const id = uniqid()
      const currentValidators = validators ? validators : defaultCompValidators
      const validator = {
        id,
        name: operatorName,
        children: [],
      }

      const newValidators = addEntity(validator, ROOT_ID, 0, currentValidators)

      props.onChange(newValidators)
    }
  }

  function remove(id: string | number): void {
    if (validators) {
      props.onChange(removeEntity(id, validators))
    }
  }

  return (
    <div className="ValidatorsTree" style={{ overflow: 'auto', height: '300px' }}>
      <IconButton iconProps={{ iconName: 'Robot' }} onClick={addValidator} />
      <IconButton iconProps={{ iconName: 'Memo' }} onClick={addOperator('and')} />
      <IconButton iconProps={{ iconName: 'DrillExpand' }} onClick={addOperator('or')} />
      {tree && (
        <AtlasianTree
          tree={tree}
          renderItem={TreeLeaf}
          onDragEnd={onDragEnd}
          offsetPerLevel={PADDING_PER_LEVEL}
          isDragEnabled
          isNestingEnabled
        />
      )}
    </div>
  )
}
