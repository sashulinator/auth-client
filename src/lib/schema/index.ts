// import { applyMixins } from './mixins/apply-mixins'
import { Catalog } from './catalog'
import { Selectable } from './mixins/selectable'
import { Updatable } from './mixins/updatable'
import { TreeCatalog } from './tree-catalog'

export * from './catalog-abstract'

export { Catalog as Store }
export { TreeCatalog }

export const SelectableTree = Updatable(Selectable(TreeCatalog))
