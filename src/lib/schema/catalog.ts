import { CatalogBase, Entity, ICatalog } from './catalog-abstract'
import uniqid from 'uniqid'

export class Catalog<TEntity extends Entity> extends CatalogBase<TEntity> implements ICatalog<TEntity> {
  add(entity: TEntity) {
    const newCatalog = { ...this.catalog, [entity.id]: entity }

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

  public forEach(cb: (entity: TEntity, key: string, entities: Record<string, TEntity>) => void) {
    for (let index = 0; index < this.entries.length; index++) {
      const [key, entity] = this.entries[index] as [string, TEntity]

      cb(entity, key, this.catalog)
    }
  }
}
