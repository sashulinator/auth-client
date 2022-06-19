// import { applyMixins } from './mixins/apply-mixins'
import { Selectable } from './mixins/selectable'
// import { updatable } from './mixins/updatable'
import { Store } from './store'
import { TreeStore } from './tree-store'

export * from './store-abstract'

export { Store }
export { TreeStore }

export const SelectableTree = Selectable(TreeStore)
