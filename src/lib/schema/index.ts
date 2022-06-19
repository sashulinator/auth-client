import { applyMixins } from './mixins/apply-mixins'
import { selectable } from './mixins/selectable'
import { Store } from './store'
import { TreeStore } from './tree-store'

export * from './store-abstract'

export { Store }
export { TreeStore }

export const SelectableTree = applyMixins(TreeStore, [selectable])
