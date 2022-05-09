import { isMac } from '@fluentui/react'
import { assertNotNull, assertNotUndefined } from '@savchenko91/schema-validator'

import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { schemaValidator } from '@/common/schemas'
import { Comp, Norm } from '@/common/types'
import { ROOT_ID } from '@/constants/common'
import { pickedFCompState, selectedCompIdsState } from '@/entities/schema'
import {
  addEntity,
  copyEntities,
  findDependencyIds,
  findEntities,
  findEntityPosition,
  findRootParentIds,
  removeEntity,
} from '@/lib/entity-actions'
import { currentSchemaHistoryState, setFSchemaComps, setNext, setPrev } from '@/pages/form-constructor/preview'

export default function KeyListener(): null {
  const [currentSchemaHistory, setCurrentSchemaHistory] = useRecoilState(currentSchemaHistoryState)
  const [selectedCompIds, setSelectedCompIds] = useRecoilState(selectedCompIdsState)
  const pickedFComp = useRecoilValue(pickedFCompState)

  useEffect(addEscKeyListener, [selectedCompIds])
  useEffect(addDeleteKeyListener, [selectedCompIds])
  useEffect(addCtrlZKeyListener, [selectedCompIds, currentSchemaHistory])
  useEffect(addCtrlShiftZKeyListener, [selectedCompIds, currentSchemaHistory])
  useEffect(addCtrlCKeyListener, [selectedCompIds, currentSchemaHistory])
  useEffect(addCtrlVKeyListener, [selectedCompIds, currentSchemaHistory])

  function addEscKeyListener() {
    function action(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        assertNotNull(pickedFComp)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((document?.activeElement as any)?.type === 'text') {
          return
        }

        setSelectedCompIds([])
      }
    }

    if (selectedCompIds) {
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

        if (currentSchemaHistory.prev) {
          const prevCompsId = currentSchemaHistory.prev.data.comps[ROOT_ID]?.children || []

          const absentIds = selectedCompIds.filter((id) => !prevCompsId.includes(id))

          const newPickedIds = selectedCompIds.filter((id) => !absentIds.includes(id))

          setSelectedCompIds(newPickedIds)
        }

        setCurrentSchemaHistory(setPrev)
      }
    }

    if (selectedCompIds) {
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

  function addCtrlCKeyListener() {
    function action(event: KeyboardEvent): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((document?.activeElement as any)?.type === 'text') {
        return
      }

      const controlKeyName = isMac() ? 'metaKey' : 'ctrlKey'

      if (event.code === 'KeyC' && event[controlKeyName] && !event.shiftKey) {
        const dependencyIds = findDependencyIds(selectedCompIds, currentSchemaHistory.data.comps)
        const selectedComps = findEntities(dependencyIds, currentSchemaHistory.data.comps)
        localStorage.setItem('copyClipboard', JSON.stringify(selectedComps))
      }
    }

    if (selectedCompIds) {
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

  function addCtrlVKeyListener() {
    function action(event: KeyboardEvent): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((document?.activeElement as any)?.type === 'text') {
        return
      }

      const controlKeyName = isMac() ? 'metaKey' : 'ctrlKey'

      if (event.code === 'KeyV' && event[controlKeyName] && !event.shiftKey) {
        const stringifiedComps = localStorage.getItem('copyClipboard') || ''

        const comps = JSON.parse(stringifiedComps) as Norm<Comp>

        schemaValidator.comps(comps)

        if (comps) {
          const copiedComps = copyEntities(comps, ['path'])

          const rootCompIds = findRootParentIds(copiedComps)
          const rootComps = findEntities(rootCompIds, copiedComps)

          const mergedComps = { ...currentSchemaHistory.data.comps, ...copiedComps }

          const isRoot = selectedCompIds.includes(ROOT_ID)
          const isToRoot = selectedCompIds.length === 0 || isRoot

          const newComps = Object.values(rootComps).reduce((acc, comp) => {
            if (isToRoot) {
              acc = addEntity(comp, ROOT_ID, 0, acc)
            } else {
              const position = findEntityPosition(selectedCompIds[0] || '', acc)
              assertNotUndefined(position)
              acc = addEntity(comp, position.parentId.toString(), position.index + 1, acc)
            }
            return acc
          }, mergedComps)

          setCurrentSchemaHistory(setFSchemaComps(newComps))

          if (selectedCompIds.length === 0) {
            setSelectedCompIds(comps[0] ? [comps[0].id] : [])
          }
        }
      }
    }

    if (selectedCompIds) {
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

        if (currentSchemaHistory.next) {
          const nextCompsId = currentSchemaHistory.next.data.comps[ROOT_ID]?.children || []

          const absentIds = selectedCompIds.filter((id) => !nextCompsId.includes(id))

          const newPickedIds = selectedCompIds.filter((id) => !absentIds.includes(id))

          setSelectedCompIds(newPickedIds)
        }

        setCurrentSchemaHistory(setNext)
      }
    }

    if (selectedCompIds) {
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
        if (pickedFComp === null) {
          return
        }

        const comps = removeEntity(pickedFComp?.id, currentSchemaHistory.data.comps)
        assertNotUndefined(comps)
        setSelectedCompIds([])
        setCurrentSchemaHistory(setFSchemaComps(comps))
      }
    }

    if (selectedCompIds) {
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
