import { Item, Key, StoreData } from '../store-abstract'
import { TreeItem, TreeStore } from '../tree-store'
import { GConstructor } from '../types'

export function updatable<TBase extends GConstructor<TreeStore<Key, Item>>>(Base: TBase) {
  // @ts-expect-error https://github.com/microsoft/TypeScript/issues/37142
  return class TreeStoreUpdatable<TKey extends Key, TItem extends TreeItem> extends Base {
    private _listeners: ((arg: this) => void)[]

    constructor(data: StoreData<TKey, TItem>, rootId: Key, idKey: TKey) {
      super(data, rootId, idKey)
      this._listeners = []
    }

    update() {
      this._listeners.forEach((fn) => fn(this))
    }

    addUpdateListener(fn: (arg: this) => void) {
      this._listeners.push(fn)
    }
  }
}
