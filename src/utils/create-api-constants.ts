import { StageActionTypes } from '@savchenko91/rc-redux-api-mw'

export function createAPIconstants<Args extends string[]>(
  entityName: string,
  ...actionNames: Args
): Record<Uppercase<Args[number]>, StageActionTypes> {
  return actionNames.reduce<Record<string, StageActionTypes>>(
    (acc, actionName) => {
      acc[actionName.toUpperCase()] = {
        START: `${entityName.toUpperCase()}.${actionName.toUpperCase()}/START`,
        SUCCESS: `${entityName.toUpperCase()}.${actionName.toUpperCase()}/SUCCESS`,
        FAIL: `${entityName.toUpperCase()}.${actionName.toUpperCase()}/FAIL`,
      }
      return acc
    },
    {}
  )
}
