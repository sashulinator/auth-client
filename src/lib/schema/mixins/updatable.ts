import { AnyConstructor } from '../types'

export const Updatable = <T extends AnyConstructor>(base: T) => {
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
