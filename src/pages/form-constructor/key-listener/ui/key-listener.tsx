import { assertNotNull } from '@savchenko91/schema-validator'

import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { removeComp } from '@/helpers/form-schema-state'
import { FSchemaState, pickedFCompIdsState, pickedFCompState } from '@/pages/form-constructor/preview'

export default function KeyListener(): null {
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
  const [pickedFCompIds, setPickedFCompIds] = useRecoilState(pickedFCompIdsState)
  const pickedFComp = useRecoilValue(pickedFCompState)
  useEffect(addEscKeyListener, [pickedFCompIds])
  useEffect(addDeleteKeyListener, [pickedFCompIds])

  function addEscKeyListener() {
    function action(event: KeyboardEvent): void {
      console.log('event.key', event.key)

      if (event.key === 'Escape') {
        assertNotNull(pickedFComp)
        assertNotNull(FSchema)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((document?.activeElement as any)?.type === 'text') {
          return
        }

        setPickedFCompIds([])
      }
    }

    if (pickedFCompIds) {
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

  function addDeleteKeyListener() {
    function action(event: KeyboardEvent): void {
      if (event.key === 'Backspace') {
        assertNotNull(pickedFComp)
        assertNotNull(FSchema)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((document?.activeElement as any)?.type === 'text') {
          return
        }

        const comps = removeComp(pickedFComp?.id, FSchema.comps)
        setPickedFCompIds([])
        setFSchema({ ...FSchema, comps })
      }
    }

    if (pickedFCompIds) {
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
