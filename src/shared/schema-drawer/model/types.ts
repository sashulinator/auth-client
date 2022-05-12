import { FormApi } from 'final-form'

export type Context = {
  formState: unknown
  fns: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    changeField: FormApi<any, any>['change']
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formSubscribe: FormApi<any, any>['subscribe']
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } & Record<string, (...args: any[]) => any>
} & Record<string, unknown>

export enum ComponentNames {
  TextField = 'TextField',
  Stack = 'Stack',
}
