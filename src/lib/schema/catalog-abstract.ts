export type Key = string | number

export type Item = { [key: Key]: any }

export type CatalogData<TItem extends Item> = { [key: Key]: TItem }

export interface ICatalogAbstract<TItem extends Item> {
  data: CatalogData<TItem>
  idKey: Key
}

export abstract class CatalogAbstract<TItem extends Item> implements ICatalogAbstract<TItem> {
  private _data: CatalogData<TItem>
  idKey: Key

  constructor(idKey: Key) {
    this._data = {}
    this.idKey = idKey
  }

  get data(): CatalogData<TItem> {
    return this._data
  }

  set data(newCatalog: CatalogData<TItem>) {
    this._data = newCatalog
  }

  get values(): TItem[] {
    return Object.values(this._data)
  }

  get keys(): string[] {
    return Object.keys(this._data)
  }

  get entries(): [string, TItem][] {
    return Object.entries(this._data)
  }

  changeItem(item: TItem) {
    this.data = { ...this.data, [this.idKeyValue(item)]: item }
    return this
  }

  idKeyValue(id: string | number | Item): string | number {
    if (typeof id === 'string' || typeof id === 'number') {
      return (this._data[id] as unknown) as string | number
    } else {
      return id[this.idKey]
    }
  }

  find(id?: string | number): TItem | undefined {
    return this.data[id || '']
  }

  /**
   * If you want to get entity whithout error use "find"
   */
  get(id: string | number): TItem {
    const entity = this.data[id]

    if (entity === undefined) {
      throw new Error(`Entity with id "${id}" does not exists`)
    }

    return entity
  }

  getMany(ids: string[]): CatalogData<TItem> {
    return ids.reduce<CatalogData<TItem>>((acc, id) => {
      acc[id] = this.get(id)

      return acc
    }, {})
  }

  filter(cb: (entity: TItem, key: string, catalog: CatalogData<TItem>) => unknown): CatalogData<TItem> | undefined {
    const result = Object.entries(this.data).reduce<CatalogData<TItem>>((acc, [id, entity]) => {
      if (!cb(entity, id, this.data)) {
        return acc
      }

      acc[this.idKeyValue(id)] = this.get(this.idKeyValue(id))

      return acc
    }, {})

    if (Object.keys(result).length === 0) {
      return undefined
    }

    return result
  }
}
