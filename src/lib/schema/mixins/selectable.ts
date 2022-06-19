import { Key } from '../catalog-abstract'
import { TreeCatalog, TreeItem } from '../tree-catalog'
import { AnyConstructor } from '../types'

export const Selectable = <TItem extends TreeItem, T extends AnyConstructor<TreeCatalog<TItem>>>(base: T) => {
  class SelectableMixin extends base {
    selectedKeys: string[] = []

    remove(id: Key): this {
      const position = this.getPosition(id)
      const positionIndex = position?.index ?? 0
      // We want to select smth after removing only if we have one selection
      const isOnlySelectedKey = this.selectedKeys.length === 1

      const parent = this.find(position?.parentId)
      const siblingId = this.findChild(parent?.[this.idKey], positionIndex - 1 || 0)

      if (isOnlySelectedKey && this.selectedKeys[0] !== id) {
        super.remove(id)

        return this
      }

      if (siblingId) {
        this.selectedKeys = [siblingId]
      } else {
        this.selectedKeys = []
      }

      super.remove(id)

      return this
    }
  }

  return SelectableMixin as AnyConstructor<SelectableMixin> & typeof SelectableMixin & T
}
