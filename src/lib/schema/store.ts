import { Item, StoreAbstract, StoreData } from './store-abstract'
import uniqid from 'uniqid'

export class Store<TItem extends Item> extends StoreAbstract<TItem> {
  constructor(data: { [key: string | number]: TItem }, idKey: string | number = 'id') {
    super()
    this.data = data
    this.idKey = idKey
  }

  forEach(cb: (item: TItem, key: string, entities: StoreData<TItem>) => void) {
    for (let index = 0; index < this.entries.length; index++) {
      const [key, item] = this.entries[index] as [string, TItem]

      cb(item, key, this.data)
    }
  }

  add(item: TItem) {
    const newCatalog = { ...this.data, [this.idKeyValue(item)]: item }

    this.data = newCatalog
  }

  copy(id: string, uniqKeys: string[] = []): TItem {
    const newUniqKeys = ['id', ...uniqKeys]
    const item = this.data[id]

    if (item === undefined) {
      throw new Error('Entity does not exists')
    }

    return newUniqKeys.reduce((acc, keyName) => {
      return {
        ...acc,
        [keyName]: uniqid(),
      }
    }, item)
  }

  remove(itemId: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [itemId]: removedProperty, ...newData } = this.data
    this._data = newData
  }
}
