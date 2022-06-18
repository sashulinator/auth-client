import { Item, StoreAbstract, StoreData } from './store-abstract'
import uniqid from 'uniqid'

export class Store<TItem extends Item> extends StoreAbstract<TItem> {
  constructor(entities: { [key: string | number]: TItem }, idKey: string | number = 'id') {
    super()
    this.data = entities
    this.idKey = idKey
  }

  add(entity: TItem) {
    const newCatalog = { ...this.data, [this.idKeyValue(entity)]: entity }

    this.data = newCatalog
  }

  copy(id: string, uniqKeys: string[] = []): TItem {
    const newUniqKeys = ['id', ...uniqKeys]
    const entity = this.data[id]

    if (entity === undefined) {
      throw new Error('Entity does not exists')
    }

    return newUniqKeys.reduce((acc, keyName) => {
      return {
        ...acc,
        [keyName]: uniqid(),
      }
    }, entity)
  }

  forEach(cb: (entity: TItem, key: string, entities: StoreData<TItem>) => void) {
    for (let index = 0; index < this.entries.length; index++) {
      const [key, entity] = this.entries[index] as [string, TItem]

      cb(entity, key, this.data)
    }
  }
}
