/**
  По сути является мапингом на базовые компоненты для компсов
  Полезно когда нужно просто отрисовать простенькую форму
*/
import { Norm, Schema, SchemaType } from './types'

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
    type: SchemaType.COMP,
  },
  [BasicComponentsNames.Stack]: {
    componentName: BasicComponentsNames.Stack,
    type: SchemaType.COMP,
  },
  [BasicComponentsNames.Dropdown]: {
    componentName: BasicComponentsNames.Dropdown,
    type: SchemaType.COMP,
  },
  [BasicComponentsNames.Checkbox]: {
    componentName: BasicComponentsNames.Checkbox,
    type: SchemaType.COMP,
  },
} as unknown) as Norm<Schema>
