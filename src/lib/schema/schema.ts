import { CatalogData, Item, Key } from './catalog-abstract'
import { TreeCatalog } from './tree-catalog'

export class Schema<TItem extends Item, T> extends TreeCatalog<TItem> {
  schema: T

  constructor(data: CatalogData<TItem>, idkey: Key, rootId: Key, schema: T) {
    super(data, idkey, rootId)
    this.setData(data)
    this.schema = schema
  }
}
