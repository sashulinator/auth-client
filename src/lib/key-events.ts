import { isMac } from '@fluentui/react/lib/Utilities'

interface DummyMouseKeyEvent {
  key?: string
  code?: string
  shiftKey?: boolean
  metaKey?: boolean
  ctrlKey?: boolean
}

export function isEnter(event: DummyMouseKeyEvent): boolean {
  return event.key === 'Enter'
}

export function isCtrl(event: DummyMouseKeyEvent): boolean {
  const controlKeyName = isMac() ? 'metaKey' : 'ctrlKey'
  return !!event?.[controlKeyName]
}

export function isEscape(event: DummyMouseKeyEvent): boolean {
  return event.key === 'Escape'
}

export function isZ(event: DummyMouseKeyEvent): boolean {
  return event.code === 'KeyZ'
}

export function isC(event: DummyMouseKeyEvent): boolean {
  return event.code === 'KeyC'
}

export function isV(event: DummyMouseKeyEvent): boolean {
  return event.code === 'KeyV'
}

export function isBackspace(event: DummyMouseKeyEvent): boolean {
  return event.key === 'Backspace'
}
export function isShift(event: DummyMouseKeyEvent): boolean {
  return !!event.shiftKey
}
