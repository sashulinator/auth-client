import { TreeItem } from '@atlaskit/tree'

import { VALIDATOR_ROOT_ID, defaultCompValidators } from './constants'

import { mapObject } from '@/lib/map-object'

interface AdditionalData {
  onChange: (v: string) => void
}

export function buildValidatorsTree(validators = defaultCompValidators, additionalData: AdditionalData) {
  if (validators === undefined) {
    return undefined
  }

  const rootTreeItem = {
    id: 'rootId',
    isExpanded: true,
    children: [VALIDATOR_ROOT_ID],
  }

  const treeItems = mapObject(
    validators,
    (validator): TreeItem => {
      return {
        ...validator,
        id: validator.id,
        isExpanded: true,
        data: { validator, ...additionalData },
        children: validator.children || [],
        hasChildren: validator.children !== undefined,
      }
    }
  )

  const items = { rootId: rootTreeItem, ...treeItems }

  return {
    rootId: rootTreeItem.id,
    items,
  }
}
