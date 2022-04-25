import Tree, { RenderItemParams, TreeData } from '@atlaskit/tree'
import { ActionButton, Stack } from '@fluentui/react'

import React, { FC, useState } from 'react'
import { useRecoilState } from 'recoil'

import { formSchemaState, selectedSchemaItemIdState } from '@/recoil/form-schema'
import { FormSchemaItem, NormFormSchema } from '@/types/entities'

const PADDING_PER_LEVEL = 20

const buttonStyles = {
  root: { color: 'var(--themeDark)' },
  rootDisabled: { color: 'var(--themeTertiary)' },
}

const TreePanel: FC = (): JSX.Element => {
  const [selectedComponentId, setSelectedComponentId] = useRecoilState(selectedSchemaItemIdState)
  const [formSchema] = useRecoilState(formSchemaState)

  function selectComponent(key: string) {
    return () => setSelectedComponentId(key)
  }

  function buildRootItem(schema: NormFormSchema): TreeData['items'] {
    const formItems = Object.values(schema)

    return formItems?.reduce((acc, formItem) => {
      const children = (formItem?.children as FormSchemaItem[])?.reduce<string[]>((acc, child) => {
        if (child.id) {
          acc.push(child.id)
        }
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

  function buildTree(schema: NormFormSchema): TreeData {
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

  const [tree] = useState(() => buildTree(formSchema))

  const renderItem = ({ item, provided }: RenderItemParams) => {
    const isSelected = item.data?.id === selectedComponentId
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
          // onDragEnd={() => {}}
          offsetPerLevel={PADDING_PER_LEVEL}
          isDragEnabled
        />
      </Stack>
    </div>
  )
}

export default TreePanel
