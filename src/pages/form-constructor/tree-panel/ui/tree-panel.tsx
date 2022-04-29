import Tree, {
  RenderItemParams,
  TreeDestinationPosition,
  TreeSourcePosition,
  moveItemOnTree,
  mutateTree,
} from '@atlaskit/tree'
import { ActionButton, IconButton, Stack } from '@fluentui/react'

import { paletteModalState } from '../../palette-modal/model'
import { buildTree } from '../lib/build-tree'
import React, { FC, useState } from 'react'
import { useRecoilState } from 'recoil'

import { moveComps as moveComp } from '@/helpers/form-schema-state'
import { FSchemaState, pickedFCompIdState } from '@/recoil/form-schema'

const PADDING_PER_LEVEL = 20

const buttonStyles = {
  root: { color: 'var(--themeDark)' },
  rootDisabled: { color: 'var(--themeTertiary)' },
}

const TreePanel: FC = (): JSX.Element => {
  const [pickedFCompId, setPickedCompId] = useRecoilState(pickedFCompIdState)
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
  const [, setPaletteOpen] = useRecoilState(paletteModalState)
  const [tree, setTree] = useState(() => buildTree(FSchema.comps))

  function pickComp(key: string) {
    return () => setPickedCompId(key)
  }

  function onExpand(itemId: string | number) {
    return () => setTree(mutateTree(tree, itemId, { isExpanded: true }))
  }

  function onCollapse(itemId: string | number) {
    return () => setTree(mutateTree(tree, itemId, { isExpanded: false }))
  }

  function onDragEnd(from: TreeSourcePosition, to?: TreeDestinationPosition) {
    if (!to) {
      return
    }

    const newTree = moveItemOnTree(tree, from, to)
    setTree(newTree)

    const newFormSchema = moveComp(FSchema.comps, from, to)
    setFSchema({ ...FSchema, comps: newFormSchema })
  }

  function ExpandIcon(props: { item: RenderItemParams['item'] }) {
    if (!props.item.hasChildren) {
      return null
    }

    return props.item.isExpanded ? (
      <IconButton iconProps={{ iconName: 'ChevronDown' }} onClick={onCollapse(props.item.id)} />
    ) : (
      <IconButton iconProps={{ iconName: 'ChevronRight' }} onClick={onExpand(props.item.id)} />
    )
  }

  const renderItem = ({ item, provided }: RenderItemParams) => {
    const isSelected = item.data?.id === pickedFCompId

    return (
      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
        <Stack horizontal>
          <Stack className="leafIcons">
            <ExpandIcon item={item} />
          </Stack>
          <ActionButton onClick={pickComp(item.data.id)} styles={!isSelected ? undefined : buttonStyles}>
            {item.data.name || ''}
          </ActionButton>
        </Stack>
      </div>
    )
  }

  return (
    <div className="TreePanel">
      <div className="addCompButton">
        <IconButton iconProps={{ iconName: 'Add' }} onClick={() => setPaletteOpen(true)} />
      </div>
      <Tree
        tree={tree}
        renderItem={renderItem}
        // onExpand={() => {}}
        // onCollapse={() => {}}
        onDragEnd={onDragEnd}
        offsetPerLevel={PADDING_PER_LEVEL}
        isDragEnabled
        isNestingEnabled
      />
    </div>
  )
}

export default TreePanel
