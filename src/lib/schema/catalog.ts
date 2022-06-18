import { CatalogAbstract, CatalogProps, Entity, EntityCatalog } from './catalog-abstract'
import uniqid from 'uniqid'

export class Catalog<TEntity extends Entity> extends CatalogAbstract<TEntity> {
  constructor(...args: CatalogProps<TEntity>) {
    super()

    if (CatalogAbstract.isArrayCatalogProps(args)) {
      const entities = args[0]
      const key = (args[1] || 'id') as string
      this.idKey = key
      this._catalog = CatalogAbstract.arrayToCatalog(entities, key)
    } else {
      const arg1 = args[0]
      this._catalog = arg1
    }
  }

  add(entity: TEntity) {
    const newCatalog = { ...this.catalog, [this.idKeyValue(entity)]: entity }

    this.catalog = newCatalog
  }

  copy(id: string, uniqKeys: string[] = []): TEntity {
    const newUniqKeys = ['id', ...uniqKeys]
    const entity = this.catalog[id]

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

  public forEach(cb: (entity: TEntity, key: string, entities: EntityCatalog<TEntity>) => void) {
    for (let index = 0; index < this.entries.length; index++) {
      const [key, entity] = this.entries[index] as [string, TEntity]

      cb(entity, key, this.catalog)
    }
  }
}
