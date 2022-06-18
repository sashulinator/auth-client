import { insert, replace } from '../change-unmutable'
import { Item, StoreAbstract, StoreData } from './store-abstract'
import uniqid from 'uniqid'

const ROOT_ID = 'ROOT_ID'

export interface TreeItem {
  children?: string[] | null | undefined
  [key: string | number]: any
}

export interface TreeNormItem {
  children?: string[] | null | undefined
  parent?: TreeNormItem
}

export type TreeData<TItem extends Item = TreeItem> = StoreData<TItem & TreeItem>
export type TreeNormData<TItem extends Item = TreeItem> = StoreData<TItem & TreeNormItem>

export class TreeStore<TItem extends TreeItem> extends StoreAbstract<TItem> {
  rootId: string | number
  _data: TreeNormData<TItem>

  constructor(data: StoreData<TItem>, rootId: string, idKey: string | number = 'id') {
    super()
    this._data = TreeStore.normalize(data, rootId, idKey)
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

  public forEach(cb: (entity: TItem, idKeyValue: string | number, data: StoreData<TItem>) => void): void {
    walk(this.root, this.data, this.idKey, cb)
  }

  static normalize<TItem>(data: TreeData<TItem>, rootId: string | number, idKey: string | number): TreeNormData<TItem> {
    const result: TreeNormData<TItem> = {}
    const root = data[rootId]
    const parents: Record<string, string | number> = {}

    console.log('idKey', idKey)

    if (root === undefined) {
      throw new Error('TreeCatalog must contain root component')
    }

    walk(root, data, idKey, (item, idKeyValue) => {
      item.children?.forEach((childIdKeyValue) => (parents[childIdKeyValue] = idKeyValue))

      // console.log('id', idKeyValue, idKey)

      const parent = data[parents[idKeyValue] as string]

      if (parent === undefined && idKeyValue !== rootId) {
        throw new Error(`Some items are missing: ${idKeyValue}`)
      }

      result[idKeyValue] = { ...item, parent }
    })

    return result
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

function walk<TItem extends TreeItem>(
  item: TItem,
  data: StoreData<TItem>,
  idKey: string | number,
  cb: (item: TItem, idKeyValue: string | number, data: StoreData<TItem>) => void
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
