import { CustomComponentNames } from '../model/types'

import { Catalog, Comp, Schema } from '@/shared/schema-drawer'

export default function getIconName(schemas?: Catalog<Schema> | null, comp?: Comp): string {
  if (comp === undefined) {
    return 'Unknown'
  }

  const componentName = schemas?.[comp.compSchemaId]?.componentName || 'Unknown'

  const aliases: Record<string, string> = {
    [CustomComponentNames.JSONEditor]: 'JS',
    [CustomComponentNames.Pivot]: 'BrowserTab',
    [CustomComponentNames.PivotItem]: 'TabOneColumn',
  }

  return aliases[componentName] ?? componentName
}
