import { ROOT_ID } from '@/constants/common'
import ROUTES from '@/constants/routes'
import { CompSchema, CompSchemaType, CreateCompSchema } from '@/shared/schema-drawer'

const compSchema: CompSchema | CreateCompSchema | null = ROUTES.FORM_CONSTRUCTOR_EDIT.isCurrent
  ? null
  : {
      // we cannot omit id so let's make it localSchema
      componentName: null,
      title: 'Name',
      type: CompSchemaType.FORM,
      data: {
        [ROOT_ID]: {
          id: ROOT_ID,
          name: 'noname',
          compSchemaId: 'ee4254ef-9099-4289-be68-51ce733b3376',
          title: 'stackRoot',
        },
      },
    }

export default compSchema
