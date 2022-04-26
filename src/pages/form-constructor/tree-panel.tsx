import Tree, { RenderItemParams, TreeData, TreeDestinationPosition, TreeItem, TreeSourcePosition } from '@atlaskit/tree'
import { ActionButton, Stack } from '@fluentui/react'

import React, { FC } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { addCompToParent, removeCompFromParent } from '@/helpers/form-schema-state'
import { formSchemaState, normFormSchemaState, selectedCompIdState } from '@/recoil/form-schema'
import { Comp } from '@/types/form-constructor'
import { replace } from '@/utils/change-unmutable'
import { normalizeWithIndex } from '@/utils/normalize'

const PADDING_PER_LEVEL = 20

const buttonStyles = {
  root: { color: 'var(--themeDark)' },
  rootDisabled: { color: 'var(--themeTertiary)' },
}

const TreePanel: FC = (): JSX.Element => {
  const [selectedCompId, setSelectedCompId] = useRecoilState(selectedCompIdState)
  const [formSchema, setFormSchema] = useRecoilState(formSchemaState)
  const normFormSchema = useRecoilValue(normFormSchemaState)

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
      children: ['stackRootId'],
    }

    return {
      rootId: rootId.id,
      items: {
        rootId,
        ...buildRootItem(schema),
      },
    }
  }

  function onDragEnd(from: TreeSourcePosition, to?: TreeDestinationPosition) {
    if (to?.index === undefined) {
      return
    }

    const fromParentNormComp = normFormSchema.schema[from.parentId]
    const currentCompId = fromParentNormComp?.children?.[from.index] ?? ''

    if (currentCompId === undefined) {
      throw new Error('Systed error')
    }

    const newFromParentComp = removeCompFromParent(from.parentId, currentCompId, from.index, normFormSchema.schema)
    const newFromSchema = replace(formSchema.schema, fromParentNormComp?.indexInArray ?? 0, newFromParentComp)
    const newNormFormSchema = normalizeWithIndex(newFromSchema)

    const toParentNormComp = normFormSchema.schema[to.parentId]
    const newToParentComp = addCompToParent(to.parentId, currentCompId, to.index, newNormFormSchema)
    const newToSchema = replace(newFromSchema, toParentNormComp?.indexInArray ?? 0, newToParentComp)

    setFormSchema({ ...formSchema, schema: newToSchema })
  }

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
          tree={buildTree(formSchema.schema)}
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
