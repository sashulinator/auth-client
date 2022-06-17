import { assertNotUndefined } from '@savchenko91/schema-validator'

import { removeEntity } from '@/lib/entity-actions'
import { Binding, BindingSchema } from '@/shared/schema-drawer'

export function createRemoveHandler<TUnit extends Binding, TSchema extends BindingSchema<TUnit>>(
  schema: TSchema | undefined,
  defaultSchema: Omit<TSchema, 'catalog'>,
  onChange: (value: TSchema | undefined) => void
) {
  return (id: string | number): void => {
    if (schema?.catalog) {
      const units = removeEntity(id, schema.catalog)
      assertNotUndefined(units)

      // isOnlyRoot?
      if (Object.keys(units).length === 1) {
        onChange(undefined)
      } else {
        const newSchema = schema ?? defaultSchema
        onChange({ ...newSchema, catalog: units })
      }
    }
  }
}
