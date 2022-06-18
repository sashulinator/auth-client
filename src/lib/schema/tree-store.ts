import { insert } from '../change-unmutable'
import { Item, Key, StoreAbstract, StoreData } from './store-abstract'

// import uniqid from 'uniqid'

const ROOT_ID = 'ROOT_ID'

export interface TreeItem extends Item {
  children?: string[] | null | undefined // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

export interface TreeNormItem extends TreeItem {
  parentId?: Key
}

export type TreeData<TKey extends Key, TItem extends TreeItem = TreeItem> = StoreData<TKey, TItem>

export type TreeNormData<TKey extends Key, TItem extends TreeItem> = StoreData<TKey, TreeNormItem & TItem>

export class TreeStore<TKey extends Key, TItem extends TreeItem> extends StoreAbstract<TKey, TItem & TreeNormItem> {
  rootId: Key

  constructor(data: StoreData<TKey, TItem>, rootId: Key, idKey: TKey) {
    super(idKey)
    this.data = TreeStore.normalize(data, rootId, idKey)
    this.rootId = rootId
  }

  get root(): TItem {
    const root = this.data[ROOT_ID]

    if (root === undefined) {
      throw new Error('TreeCatalog must contain root component')
    }

    return root
  }

  public forEach(cb: (entity: TItem, idKeyValue: Key, data: StoreData<TKey, TItem>) => void): void {
    walk(this.root, this.data, this.idKey, cb)
  }

  static normalize<TKey extends Key, TItem extends TreeItem>(
    data: TreeData<TKey, TItem>,
    rootId: string | number,
    idKey: string | number
  ): TreeNormData<TKey, TItem> {
    const result: TreeNormData<TKey, TItem> = {}
    const root = data[rootId]
    const parents: Record<string, string | number> = {}

    if (root === undefined) {
      throw new Error('TreeCatalog must contain root component')
    }

    walk(root, data, idKey, (item: TItem, idKeyValue) => {
      const children = item.children?.forEach((childIdKeyValue) => {
        parents[childIdKeyValue] = idKeyValue
      })

      const parent = data[parents[idKeyValue] as string]

      if (parent === undefined && idKeyValue !== rootId) {
        throw new Error(`Some items are missing: ${idKeyValue}`)
      }

      result[idKeyValue] = { ...item, parent, children }
    })

    return result
  }

  add(item: TItem, parentId: string | number, index = 0) {
    const parent = this.get(parentId)

    if (index < 0) {
      throw new Error('Index cannot be less than 0')
    }

    const childLength = parent?.children?.length ?? 0

    if (index > childLength) {
      throw new Error(`Index cannot be more than ${childLength}`)
    }

    const parentClone = { ...parent, children: parent?.children ?? [] }

    const newParentChildren = insert(parentClone.children, index, item)
    const newParent = { ...parentClone, children: newParentChildren }

    const newItem = { ...item, parentId: newParent.parentId }

    this.changeItem(newParent)
    this.changeItem(newItem)
  }

  copy(id: Key): TItem {
    return { ...this.get(id) }
  }

  remove(id: Key) {
    const removeChildrenDeep = (childId: Key) => {
      this.get(childId).children?.forEach(removeChildrenDeep)
      this.removeFromData(childId)
    }

    removeChildrenDeep(id)

    this.removeFromParent(id)
  }

  private removeFromData(id: Key) {
    const dataClone = { ...this.data }
    delete dataClone[id]
    this.data = dataClone
  }

  private removeFromParent(id: Key) {
    const item = this.get(id)
    // undefined if we remove root
    if (item.parentId === undefined) {
      return
    }

    const parent = this.get(item.parentId)
    const newParentChildren = parent.children?.filter((childId) => childId === id)

    if (newParentChildren?.length !== 0) {
      this.changeItem(parent)
      return
    }

    const newParent = { ...parent }
    delete newParent.children
    this.changeItem(newParent)
  }
}

// Private

function walk<TKey extends string | number, TItem extends TreeItem>(
  item: TItem,
  data: StoreData<TKey, TItem>,
  idKey: string | number,
  cb: (item: TItem, idKeyValue: string | number, data: StoreData<TKey, TItem>) => void
) {
  cb(item, item[idKey], data)

  if (item.children === undefined || item.children === null) {
    return
  }

  for (let index = 0; index < item.children.length; index++) {
    const childIdKeyValue = (item.children?.[index] as unknown) as string

    const childItem = data[childIdKeyValue]

    if (childItem === undefined) {
      throw new Error('Entity does not exists')
    }

    walk(childItem, data, idKey, cb)
  }
}
