import { Catalog } from './catalog'
import { Entity } from './catalog-abstract'

interface SchemaData<TEntity extends Entity> extends Record<string, any> {
  id: string
  catalog: Record<string, TEntity>
}

export default class SchemaAbstract<TEntity extends Entity> {
  data: Omit<SchemaData<TEntity>, 'catalog'> & { catalog: Catalog<TEntity> }
  onSave?: (schema: SchemaAbstract<TEntity>) => void

  constructor(schema: SchemaData<TEntity>) {
    this.data = {
      ...schema,
      catalog: new Catalog(schema.catalog),
    }
  }
}
