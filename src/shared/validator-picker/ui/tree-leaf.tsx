import { IconButton, Stack } from '@fluentui/react'

import { TreeLeafProps } from '../types'
import clsx from 'clsx'
import React from 'react'

// import { ROOT_ID } from '@/constants/common'
import { assertionNameOptions } from '@/shared/draw-comps/lib/assertion-list'
import { Dropdown } from '@/shared/dropdown'
import { buildOptionsFromStringArray } from '@/shared/dropdown/lib/options'

export default function TreeLeaf(props: TreeLeafProps): JSX.Element | null {
  if (props.item.data === undefined) {
    return null
  }

  const { validator } = props.item.data

  // const isRoot = props.item.data.validator.id === ROOT_ID
  const isOperator = validator.name === 'and' || validator.name === 'or'

  return (
    <div
      className={clsx('TreeLeaf')}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      ref={props.provided.innerRef}
    >
      <Stack className="treeLeafContent" horizontal verticalAlign="center">
        <div className="treeLeafBackgroundColor" />
        <div className="treeLeafBorderColor" />
        <IconButton
          className="button"
          iconProps={{ iconName: 'Cancel' }}
          onClick={() => props.item.data?.remove(props.item.id)}
        />
        <Stack className="treeLeafText" horizontal verticalAlign="stretch">
          {isOperator ? (
            <Dropdown
              name="thereCouldBeYourAd"
              styles={{ title: { border: '0px', background: 'transparent' }, root: { width: '100%' } }}
              onChange={(name) => props.item.data?.changeValidator?.(props.item.id, name)}
              value={validator.name}
              options={buildOptionsFromStringArray(['or', 'and'])}
            />
          ) : (
            <Dropdown
              name="thereCouldBeYourAd"
              styles={{ title: { border: '0px', background: 'transparent' }, root: { width: '100%' } }}
              onChange={(name) => props.item.data?.changeValidator?.(props.item.id, name)}
              value={validator.name}
              options={assertionNameOptions}
            />
          )}
        </Stack>
      </Stack>
    </div>
  )
}
