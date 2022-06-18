import { insert } from '../change-unmutable'
import { Key, StoreAbstract, StoreData } from './store-abstract'
import uniqid from 'uniqid'

const ROOT_ID = 'ROOT_ID'

export interface TreeItem {
  children?: string[] | null | undefined // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string | number]: any
}

export interface TreeNormItem {
  children?: TreeNormItem[]
  parent?: TreeNormItem
}

export type TreeData<TKey extends Key, TItem extends TreeItem = TreeItem> = StoreData<TKey, TItem & TreeItem>

export type TreeNormData<
  TKey extends Key,
  TItem extends TreeItem,
  TNormItem extends TItem & {
    children?: TNormItem[]
    parent?: TNormItem
  }
> = StoreData<TKey, TNormItem>

export class TreeStore<
  TKey extends Key,
  TItem extends TreeItem,
  TNormItem extends TItem & {
    children?: TNormItem[]
    parent?: TNormItem
  }
> extends StoreAbstract<TKey, TNormItem> {
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

  static normalize<
    TKey extends Key,
    TItem extends TreeItem,
    TNormItem extends TItem & {
      children?: TNormItem[]
      parent?: TNormItem
    }
  >(
    data: TreeData<TKey, TItem>,
    rootId: string | number,
    idKey: string | number
  ): TreeNormData<TKey, TItem, TNormItem> {
    const result: TreeNormData<TKey, TItem, TNormItem> = {}
    const root = data[rootId]
    const parents: Record<string, string | number> = {}

    if (root === undefined) {
      throw new Error('TreeCatalog must contain root component')
    }

    walk(root, data, idKey, (item, idKeyValue) => {
      const children = item.children?.map((childIdKeyValue) => {
        parents[childIdKeyValue] = idKeyValue

        const child = data[childIdKeyValue]

        if (child === undefined) {
          throw new Error(`Some items are missing: ${childIdKeyValue}`)
        }

        return child
      })

      const parent = data[parents[idKeyValue] as string]

      if (parent === undefined && idKeyValue !== rootId) {
        throw new Error(`Some items are missing: ${idKeyValue}`)
      }

      result[idKeyValue] = { ...item, parent, children } as TNormItem
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

    const newItem = ({ ...item, parent: newParent } as unknown) as TNormItem

    this.data = { ...this.data, [this.idKeyValue(newParent)]: newParent, [this.idKeyValue(newItem)]: newItem }
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

  remove(id: string | number) {
    const item = this.get(id)

    const removeChildrenDeep = (itemToRemove: TNormItem) => {
      itemToRemove.children?.forEach(removeChildrenDeep)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [this.idKeyValue(itemToRemove)]: childToRemove, ...newData } = this.data
      this.data = newData
    }

    removeChildrenDeep(item)

    const parent = item?.parent

    // undefined if we remove root
    if (parent === undefined) {
      return
    }

    parent.children?.filter((childItem) => this.idKeyValue(childItem) === id)

    if (parent.children?.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { children, ...newParent } = parent
      this.changeItem(newParent as TNormItem)
    }

    this.changeItem(parent)
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
