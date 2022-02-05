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

export function createAPIconstant(entityName: string, actionName: string | number | symbol) {
  return {
    START: `${entityName.toUpperCase()}.${actionName.toString().toUpperCase()}/START`,
    SUCCESS: `${entityName.toUpperCase()}.${actionName.toString().toUpperCase()}/SUCCESS`,
    FAIL: `${entityName.toUpperCase()}.${actionName.toString().toUpperCase()}/FAIL`,
  }
}
