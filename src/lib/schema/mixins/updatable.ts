import { CatalogBase, Item, Key } from '../catalog-abstract'
import { AnyConstructor } from '../types'

export const Updatable = <TKey extends Key, TItem extends Item, T extends AnyConstructor<CatalogBase<TKey, TItem>>>(
  base: T
) => {
  class UpdatableMixin extends base {
    private _listeners: ((arg: this) => void)[] = []

    update() {
      this._listeners.forEach((fn) => fn(this))
    }

    addUpdateListener(fn: (arg: this) => void) {
      this._listeners.push(fn)
    }
  }

  return UpdatableMixin as AnyConstructor<UpdatableMixin> & typeof UpdatableMixin & T
}
