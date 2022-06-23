import { Catalog } from '@/shared/schema-drawer'

interface TreeItem extends Record<string, any> {
  id: string
  children?: string[]
}

export function walk<TItem extends TreeItem>(
  item: TItem,
  data: Catalog<TItem>,
  idKey: string | number,
  cb: (item: TItem, idKeyValue: string | number, data: Catalog<TItem>, parentId: string) => void,
  parentId = ''
) {
  cb(item, item[idKey], data, parentId)

  if (item.children === undefined || item.children === null) {
    return
  }

  for (let index = 0; index < item.children.length; index++) {
    const childIdKeyValue = (item.children?.[index] as unknown) as string

    const childItem = data[childIdKeyValue]

    if (childItem === undefined) {
      throw new Error('Entity does not exists')
    }

    walk(childItem, data, idKey, cb, item.id)
  }
}
