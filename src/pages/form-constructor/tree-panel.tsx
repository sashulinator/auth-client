import Tree, { RenderItemParams, TreeData, TreeDestinationPosition, TreeItem, TreeSourcePosition } from '@atlaskit/tree'
import { ActionButton, IconButton, Modal, PrimaryButton, Stack } from '@fluentui/react'

import React, { FC } from 'react'
import { useRecoilState } from 'recoil'

import { ROOT_COMP_ID } from '@/constants/common'
import { addCompToParent, buildNewComp, findParentId, moveComps as moveComp } from '@/helpers/form-schema-state'
import { FSchemaState, pickedFCompIdState } from '@/recoil/form-schema'
import { Norm } from '@/types/entities'
import { Comp } from '@/types/form-constructor'
import useBoolean from '@/utils/use-boolean'

const PADDING_PER_LEVEL = 20

const buttonStyles = {
  root: { color: 'var(--themeDark)' },
  rootDisabled: { color: 'var(--themeTertiary)' },
}

const TreePanel: FC = (): JSX.Element => {
  const [pickedFCompId, setPickedCompId] = useRecoilState(pickedFCompIdState)
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)

  const [isPalleteModalOpen, openPalleteModal, closePalleteModal] = useBoolean(false)

  function pickComp(key: string) {
    return () => setPickedCompId(key)
  }

  function buildRootItem(comps: Norm<Comp>): TreeData['items'] {
    return Object.values(comps)?.reduce<Record<string, TreeItem>>((acc, comp) => {
      const children = comp?.childCompIds?.reduce<string[]>((acc, childId) => {
        acc.push(childId)
        return acc
      }, [])

      acc[comp.id] = {
        id: comp.id,
        isExpanded: true,
        ...(children?.length === 0 || children ? { children } : { children: [] }),
        data: comp,
      }
      return acc
    }, {})
  }

  function buildTree(comps: Norm<Comp>): TreeData {
    const rootId = {
      id: 'rootId',
      isExpanded: true,
      data: 'test',
      children: [ROOT_COMP_ID],
    }

    return {
      rootId: rootId.id,
      items: {
        rootId,
        ...buildRootItem(comps),
      },
    }
  }

  function onDragEnd(from: TreeSourcePosition, to?: TreeDestinationPosition) {
    const newFormSchema = moveComp(FSchema.comps, from, to)
    setFSchema({ ...FSchema, comps: newFormSchema })
  }

  const renderItem = ({ item, provided }: RenderItemParams) => {
    const isSelected = item.data?.id === pickedFCompId
    return (
      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        {/* <span>{getIcon(item, onExpand, onCollapse)}</span> */}
        <ActionButton onClick={pickComp(item.data.id)} styles={!isSelected ? undefined : buttonStyles}>
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
      <Modal titleAriaId={'Add comp'} isOpen={isPalleteModalOpen} onDismiss={closePalleteModal} isBlocking={false}>
        <PrimaryButton
          onClick={() => {
            const newFormSchema = addCompToParent(
              pickedFCompId ? findParentId(pickedFCompId, FSchema.comps) : 'stackRootId',
              0,
              buildNewComp('TextInput'),
              FSchema.comps
            )

            setFSchema({ ...FSchema, comps: newFormSchema })

            closePalleteModal()
          }}
        >
          TextInput
        </PrimaryButton>
      </Modal>
      <Stack>
        <Tree
          tree={buildTree(FSchema.comps)}
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
