import { TreeData, TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import { findEntity, moveEntity } from '@/lib/entity-actions'
import { Binding, BindingSchema, Dictionary } from '@/shared/schema-drawer'

export function createDragEndHandler<TUnit extends Binding, TSchema extends BindingSchema<TUnit>>(
  schema: TSchema | undefined,
  tree: TreeData | undefined,
  data: Dictionary<Binding> | undefined,
  setTree: React.Dispatch<React.SetStateAction<TreeData | undefined>>,
  onChange: (value: TSchema | undefined) => void
) {
  return (from: TreeSourcePosition, to?: TreeDestinationPosition) => {
    if (!to || !tree || !data || to.parentId === 'rootId') {
      return
    }

    const fromParentBinding = findEntity(from.parentId, data)
    const bindingId = fromParentBinding?.children?.[from.index]

    assertNotUndefined(bindingId)

    const binding = findEntity(bindingId, data)

    if (data) {
      const newCatalog = moveEntity(binding, to.parentId, to.index || 0, data)
      onChange({ ...schema, data: newCatalog } as TSchema)
      setTree(moveItemOnTree(tree, from, to))
    }
  }
}
