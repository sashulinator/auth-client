import { RenderItemParams, TreeItem } from '@atlaskit/tree'
import { IButtonStyles, IconButton, Stack } from '@fluentui/react'

import clsx from 'clsx'
import React from 'react'

import CheckBox from '@/shared/checkbox/ui/checkbox'
import { Comp } from '@/shared/schema-drawer'
import { AdditionalData } from '@/shared/tree'

const buttonStyles: IButtonStyles = {
  rootHovered: {
    backgroundColor: 'transparent',
  },
  rootPressed: {
    backgroundColor: 'transparent',
  },
}

export interface TreeNodeProps extends RenderItemParams {
  item: Omit<TreeItem, 'data'> & {
    data?: AdditionalData & {
      entity: Comp
      onChange: (name: string) => void
      value: string[]
    }
  }
}

export default function TreeNode(props: TreeNodeProps): JSX.Element | null {
  if (props.item.data === undefined) {
    return null
  }

  const data = props.item.data

  return (
    <div
      className={clsx('BindingTreeLeaf TreeNodeContent')}
      role="button"
      tabIndex={0}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      ref={props.provided.innerRef}
    >
      <Stack className="treeLeafContent" verticalAlign="center" horizontal={true}>
        <div className="treeLeafBorder" />
        {props.item.hasChildren ? (
          <ExpandButton
            id={data.entity.id}
            isExpanded={props.item.isExpanded || false}
            onExpand={props.onExpand}
            onCollapse={props.onCollapse}
          />
        ) : (
          <div style={{ width: '36px', height: '36px' }} />
        )}

        <div>
          <CheckBox
            checked={data.value.includes(data.entity.id)}
            name={data.entity.id}
            label={data.entity.title}
            onChange={() => data.onChange(data.entity.id)}
          />
        </div>
      </Stack>
    </div>
  )
}

type ExpandButtonProps = Pick<TreeNodeProps, 'onCollapse' | 'onExpand'> & { id: string; isExpanded: boolean }

function ExpandButton(props: ExpandButtonProps) {
  function toggle() {
    props.isExpanded ? props.onCollapse(props.id) : props.onExpand(props.id)
  }

  return (
    <IconButton
      styles={buttonStyles}
      className={clsx('button', props.isExpanded && 'turnChildRight90', 'transitionChild01')}
      iconProps={{ iconName: 'ChevronRight' }}
      onClick={toggle}
    />
  )
}
