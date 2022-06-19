import { Key, StoreData } from '../store-abstract'
import { TreeItem, TreeStore } from '../tree-store'
import { AnyConstructor } from '../types'

export const Updatable = <TKey extends Key, TItem extends TreeItem, T extends AnyConstructor<TreeStore<TKey, TItem>>>(
  base: T
) => {
  // @ts-expect-error https://github.com/microsoft/TypeScript/issues/37142
  class UpdatableMixin extends base {
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

  return UpdatableMixin as AnyConstructor<UpdatableMixin> & typeof UpdatableMixin & T
}
