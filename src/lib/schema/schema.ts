import { Entity } from './catalog-abstract'
import SchemaAbstract from './schema-abstract'

export default class Schema<TEntity extends Entity> extends SchemaAbstract<TEntity> {}
