import { insert, replace } from '../change-unmutable'
import { ArrayCatalogProps, CatalogAbstract, Entity, RecordCatalogProps } from './catalog-abstract'
import uniqid from 'uniqid'

const ROOT_ID = 'ROOT_ID'

export type TreeEntityRaw = Entity & { children?: [] }
export type TreeEntity = Entity & { children?: []; parentId: string | number }

export type TreeEntityCatalog<T extends TreeEntityRaw = TreeEntityRaw> = { [key: string | number]: T }

export type TreeCatalogProps<TEntity extends TreeEntityRaw> = ArrayCatalogProps<TEntity> | RecordCatalogProps<TEntity>

export class TreeCatalog<TEntity extends TreeEntityRaw> extends CatalogAbstract<TEntity> {
  constructor(...args: TreeCatalogProps<TEntity>) {
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

  public forEach(cb: (entity: TEntity, id: string | number, entities: TreeEntityCatalog<TEntity>) => void): void {
    walk(this.root, this.catalog, cb)
  }

  add(entity: TEntity, parentId: string | number, index = 0) {
    const newParent = this.addChildIdToParent(parentId, this.idKeyValue(entity), index)

    const newCatalog = { ...this.catalog, [this.idKeyValue(newParent)]: newParent, [this.idKeyValue(entity)]: entity }

    this.catalog = newCatalog
  }

  // TODO should we empty children array or leave as it is?
  copy(id: string, uniqKeys: string[] = []): TEntity {
    const newUniqKeys = [this.idKey, ...uniqKeys]
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
  private addChildIdToParent(parentId: string | number, id: string | number, index: number): TEntity {
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

// Private

function walk<TEntity extends TreeEntityRaw>(
  walkEntity: TEntity,
  catalog: TreeEntityCatalog<TEntity>,
  cb: (entity: TEntity, id: string | number, entities: TreeEntityCatalog<TEntity>) => void
) {
  if (walkEntity.children === undefined) {
    return
  }

  for (let index = 0; index < walkEntity.children.length; index++) {
    const id = (walkEntity.children?.[index] as unknown) as string

    const childEntity = catalog[id]

    if (childEntity === undefined) {
      throw new Error('Entity does not exists')
    }

    walk(childEntity, catalog, cb)

    cb(childEntity, id, catalog)
  }
}
