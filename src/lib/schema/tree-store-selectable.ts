import { Key, StoreData } from './store-abstract'
import { TreeItem, TreeNormItem, TreeStore } from './tree-store'

export class TreeStoreSelectable<TKey extends Key, TItem extends TreeItem> extends TreeStore<
  TKey,
  TItem & TreeNormItem
> {
  rootId: Key
  selectedKeys: string[]

  constructor(data: StoreData<TKey, TItem>, rootId: Key, idKey: TKey) {
    super(data, rootId, idKey)
    this.data = TreeStore.normalize(data, rootId, idKey)
    this.rootId = rootId
    this.selectedKeys = []
  }

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
