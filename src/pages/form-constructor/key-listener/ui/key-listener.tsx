import { assertNotNull } from '@savchenko91/schema-validator'

import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { removeComp } from '@/helpers/form-schema-state'
import { FSchemaState, pickedFCompIdState, pickedFCompState, removeHighlight } from '@/pages/form-constructor/preview'

export default function KeyListener(): null {
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
  const [pickedFCompId, setPickedFCompId] = useRecoilState(pickedFCompIdState)
  const pickedFComp = useRecoilValue(pickedFCompState)
  useEffect(addDeleteKeyListener, [pickedFCompId])

  function addDeleteKeyListener() {
    function test(event: any): void {
      if (event.key === 'Backspace') {
        assertNotNull(pickedFComp)
        assertNotNull(FSchema)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((document?.activeElement as any)?.type === 'text') {
          return
        }

        const comps = removeComp(pickedFComp?.id, FSchema.comps)
        setPickedFCompId('')
        setTimeout(() => {
          setFSchema({ ...FSchema, comps })
          removeHighlight()
        })
      }
    }

    if (pickedFCompId) {
      document.removeEventListener('keydown', test)
      document.addEventListener('keydown', test)
    } else {
      document.removeEventListener('keydown', test)
    }

    // Удаляем слушатель при уничтожении компонента
    return () => {
      document.removeEventListener('keydown', test)
    }
  }

  return null
}
