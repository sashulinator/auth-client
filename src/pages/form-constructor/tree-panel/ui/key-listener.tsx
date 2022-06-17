import { useEffect } from 'react'

import { isBackspace, isC, isCtrl, isEscape, isShift, isV, isZ } from '@/lib/key-events'
import { CompSchema } from '@/shared/schema-drawer'

interface KeyListenerProps {
  schema: CompSchema
  selectedCompIds: string[]
  // TODO rename to toggleSelectedComp?
  selectAndUnselectComp: (compId: string | string[]) => void
  removeSelectedComps: () => void
  pasteFromClipboard: () => void
  copyToClipboard: () => void
  undo: () => void
  redo: () => void
  isFocused: boolean
}

export default function KeyListener(props: KeyListenerProps): null {
  useEffect(main, [props.selectedCompIds, props.schema, props.isFocused])

  function main() {
    function action(event: KeyboardEvent): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any

      if (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document?.activeElement as any)?.type === 'text' ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document?.activeElement as any)?.type === 'number' ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document?.activeElement as any)?.type === 'textarea'
      ) {
        return
      }

      if (isEscape(event)) {
        props.selectAndUnselectComp([])
      }

      if (!props.isFocused) {
        return
      }

      if (isBackspace(event)) {
        props.removeSelectedComps()
      } else if (isCtrl(event) && isZ(event) && !isShift(event)) {
        props.undo()
      } else if (isCtrl(event) && isZ(event) && isShift(event)) {
        props.redo()
      } else if (isCtrl(event) && isC(event)) {
        props.copyToClipboard()
      } else if (isCtrl(event) && isV(event)) {
        props.pasteFromClipboard()
      }
    }

    if (props.selectedCompIds) {
      document.removeEventListener('keydown', action)
      document.addEventListener('keydown', action)
    } else {
      document.removeEventListener('keydown', action)
    }

    // Удаляем слушатель при уничтожении компонента
    return () => {
      document.removeEventListener('keydown', action)
    }
  }

  return null
}
