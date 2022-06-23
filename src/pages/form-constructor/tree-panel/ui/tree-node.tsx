import { IButtonStyles, Icon, IconButton, Stack, Text } from '@fluentui/react'

import { TreeLeafProps } from '../types'
import clsx from 'clsx'
import React, { memo } from 'react'
import { useRecoilState } from 'recoil'

import componentList from '@/constants/component-list'
import { schemasState, selectedCompIdsState } from '@/entities/schema'
import { Comp } from '@/shared/schema-drawer'

const buttonStyles: IButtonStyles = {
  rootHovered: {
    backgroundColor: 'transparent',
  },
  rootPressed: {
    backgroundColor: 'transparent',
  },
}

interface TreeNodeContentProps extends Pick<TreeLeafProps, 'onCollapse' | 'onExpand'> {
  isSelected: boolean
  isExpandButton: boolean
  iconName: string
  title: string
  isExpanded: boolean
  id: string
  onItemClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, itemId: string) => void
}

const TreeNodeContent = memo(function TreeNodeContent(props: TreeNodeContentProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      role="button"
      tabIndex={0}
      className={clsx('NewTreeLeaf', props.isSelected && 'isSelected', props.isExpandButton && 'isExpandButton')}
      onClick={(e) => {
        console.log('onItemClick', props.id, props.onItemClick)

        props.onItemClick?.(e, props.id)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(document as any)?.activeElement?.blur()
      }}
    >
      <Stack className="treeLeafContent" horizontal verticalAlign="center">
        <div className="treeLeafBorder" />
        {props.isExpandButton ? (
          <ExpandButton
            id={props.id}
            isExpanded={props.isExpanded}
            onExpand={props.onExpand}
            onCollapse={props.onCollapse}
          />
        ) : (
          <div style={{ width: '44px', height: '32px' }} />
        )}

        <Text
          as="div"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ;(document as any)?.activeElement?.blur()
          }}
          className={clsx('treeLeafText')}
        >
          <Icon iconName={props.iconName} style={{ marginRight: '8px' }} />
          <div
            dangerouslySetInnerHTML={{
              __html: props.title,
            }}
          ></div>
        </Text>
      </Stack>
    </div>
  )
})

function OptimizationLayer(props: TreeLeafProps) {
  const [selectedCompIds] = useRecoilState(selectedCompIdsState)
  const [schemas] = useRecoilState(schemasState)
  const schema = schemas?.[props.item.data?.comp.compSchemaId || '']
  const isSelected = selectedCompIds.includes(props.item.data?.comp.id || '')
  const isExpandButton = !!props.item.hasChildren

  const iconName = componentList[schema?.componentName || '']?.iconName || 'Unknown'
  const comp = props.item.data?.comp as Comp

  const isOneOfMultipleDragging =
    props.snapshot.isDragging && isSelected && props.item.data && selectedCompIds.length > 1

  function onItemClick(e: React.MouseEvent<HTMLElement, MouseEvent>, id: string) {
    props.item.data?.onItemClick(e, id, selectedCompIds)
  }

  return (
    <TreeNodeContent
      key={comp.id}
      id={comp.id}
      isExpandButton={isExpandButton}
      onCollapse={props.onCollapse}
      onExpand={props.onExpand}
      isSelected={isSelected}
      onItemClick={onItemClick}
      isExpanded={!!props.item.isExpanded}
      iconName={iconName}
      title={isOneOfMultipleDragging ? `multiple ${selectedCompIds.length || ''}` : comp.title}
    />
  )
}

export default function TreeNode(props: TreeLeafProps): JSX.Element {
  return (
    <div
      role="button"
      tabIndex={0}
      data-comp-id={props.item.id}
      onMouseOver={() => props.item.data?.onMouseOver?.(props.item.id)}
      // onMouseLeave={() => props.item.data?.onMouseLeave?.(props.item.id)}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      onFocus={(e) => {
        props.provided.dragHandleProps.onFocus(e)
        // props.item.data?.onFocus?.(props.item.id)
      }}
      onBlur={(e) => {
        props.provided.dragHandleProps.onBlur(e)
        // props.item.data?.onBlur?.(props.item.id)
      }}
      onKeyDown={(e) => {
        props.provided.dragHandleProps.onKeyDown(e)
        props.item.data?.onKeyDown?.(e, props.item.id)
      }}
      ref={props.provided.innerRef}
    >
      <OptimizationLayer {...props} />
    </div>
  )
}

type ExpandButtonProps = Pick<TreeLeafProps, 'onCollapse' | 'onExpand'> & { id: string; isExpanded: boolean }

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
