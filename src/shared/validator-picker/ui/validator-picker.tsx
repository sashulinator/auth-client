import AtlasianTree, { RenderItemParams, TreeData, TreeItem, moveItemOnTree } from '@atlaskit/tree'
import { Dropdown, IconButton, Stack } from '@fluentui/react'

import { buildValidatorsTree } from '../lib/build-validation-tree'
import { defaultCompValidators } from '../lib/constants'
import React, { useEffect, useState } from 'react'
import uniqid from 'uniqid'

import { Comp, CompValidator, Norm, Schema } from '@/common/types'

const PADDING_PER_LEVEL = 18

interface ValidatorsTreeProps {
  comp: Comp
  comps: Norm<Comp>
  onChange: (value: Norm<CompValidator>) => void
  schemas: Norm<Schema>
  value: Norm<CompValidator>
}

export interface TreeLeafProps extends RenderItemParams {
  item: Omit<TreeItem, 'data'> & {
    data?: any
  }
}

function TreeLeaf(props: TreeLeafProps) {
  console.log('props.item.data.validator', props.item.data.validator)
  const { name } = props.item.data.validator

  return (
    <div
      ref={props.provided.innerRef}
      role="button"
      tabIndex={0}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
    >
      <Stack className="treeLeafContent" horizontal verticalAlign="center">
        {name === 'and' || name === 'or' ? (
          <Stack tokens={{ padding: '15px' }}>{name}</Stack>
        ) : (
          <Dropdown
            onChange={props.item.data.onChange}
            defaultValue={props.item.data.validator.name}
            styles={{ root: { width: '150px' } }}
            options={[
              {
                key: 'key',
                text: props.item.data.name,
              },
            ]}
            key="1"
          />
        )}
      </Stack>
    </div>
  )
}

export default function ValidatorPicker(props: ValidatorsTreeProps): JSX.Element {
  const [tree, setTree] = useState<TreeData | undefined>(() =>
    // props.value || undefined сделано потому что прилетает пустая строка
    // Добавить в componentList defaultValue, сейчас у всех пустая строка
    buildValidatorsTree(props.value || undefined, {
      onChange: console.log,
    })
  )

  useEffect(() => {
    // @ts-expect-error because iam stuped
    if (props.value === '') {
      props.onChange(defaultCompValidators)
    }
  }, [])

  function onDragEnd(from: any, to: any) {
    if (!to || !tree) {
      return
    }
    setTree(moveItemOnTree(tree, from, to))
    // props.onChange()
  }

  function addValidator() {
    const id = uniqid()
    props.onChange({
      ...props.value,
      [id]: {
        id,
        name: 'assertString',
        children: [],
      },
    })
  }

  return (
    <div className="ValidatorsTree">
      <IconButton iconProps={{ iconName: 'ChevronRight' }} onClick={addValidator} />
      <AtlasianTree
        tree={tree}
        renderItem={TreeLeaf}
        onDragEnd={onDragEnd}
        offsetPerLevel={PADDING_PER_LEVEL}
        isDragEnabled
        isNestingEnabled
      />
    </div>
  )
}
