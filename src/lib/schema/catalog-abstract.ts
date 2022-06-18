export type Entity = Record<'id', string> & Record<string, unknown>

export type EntityCatalog<TEntity extends Entity> = Record<string, TEntity>

export type ArrayCatalogProps<TEntity extends Entity> = [TEntity[], keyof TEntity]
export type RecordCatalogProps<TEntity extends Entity> = [EntityCatalog<TEntity>]
export type CatalogProps<TEntity extends Entity> = ArrayCatalogProps<TEntity> | RecordCatalogProps<TEntity>

export abstract class CatalogAbstract<TEntity extends Entity> {
  _catalog: EntityCatalog<TEntity>

  constructor(...args: CatalogProps<TEntity>) {
    if (isArrayCatalogProps<TEntity>(args)) {
      const entities = args[0]
      const key = args[1]

      this._catalog = entities.reduce<EntityCatalog<TEntity>>((acc, entity) => {
        const keyValue = entity[key] as string
        acc[keyValue] = entity
        return acc
      }, {})
    } else {
      const arg1 = args[0]
      this._catalog = arg1
    }
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

  /**
   * If you want to get entity whithout error use "this.catalog[id]"
   */
  get(id: string): TEntity {
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
    const result = Object.entries(this.catalog).reduce<EntityCatalog<TEntity>>((acc, [key, entity]) => {
      if (!cb(entity, key, this.catalog)) {
        return acc
      }

      acc[entity.id.toString()] = this.get(entity.id.toString())

      return acc
    }, {})

    if (Object.keys(result).length === 0) {
      return undefined
    }

    return result
  }
}

// Private

export function isArrayCatalogProps<TEntity extends Entity>(
  input: CatalogProps<TEntity>
): input is ArrayCatalogProps<TEntity> {
  const arg1 = input[0]

  if (Array.isArray(arg1)) {
    return true
  }

  return false
}
