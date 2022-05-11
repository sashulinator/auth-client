export type Context = {
  formState: unknown
} & Record<string, unknown>

export enum ComponentNames {
  TextField = 'TextField',
  Stack = 'Stack',
}
