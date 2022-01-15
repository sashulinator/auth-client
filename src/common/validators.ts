import { assertNotUndefined, assertString } from '@savchenko91/schema-validator/dist/assertions'
import { StructureSchema } from '@savchenko91/schema-validator/dist/types'
import { validate } from '@savchenko91/schema-validator/dist/validate'

// TODO add assertMatchPattern
export const idSchemaStructure: StructureSchema = { id: validate([assertNotUndefined, assertString]) }
