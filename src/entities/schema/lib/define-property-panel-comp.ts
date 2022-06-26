import { assertNotUndefined } from '@savchenko91/schema-validator'

import { CompSchema } from '@/shared/schema-drawer'

export function defineSelectedComp(currentSchema: CompSchema | null, selectedCompIds: string[]) {
  if (selectedCompIds.length > 1) {
    return null
  }

  if (selectedCompIds.length !== 0 && currentSchema) {
    const selectedComp = currentSchema.data[selectedCompIds[0] || '']

    assertNotUndefined(selectedComp)

    return selectedComp
  }

  return null
}
