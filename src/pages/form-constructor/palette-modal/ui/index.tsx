import { Modal, Pivot, PivotItem, PrimaryButton, Stack } from '@fluentui/react'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import { paletteModalState } from '../model'
import React, { FC } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'

import { getSchemaList } from '@/api/schema'
import { Schema } from '@/common/types'
import { ROOT_ID } from '@/constants/common'
import { selectedCompIdsState } from '@/entities/schema'
import { currentSchemaHistoryState, setFSchemaComps } from '@/entities/schema/model/current-schema'
import { remove } from '@/lib/change-unmutable'
import { addEntity, copyEntities, findEntityPosition } from '@/lib/entity-actions'
import { createNewComp } from '@/shared/draw-comps/lib/actions'

const PaletteModal: FC = (): JSX.Element => {
  const [isOpen, setOpen] = useRecoilState(paletteModalState)
  const [selectedCompIds, setPickedCompIds] = useRecoilState(selectedCompIdsState)
  const [currentSchemaHistory, setCurrentSchemaHistory] = useRecoilState(currentSchemaHistoryState)

  const { data } = useQuery('schemas', getSchemaList)

  function onAdd(schema: Schema) {
    const createdNewComp = createNewComp(schema)
    const isRoot = selectedCompIds.includes(ROOT_ID)
    const isToRoot = selectedCompIds.length === 0 || isRoot

    if (isToRoot) {
      const comps = addEntity(createdNewComp, ROOT_ID, 0, currentSchemaHistory.data.comps)
      setCurrentSchemaHistory(setFSchemaComps(comps))
    } else {
      const position = findEntityPosition(selectedCompIds[0] || '', currentSchemaHistory.data.comps)
      assertNotUndefined(position)
      const comps = addEntity(
        createdNewComp,
        position.parentId.toString(),
        position.index + 1,
        currentSchemaHistory.data.comps
      )
      setCurrentSchemaHistory(setFSchemaComps(comps))
    }

    if (selectedCompIds.length === 0) {
      setPickedCompIds([createdNewComp.id])
    }

    setOpen(false)
  }

  function addPreset(schema: Schema) {
    const copiedComps = copyEntities(remove(schema.comps, ROOT_ID))

    const isRoot = selectedCompIds.includes(ROOT_ID)
    const isToRoot = selectedCompIds.length === 0 || isRoot

    const newComps = Object.values(copiedComps).reduce((acc, comp) => {
      if (isToRoot) {
        acc = addEntity(comp, ROOT_ID, 0, acc)
      } else {
        const position = findEntityPosition(selectedCompIds[0] || '', acc)
        assertNotUndefined(position)
        acc = addEntity(comp, position.parentId.toString(), position.index + 1, acc)
      }
      return acc
    }, currentSchemaHistory.data.comps)

    setCurrentSchemaHistory(setFSchemaComps(newComps))

    setOpen(false)
  }

  return (
    <Modal titleAriaId={'Add comp'} isOpen={isOpen} onDismiss={() => setOpen(false)} isBlocking={false}>
      <Pivot
        aria-label="Palette of components"
        styles={{ root: { width: '1000px', display: 'flex', justifyContent: 'center' } }}
      >
        <PivotItem headerText="Компоненты">
          <Stack tokens={{ padding: '20px', childrenGap: '10px' }} horizontal>
            {data?.map((schema) => {
              if (schema.type === 'PRESET' || schema.type === 'FORM') {
                return null
              }
              return (
                <PrimaryButton key={schema.id} onClick={() => onAdd(schema)}>
                  {schema.title}
                </PrimaryButton>
              )
            })}
          </Stack>
        </PivotItem>
        <PivotItem headerText="Пресеты">
          {data?.map((schema) => {
            if (schema.type === 'PRESET') {
              return (
                <PrimaryButton onClick={() => addPreset(schema)} key={schema.id}>
                  {schema.title}
                </PrimaryButton>
              )
            }
            return null
          })}
        </PivotItem>
      </Pivot>
    </Modal>
  )
}

export default PaletteModal
