import { assertNotUndefined, assertString } from '@savchenko91/schema-validator/dist/assertions'
import { ServerError } from 'src/utils/errors'
import { createStructureValidator } from '@savchenko91/schema-validator/dist/structure-validators'
import { StructureSchema } from '@savchenko91/schema-validator/dist/types'
import { validate } from '@savchenko91/schema-validator/dist/validate'

export const throwError = (name: string) =>
  createStructureValidator(({ errorTree }) => {
    if (errorTree) {
      throw new ServerError({
        message: 'Validation error',
        code: 'validation',
        errors: errorTree,
        status: 401,
      })
    }

    return undefined
  }, name)

// TODO add assertMatchPattern
export const idSchemaStructure: StructureSchema = { id: validate([assertNotUndefined, assertString]) }
