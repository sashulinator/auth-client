import { CatalogAbstract, CatalogData, Item, Key } from './catalog-abstract'

// import uniqid from 'uniqid'

export class Catalog<TItem extends Item> extends CatalogAbstract<TItem> {
  forEach(cb: (item: TItem, key: Key, entities: CatalogData<TItem>) => void) {
    for (let index = 0; index < this.entries.length; index++) {
      const [key, item] = this.entries[index] as [Key, TItem]

      cb(item, key, this.data)
    }
  }

  add(item: TItem) {
    const newCatalog = { ...this.data, [this.idKeyValue(item)]: item }

    this.setData(newCatalog)
  }

  copy(id: Key): TItem {
    const item = this.get(id)
    return { ...item }
  }

  remove(id: Key) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [id]: removedProperty, ...newData } = this.data
    this.setData(newData)
  }
}
