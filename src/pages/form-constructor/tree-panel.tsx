import Tree, { RenderItemParams, TreeData, TreeDestinationPosition, TreeItem, TreeSourcePosition } from '@atlaskit/tree'
import { ActionButton, Stack } from '@fluentui/react'

import React, { FC, useState } from 'react'
import { useRecoilState } from 'recoil'

import { formSchemaState, selectedCompIdState } from '@/recoil/form-schema'
import { Comp } from '@/types/form-constructor'

const PADDING_PER_LEVEL = 20

const buttonStyles = {
  root: { color: 'var(--themeDark)' },
  rootDisabled: { color: 'var(--themeTertiary)' },
}

const TreePanel: FC = (): JSX.Element => {
  const [selectedCompId, setSelectedCompId] = useRecoilState(selectedCompIdState)
  const [formSchema] = useRecoilState(formSchemaState)

  function selectComponent(key: string) {
    return () => setSelectedCompId(key)
  }

  function buildRootItem(schema: Comp[]): TreeData['items'] {
    return schema?.reduce<Record<string, TreeItem>>((acc, formItem) => {
      const children = formItem?.children?.reduce<string[]>((acc, childId) => {
        acc.push(childId)
        return acc
      }, [])

      acc[formItem.id] = {
        id: formItem.id,
        isExpanded: true,
        ...(children?.length === 0 || children ? { children } : { children: [] }),
        data: formItem,
      }
      return acc
    }, {})
  }

  function buildTree(schema: Comp[]): TreeData {
    const rootId = {
      id: 'rootId',
      isExpanded: true,
      data: 'test',
      children: ['ee4254ef-7878-4243-be68-51ce733b338e'],
    }

    return {
      rootId: rootId.id,
      items: {
        rootId,
        ...buildRootItem(schema),
      },
    }
  }

  function onDragEnd(sourcePosition: TreeSourcePosition, destinationPosition?: TreeDestinationPosition) {
    if (destinationPosition?.index === undefined) {
      return
    }
  }

  const [tree] = useState(() => buildTree(formSchema.schema))

  const renderItem = ({ item, provided }: RenderItemParams) => {
    const isSelected = item.data?.id === selectedCompId
    return (
      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        {/* <span>{getIcon(item, onExpand, onCollapse)}</span> */}
        <ActionButton onClick={selectComponent(item.data.id)} styles={!isSelected ? undefined : buttonStyles}>
          {item.data.name || ''}
        </ActionButton>
      </div>
    )
  }

  return (
    <div className="TreePanel">
      <Stack>
        <Tree
          tree={tree}
          renderItem={renderItem}
          // onExpand={() => {}}
          // onCollapse={() => {}}
          onDragEnd={onDragEnd}
          offsetPerLevel={PADDING_PER_LEVEL}
          isDragEnabled
        />
      </Stack>
    </div>
  )
}

export default TreePanel
