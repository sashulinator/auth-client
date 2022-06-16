export type Entity = Record<'id', string> & Record<string, any>

export type ArrayCatalogProps<TEntity extends Entity> = [TEntity[], keyof TEntity]
export type RecordCatalogProps<TEntity extends Entity> = [Record<string, TEntity>]
export type CatalogProps<TEntity extends Entity> = ArrayCatalogProps<TEntity> | RecordCatalogProps<TEntity>

export interface ICatalog<TEntity extends Entity> {
  _catalog: Record<string, TEntity>
  catalog: Record<string, TEntity>
  values: TEntity[]
  keys: string[]
  entries: [string, TEntity][]
  get: (id: string) => TEntity
}

export abstract class CatalogBase<TEntity extends Entity> implements ICatalog<TEntity> {
  _catalog: Record<string, TEntity>

  constructor(...args: CatalogProps<TEntity>) {
    if (isArrayCatalogProps<TEntity>(args)) {
      const entities = args[0]
      const key = args[1]

      this._catalog = entities.reduce<Record<string, TEntity>>((acc, entity) => {
        const keyValue = entity[key] as string
        acc[keyValue] = entity
        return acc
      }, {})
    } else {
      const arg1 = args[0]
      this._catalog = arg1
    }
  }

  get catalog(): Record<string, TEntity> {
    return this._catalog
  }

  set catalog(newCatalog: Record<string, TEntity>) {
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

  get(id: string): TEntity {
    const entity = this.catalog[id]

    if (entity === undefined) {
      throw new Error(`Entity with id "${id}" does not exists`)
    }

    return entity
  }

  public walk(cb: (entity: TEntity) => void) {
    for (let index = 0; index < this.values.length; index++) {
      const entity = this.values[index] as TEntity

      cb(entity)
    }
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
