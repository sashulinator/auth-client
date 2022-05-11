import { FormApi } from 'final-form'

export type Context = {
  formState: unknown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fns: { changeField: FormApi<any, any>['change'] } & Record<string, (...args: any[]) => any>
} & Record<string, unknown>

export enum ComponentNames {
  TextField = 'TextField',
  Stack = 'Stack',
}
