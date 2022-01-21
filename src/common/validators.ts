import { StructureSchema, assertString, primitive } from '@savchenko91/schema-validator'

// TODO add assertMatchPattern
export const idSchemaStructure: StructureSchema = { id: primitive(assertString) }
