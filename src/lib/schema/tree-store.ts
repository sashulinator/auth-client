import { insert, replace } from '../change-unmutable'
import { Item, StoreAbstract, StoreData } from './store-abstract'
import uniqid from 'uniqid'

const ROOT_ID = 'ROOT_ID'

export type TreeStoreDataItem<TItem extends Item = Item> = TItem & { children?: string[] | null | undefined }
export type TreeStoreItem<TItem extends Item = Item> = TItem & {
  children?: string[] | null | undefined
  parentId: string | number
}

export class TreeStore<TItem extends TreeStoreDataItem> extends StoreAbstract<TItem> {
  rootId: string | number

  constructor(data: { [key: string | number]: TItem }, rootId: string, idKey: string | number = 'id') {
    super()
    this._data = data
    this.rootId = rootId
    this.idKey = idKey
  }

  get root(): TItem {
    const root = this.data[ROOT_ID]

    if (root === undefined) {
      throw new Error('TreeCatalog must contain root component')
    }

    return root
  }

  public forEach(cb: (entity: TItem, id: string | number, data: StoreData<TItem>) => void): void {
    walk(this.root, this.data, cb)
  }

  add(entity: TItem, parentId: string | number, index = 0) {
    const newParent = this.addChildIdToParent(parentId, this.idKeyValue(entity), index)

    const newCatalog = { ...this.data, [this.idKeyValue(newParent)]: newParent, [this.idKeyValue(entity)]: entity }

    this.data = newCatalog
  }

  // TODO should we empty children array or leave as it is?
  copy(id: string, uniqKeys: string[] = []): TItem {
    const newUniqKeys = [this.idKey, ...uniqKeys]
    const entity = this.data[id]

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

  // !Without saving to data because it can be dangerous!
  private addChildIdToParent(parentId: string | number, id: string | number, index: number): TItem {
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

function walk<TItem extends TreeStoreDataItem>(
  walkEntity: TItem,
  data: TreeStoreDataItem,
  cb: (entity: TItem, id: string | number, data: StoreData<TItem>) => void
) {
  if (walkEntity.children === undefined || walkEntity.children === null) {
    return
  }

  for (let index = 0; index < walkEntity.children.length; index++) {
    const id = (walkEntity.children?.[index] as unknown) as string

    const childEntity = data[id]

    if (childEntity === undefined) {
      throw new Error('Entity does not exists')
    }

    walk(childEntity, data, cb)

    cb(childEntity, id, data)
  }
}
