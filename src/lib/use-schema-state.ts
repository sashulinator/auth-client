import { Entity } from './schema/catalog-abstract'
import Schema from './schema/schema-abstract'

export default function useSchemaState<TEntity extends Entity>(schema: Schema<TEntity>) {
  schema.onSave = () => {
    console.log()
  }
}
