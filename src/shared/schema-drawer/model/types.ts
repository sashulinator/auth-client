import { FormState } from 'final-form'
import { FormRenderProps } from 'react-final-form'

export type Context = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formState: FormState<any, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formProps: FormRenderProps<any, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fns?: Record<string, (...args: any[]) => any>
} & Record<string, unknown>

export type DrawerContext = Context & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formStatePrev: FormState<any, any>
  eventUnsubscribers: (() => void)[]
}

export enum ComponentNames {
  TextField = 'TextField',
  Stack = 'Stack',
  NumberField = 'NumberField',
}
