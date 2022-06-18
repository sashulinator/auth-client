// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Item = { [key: string | number]: any }

export type StoreData<TItem extends Item> = { [key: string | number]: TItem }

export abstract class StoreAbstract<TItem extends Item> {
  private _data: StoreData<TItem>
  idKey: number | string

  constructor() {
    this._data = {}
    this.idKey = 'id'
  }

  get data(): StoreData<TItem> {
    return this._data
  }

  set data(newCatalog: StoreData<TItem>) {
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

  idKeyValue(id: string | number | TItem): string | number {
    if (typeof id === 'string' || typeof id === 'number') {
      return (this._data[id] as unknown) as string | number
    } else {
      return (id[this.idKey as keyof TItem] as unknown) as string | number
    }
  }

  /**
   * If you want to get entity whithout error use "this.catalog[id]"
   */
  get(id: string | number): TItem {
    const entity = this.data[id]

    if (entity === undefined) {
      throw new Error(`Entity with id "${id}" does not exists`)
    }

    return entity
  }

  getMany(ids: string[]): StoreData<TItem> {
    return ids.reduce<StoreData<TItem>>((acc, id) => {
      acc[id] = this.get(id)

      return acc
    }, {})
  }

  filter(cb: (entity: TItem, key: string, catalog: StoreData<TItem>) => unknown): StoreData<TItem> | undefined {
    const result = Object.entries(this.data).reduce<StoreData<TItem>>((acc, [id, entity]) => {
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
