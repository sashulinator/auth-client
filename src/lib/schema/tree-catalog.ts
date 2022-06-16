import { insert, replace } from '../change-unmutable'
import { ArrayCatalogProps, CatalogBase, Entity, RecordCatalogProps } from './catalog-abstract'
import uniqid from 'uniqid'

const ROOT_ID = 'ROOT_ID'

type TreeEntity = Entity & { children?: [] }

type TreeCatalogProps<TEntity extends TreeEntity> = ArrayCatalogProps<TEntity> | RecordCatalogProps<TEntity>

export class TreeCatalog<TEntity extends TreeEntity> extends CatalogBase<TEntity> {
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

  add(entity: TEntity, parentId: string, index = 0) {
    const newParent = this.addChildIdToParent(parentId, entity.id, index)

    const newCatalog = { ...this.catalog, [newParent.id]: newParent, [entity.id]: entity }

    this.catalog = newCatalog
  }

  // TODO should we empty children array or leave as it is?
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

  // !Without saving to catalog because it can be dangerous!
  private addChildIdToParent(parentId: string, id: string, index: number): TEntity {
    const parent = this.get(parentId)

    if (index < 0) {
      throw new Error('Index cannot be less than 0')
    }

    const childLength = parent?.children?.length ?? 0

    if (index > childLength) {
      throw new Error(`Index cannot be more than ${childLength}`)
    }

    const parentClone = { ...parent, children: parent?.children ?? [] }

    const newChildren = insert(parentClone.children, index, id)
    const newParententity = replace(parentClone, 'children', newChildren)

    return newParententity
  }
}
