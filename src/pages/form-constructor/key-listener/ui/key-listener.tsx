import { isMac } from '@fluentui/react'
import { assertNotNull } from '@savchenko91/schema-validator'

import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ROOT_COMP_ID } from '@/constants/common'
import { removeComp } from '@/helpers/form-schema-state'
import {
  FSchemaHistoryState,
  pickedFCompIdsState,
  pickedFCompState,
  setFSchemaComps,
  setNext,
  setPrev,
} from '@/pages/form-constructor/preview'

export default function KeyListener(): null {
  const [FSchemaHistory, setFSchemaHistory] = useRecoilState(FSchemaHistoryState)
  const [pickedFCompIds, setPickedFCompIds] = useRecoilState(pickedFCompIdsState)
  const pickedFComp = useRecoilValue(pickedFCompState)

  useEffect(addEscKeyListener, [pickedFCompIds])
  useEffect(addDeleteKeyListener, [pickedFCompIds])
  useEffect(addCtrlZKeyListener, [pickedFCompIds, FSchemaHistory])
  useEffect(addCtrlShiftZKeyListener, [pickedFCompIds, FSchemaHistory])

  function addEscKeyListener() {
    function action(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        assertNotNull(pickedFComp)

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

  //

  function addCtrlZKeyListener() {
    function action(event: KeyboardEvent): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((document?.activeElement as any)?.type === 'text') {
        return
      }

      const controlKeyName = isMac() ? 'metaKey' : 'ctrlKey'

      if (event.code === 'KeyZ' && event[controlKeyName] && !event.shiftKey) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((document?.activeElement as any)?.type === 'text') {
          return
        }

        if (FSchemaHistory.prev) {
          const prevCompsId = FSchemaHistory.prev.data.comps[ROOT_COMP_ID]?.childCompIds || []

          const absentIds = pickedFCompIds.filter((id) => !prevCompsId.includes(id))

          const newPickedIds = pickedFCompIds.filter((id) => !absentIds.includes(id))

          setPickedFCompIds(newPickedIds)
        }

        setFSchemaHistory(setPrev)
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

  function addCtrlShiftZKeyListener() {
    function action(event: KeyboardEvent): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((document?.activeElement as any)?.type === 'text') {
        return
      }

      const controlKeyName = isMac() ? 'metaKey' : 'ctrlKey'

      if (event.code === 'KeyZ' && event.shiftKey && event[controlKeyName]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((document?.activeElement as any)?.type === 'text') {
          return
        }

        if (FSchemaHistory.next) {
          const nextCompsId = FSchemaHistory.next.data.comps[ROOT_COMP_ID]?.childCompIds || []

          const absentIds = pickedFCompIds.filter((id) => !nextCompsId.includes(id))

          const newPickedIds = pickedFCompIds.filter((id) => !absentIds.includes(id))

          setPickedFCompIds(newPickedIds)
        }

        setFSchemaHistory(setNext)
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

  //

  function addDeleteKeyListener() {
    function action(event: KeyboardEvent): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((document?.activeElement as any)?.type === 'text') {
        return
      }

      if (event.key === 'Backspace') {
        assertNotNull(pickedFComp)

        const comps = removeComp(pickedFComp?.id, FSchemaHistory.data.comps)
        setPickedFCompIds([])
        setFSchemaHistory(setFSchemaComps(comps))
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
