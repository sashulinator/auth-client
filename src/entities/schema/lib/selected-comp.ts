import { assertNotUndefined } from '@savchenko91/schema-validator'

import { Schema } from '@/common/types'

export function getSelectedComp(currentSchema: Schema | null, selectedCompIds: string[]) {
  if (selectedCompIds.length > 1) {
    return null
  }

  if (selectedCompIds.length !== 0 && currentSchema) {
    const pickedFComp = currentSchema.comps[selectedCompIds[0] || '']

    assertNotUndefined(pickedFComp)

    return pickedFComp
  }

  return null
}
