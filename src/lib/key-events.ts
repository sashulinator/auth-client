import { isMac } from '@fluentui/react/lib/Utilities'

export function isEnter(e: React.KeyboardEvent<HTMLElement>): boolean {
  return e.key === 'Enter'
}

export function isCtrl(e: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>): boolean {
  const controlKeyName = isMac() ? 'metaKey' : 'ctrlKey'
  return e[controlKeyName]
}
