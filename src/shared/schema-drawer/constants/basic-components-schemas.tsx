/**
  По сути является мапингом на базовые компоненты для компсов
  Полезно когда нужно просто отрисовать простенькую форму
*/
import { CompSchema, CompSchemaType, Dictionary } from '../model/types'

export enum BasicComponentsNames {
  TextField = 'TextField',
  Stack = 'Stack',
  NumberField = 'NumberField',
  Dropdown = 'Dropdown',
  Checkbox = 'Checkbox',
}

export const basicComponentsSchemas = ({
  [BasicComponentsNames.TextField]: {
    componentName: BasicComponentsNames.TextField,
    type: CompSchemaType.COMP,
  },
  [BasicComponentsNames.Stack]: {
    componentName: BasicComponentsNames.Stack,
    type: CompSchemaType.COMP,
  },
  [BasicComponentsNames.Dropdown]: {
    componentName: BasicComponentsNames.Dropdown,
    type: CompSchemaType.COMP,
  },
  [BasicComponentsNames.Checkbox]: {
    componentName: BasicComponentsNames.Checkbox,
    type: CompSchemaType.COMP,
  },
} as unknown) as Dictionary<CompSchema>
