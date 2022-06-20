import { CatalogData } from '..'
import { CatalogAbstract, Item } from '../catalog-abstract'
import { AnyConstructor } from '../types'
import cloneDeep from 'lodash.clonedeep'

export const Historable = <TItem extends Item, T extends AnyConstructor<CatalogAbstract<TItem>>>(base: T) => {
  class UpdatableMixin extends base {
    private _stack!: CatalogData<TItem>[]
    private _stackIndex!: number
    limit: number | undefined

    // ЗАПУСТИТСЯ ВМЕСТЕ С КОНСТРУКТОРОМ РОДИТЕЛЯ
    // перехватываем setData родителя и эмитем событие
    setData(newCatalog: CatalogData<TItem>) {
      super.setData(newCatalog)

      // При инициализации все поля undefined
      if (this._stack === undefined) {
        this._stack = [this.data]
        this._stackIndex = 1
      }

      // Если мы откатимся назад по истории то мы хотим начать перезаписывать ее
      // поэтому оставляем все элементы с 0 по текущий
      this._stack = this._stack?.slice(0, this._stackIndex + 1)

      this.onDataChange(newCatalog)
    }

    get data(): CatalogData<TItem> {
      const data = this._stack[this._stackIndex]

      if (data === undefined) {
        throw new Error('Data cannot be undefined')
      }

      return data
    }

    get isNext() {
      if (this._stackIndex > this._stack.length) {
        throw new Error('StackIndex cannot be more than stack')
      }

      return this._stackIndex !== this._stack.length
    }

    get isPrev() {
      if (this._stackIndex < 1) {
        throw new Error('StackIndex cannot be less than 1')
      }

      return this._stackIndex < this._stack.length
    }

    setLimit(limit: number) {
      this.limit = limit
    }

    onDataChange(newCatalog: CatalogData<TItem>) {
      this._stack = this._stack ?? []

      if (this.limit && this.limit === this._stack.length) {
        this._stack.shift()
      }

      this._stack.push(cloneDeep(newCatalog))
      this._stackIndex = this._stack.length - 1
    }

    next() {
      if (!this.isNext) {
        return
      }

      this._stackIndex += 1
    }

    prev() {
      if (!this.isPrev) {
        return
      }

      this._stackIndex -= 1
    }
  }

  return UpdatableMixin as AnyConstructor<UpdatableMixin> & typeof UpdatableMixin & T
}
