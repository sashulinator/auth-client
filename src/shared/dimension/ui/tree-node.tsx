import { RenderItemParams, TreeItem } from '@atlaskit/tree'
import { IButtonStyles, IconButton, Stack } from '@fluentui/react'

import clsx from 'clsx'
import React from 'react'
import { Field } from 'react-final-form'

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
          <div style={{ width: '36px', height: '32px' }} />
        )}
        <Field type="checkbox" name={data.entity.name || ''}>
          {({ input }) => {
            return (
              <div>
                <CheckBox
                  {...input}
                  label={data.entity.title}
                  disabled={!input.value && Boolean(data.disabled)}
                  сonvertFalseToUndefined={true}
                />
              </div>
            )
          }}
        </Field>
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
