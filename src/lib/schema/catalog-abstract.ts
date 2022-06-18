export type Entity = { [key: string | number]: unknown }

export type EntityCatalog<TEntity extends Entity> = { [key: string | number]: TEntity }

export type ArrayCatalogProps<TEntity extends Entity> = [TEntity[], keyof TEntity]
export type RecordCatalogProps<TEntity extends Entity> =
  | [EntityCatalog<TEntity>, keyof TEntity]
  | [EntityCatalog<TEntity>]
export type CatalogProps<TEntity extends Entity> = ArrayCatalogProps<TEntity> | RecordCatalogProps<TEntity>

export abstract class CatalogAbstract<TEntity extends Entity> {
  _catalog: EntityCatalog<TEntity>
  idKey: number | string

  constructor() {
    this._catalog = {}
    this.idKey = 'id'
  }

  static isArrayCatalogProps<TEntity extends Entity>(
    input: CatalogProps<TEntity>
  ): input is ArrayCatalogProps<TEntity> {
    const arg1 = input[0]

    if (Array.isArray(arg1)) {
      return true
    }

    return false
  }

  static arrayToCatalog<TEntity extends Entity>(entities: TEntity[], idKey: string | number): EntityCatalog<TEntity> {
    const ids: (string | number)[] = []
    const catalog: EntityCatalog<TEntity> = {}

    for (let index = 0; index < entities.length; index++) {
      const entity = entities[index] as TEntity

      const idKeyValue = entity[idKey] as number | string

      catalog[idKeyValue] = entity
    }
    //
    const keys = Object.keys(catalog)

    if (ids.length !== keys.length) {
      const orphantsIds = keys.filter((id) => !id.includes(id))

      throw new Error(`Entities with ids ${orphantsIds.join(', ')} have no parents`)
    }
    //
    return catalog
  }

  get catalog(): EntityCatalog<TEntity> {
    return this._catalog
  }

  set catalog(newCatalog: EntityCatalog<TEntity>) {
    this._catalog = newCatalog
  }

  get values(): TEntity[] {
    return Object.values(this._catalog)
  }

  get keys(): string[] {
    return Object.keys(this._catalog)
  }

  get entries(): [string, TEntity][] {
    return Object.entries(this._catalog)
  }

  idKeyValue(id: string | number | TEntity): string | number {
    if (typeof id === 'string' || typeof id === 'number') {
      return (this._catalog[id] as unknown) as string | number
    } else {
      return (id[this.idKey as keyof TEntity] as unknown) as string | number
    }
  }

  /**
   * If you want to get entity whithout error use "this.catalog[id]"
   */
  get(id: string | number): TEntity {
    const entity = this.catalog[id]

    if (entity === undefined) {
      throw new Error(`Entity with id "${id}" does not exists`)
    }

    return entity
  }

  getMany(ids: string[]): EntityCatalog<TEntity> {
    return ids.reduce<EntityCatalog<TEntity>>((acc, id) => {
      acc[id] = this.get(id)

      return acc
    }, {})
  }

  filter(
    cb: (entity: TEntity, key: string, catalog: EntityCatalog<TEntity>) => unknown
  ): EntityCatalog<TEntity> | undefined {
    const result = Object.entries(this.catalog).reduce<EntityCatalog<TEntity>>((acc, [id, entity]) => {
      if (!cb(entity, id, this.catalog)) {
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
