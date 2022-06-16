import { ArrayCatalogProps, Catalog, Entity, RecordCatalogProps } from './catalog'

const ROOT_ID = 'ROOT_ID'

type TreeEntity = Entity & { children?: [] }

type TreeCatalogProps<TEntity extends TreeEntity> = ArrayCatalogProps<TEntity> | RecordCatalogProps<TEntity>

export class TreeCatalog<TEntity extends TreeEntity> extends Catalog<TEntity> {
  constructor(...args: TreeCatalogProps<TEntity>) {
    super(...args)
    // seems like it does nothing but it checks whether the root entity exists
    this.root
  }

  get root(): TEntity {
    const root = this.catalog[ROOT_ID]

    if (root === undefined) {
      throw new Error('TreeCatalog must contain root component')
    }

    return root
  }

  public walk(cb: (entity: TEntity) => void): void {
    const ids: string[] = []

    const walk = (walkEntity: TEntity) => {
      if (walkEntity.children === undefined) {
        return
      }

      for (let index = 0; index < walkEntity.children.length; index++) {
        const id = (walkEntity.children?.[index] as unknown) as string

        const childEntity = this.catalog[id]

        if (childEntity === undefined) {
          throw new Error('Entity does not exists')
        }

        walk(childEntity)

        cb(childEntity)

        ids.push(id)
      }
    }

    walk(this.root)

    if (ids.length !== this.keys.length) {
      const orphantsIds = this.keys.filter((id) => !id.includes(id))

      throw new Error(`Entities with ids ${orphantsIds.join(', ')} have no parents`)
    }
  }
}
