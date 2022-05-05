import { Modal, Pivot, PivotItem, PrimaryButton, Stack } from '@fluentui/react'

import { paletteModalState } from '../model'
import React, { FC } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'

import { getSchemaList } from '@/api/schema'
import { Schema } from '@/common/types'
import { ROOT_COMP_ID } from '@/constants/common'
import {
  FSchemaHistoryState,
  pickedFCompIdsState,
  setFSchemaComps,
} from '@/pages/form-constructor/preview/model/form-schema'
import { addComp, copyComps, createNewComp, findCompPosition } from '@/shared/draw-comps/lib/mutators'
import { remove } from '@/utils/change-unmutable'

const PaletteModal: FC = (): JSX.Element => {
  const [isOpen, setOpen] = useRecoilState(paletteModalState)
  const [pickedFCompIds, setPickedCompIds] = useRecoilState(pickedFCompIdsState)
  const [FSchemaHistory, setFSchemaHistory] = useRecoilState(FSchemaHistoryState)

  const { data } = useQuery('schemas', getSchemaList)

  function onAdd(schema: Schema) {
    const createdNewComp = createNewComp(schema)
    const isRoot = pickedFCompIds.includes(ROOT_COMP_ID)
    const isToRoot = pickedFCompIds.length === 0 || isRoot

    if (isToRoot) {
      const comps = addComp(createdNewComp, ROOT_COMP_ID, 0, FSchemaHistory.data.comps)
      setFSchemaHistory(setFSchemaComps(comps))
    } else {
      const position = findCompPosition(pickedFCompIds[0] || '', FSchemaHistory.data.comps)
      const comps = addComp(createdNewComp, position.parentId.toString(), position.index + 1, FSchemaHistory.data.comps)
      setFSchemaHistory(setFSchemaComps(comps))
    }

    if (pickedFCompIds.length === 0) {
      setPickedCompIds([createdNewComp.id])
    }

    setOpen(false)
  }

  function addPreset(schema: Schema) {
    const copiedComps = copyComps(remove(schema.comps, ROOT_COMP_ID))

    console.log('copiedComps', copiedComps)

    const isRoot = pickedFCompIds.includes(ROOT_COMP_ID)
    const isToRoot = pickedFCompIds.length === 0 || isRoot

    const newComps = Object.values(copiedComps).reduce((acc, comp) => {
      if (isToRoot) {
        acc = addComp(comp, ROOT_COMP_ID, 0, acc)
      } else {
        const position = findCompPosition(pickedFCompIds[0] || '', acc)
        acc = addComp(comp, position.parentId.toString(), position.index + 1, acc)
      }
      return acc
    }, FSchemaHistory.data.comps)

    // console.log('newComps', newComps)

    setFSchemaHistory(setFSchemaComps(newComps))

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
                  {schema.name}
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
                  {schema.name}
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
