import Tree, { RenderItemParams, TreeData, TreeDestinationPosition, TreeItem, TreeSourcePosition } from '@atlaskit/tree'
import { ActionButton, IconButton, Modal, PrimaryButton, Stack } from '@fluentui/react'

import React, { FC } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { addCompToParent, buildNewComp, findParentId, moveComps as moveComp } from '@/helpers/form-schema-state'
import { formSchemaState, normFCompsState, pickedFCompIdState } from '@/recoil/form-schema'
import { Comp } from '@/types/form-constructor'
import useBoolean from '@/utils/use-boolean'

const PADDING_PER_LEVEL = 20

const buttonStyles = {
  root: { color: 'var(--themeDark)' },
  rootDisabled: { color: 'var(--themeTertiary)' },
}

const TreePanel: FC = (): JSX.Element => {
  const [selectedCompId, setSelectedCompId] = useRecoilState(pickedFCompIdState)
  const [formSchema, setFormSchema] = useRecoilState(formSchemaState)
  const [isPallereModalOpen, openPalleteModal, closePalleteModal] = useBoolean(false)
  const normFComps = useRecoilValue(normFCompsState)

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
    const newFormSchema = moveComp(formSchema.schema, normFComps, from, to)
    setFormSchema({ ...formSchema, schema: newFormSchema })
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
      <div className="addCompButton">
        <IconButton iconProps={{ iconName: 'Add' }} onClick={openPalleteModal} />
      </div>
      <Modal titleAriaId={'Add comp'} isOpen={isPallereModalOpen} onDismiss={closePalleteModal} isBlocking={false}>
        <PrimaryButton
          onClick={() => {
            const newFormSchema = addCompToParent(
              selectedCompId ? findParentId(selectedCompId, formSchema.schema) : 'stackRootId',
              0,
              buildNewComp('TextInput'),
              normFComps
            )
            setFormSchema({ ...formSchema, schema: newFormSchema })

            closePalleteModal()
          }}
        >
          TextInput
        </PrimaryButton>
      </Modal>
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
