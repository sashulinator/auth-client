import { insert } from '../change-unmutable'
import { CatalogAbstract, CatalogData, Item, Key } from './catalog-abstract'

// import uniqid from 'uniqid'

const ROOT_ID = 'ROOT_ID'

export interface TreeItem extends Item {
  children?: string[] | null | undefined // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

export interface TreeNormItem extends TreeItem {
  parentId?: Key
}

export type TreeData<TItem extends TreeItem = TreeItem> = CatalogData<TItem>

export type TreeNormData<TItem extends TreeItem> = CatalogData<TreeNormItem & TItem>

export class TreeCatalog<TItem extends TreeItem> extends CatalogAbstract<TItem & TreeNormItem> {
  rootId: Key

  constructor(data: CatalogData<TItem>, idKey: Key, rootId: Key) {
    super(idKey)
    this.data = TreeCatalog.normalize(data, rootId, idKey)
    this.rootId = rootId
  }

  get root(): TItem {
    const root = this.data[ROOT_ID]

    if (root === undefined) {
      throw new Error('TreeCatalog must contain root component')
    }

    return root
  }

  public forEach(cb: (entity: TItem, idKeyValue: Key, data: CatalogData<TItem>) => void): void {
    walk(this.root, this.data, this.idKey, cb)
  }

  static normalize<TItem extends TreeItem>(
    data: TreeData<TItem>,
    rootId: string | number,
    idKey: string | number
  ): TreeNormData<TItem> {
    const result: TreeNormData<TItem> = {}
    const root = data[rootId]
    const parents: Record<string, string | number> = {}

    if (root === undefined) {
      throw new Error('TreeCatalog must contain root component')
    }

    walk(root, data, idKey, (item: TItem, idKeyValue) => {
      item.children?.forEach((childIdKeyValue) => {
        parents[childIdKeyValue] = idKeyValue
      })

      const parentId = data[parents[idKeyValue] as string]?.[idKey]

      if (parentId === undefined && idKeyValue !== rootId) {
        throw new Error(`Some items are missing: ${idKeyValue}`)
      }

      result[idKeyValue] = { ...item, parentId }
    })

    return result
  }

  add(itemId: Key, parentId: Key, index = 0) {
    const item = this.get(itemId)
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

  move(itemId: Key, newParentId: Key, index = 0) {
    this.removeFromParent(itemId)
    this.add(itemId, newParentId, index)
  }

  remove(id: Key) {
    this.removeFromParent(id)

    const removeChildrenDeep = (childId: Key) => {
      this.get(childId).children?.forEach(removeChildrenDeep)
      this.removeFromData(childId)
    }

    removeChildrenDeep(id)

    return this
  }

  findChild(id?: Key, index = 0) {
    const parent = this.find(id)
    return parent?.children?.[index]
  }

  getPosition(id: Key): { index: number; parentId: Key } | undefined {
    const item = this.get(id)
    console.log('item', item)

    const parent = this.data[item.parentId || '']

    if (parent === undefined) {
      return undefined
    }

    if (this.idKeyValue(item) === this.rootId) {
      return { index: 0, parentId: this.rootId }
    }

    const index = parent.children?.reduce<number | undefined>(
      (acc, childId, i) => (childId === id ? i : acc),
      undefined
    )

    if (index === undefined) {
      throw new Error('Something went wrong...')
    }

    return {
      index,
      parentId: parent.id,
    }
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

    const newParentChildren = parent.children?.filter((childId) => childId !== id)

    if (newParentChildren?.length === 0) {
      const newParent = { ...parent }
      delete newParent.children
      this.changeItem(newParent)
      return
    }

    this.changeItem({ ...parent, children: newParentChildren })
  }
}

// Private

function walk<TItem extends TreeItem>(
  item: TItem,
  data: CatalogData<TItem>,
  idKey: string | number,
  cb: (item: TItem, idKeyValue: string | number, data: CatalogData<TItem>) => void
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
