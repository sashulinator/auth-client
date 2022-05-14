import { TreeItem } from '@atlaskit/tree'

import { AdditionalData } from '../types'

import { ROOT_ID } from '@/constants/common'
import { CompValidator, Norm } from '@/entities/schema'
import { mapObject } from '@/lib/map-object'

export default function buildTree(validators: Norm<CompValidator> | undefined, additionalData: AdditionalData) {
  if (validators === undefined) {
    return undefined
  }

  const items = mapObject(
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

  return {
    rootId: ROOT_ID,
    items,
  }
}
