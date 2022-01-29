import { StageActionTypes } from '@savchenko91/rc-redux-api-mw'

export function createAPIconstants<Args extends string[]>(
  entityName: string,
  ...actionNames: Args
): Record<Uppercase<Args[number]>, StageActionTypes> {
  return actionNames.reduce<Record<string, StageActionTypes>>((acc, actionName) => {
    acc[actionName.toUpperCase()] = createAPIconstant(entityName, actionName)
    return acc
  }, {})
}

export function createAPIconstant(entityName: string, actionName: string) {
  return {
    START: `${entityName.toUpperCase()}.${actionName.toUpperCase()}/START`,
    SUCCESS: `${entityName.toUpperCase()}.${actionName.toUpperCase()}/SUCCESS`,
    FAIL: `${entityName.toUpperCase()}.${actionName.toUpperCase()}/FAIL`,
  }
}
