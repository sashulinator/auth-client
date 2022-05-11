import { Modal, Pivot, PivotItem, PrimaryButton, Stack } from '@fluentui/react'

import { paletteModalState } from '../model'
import React from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'

import { getSchemaList } from '@/api/schema'
import { ROOT_ID } from '@/constants/common'
import { Comp, Norm, Schema } from '@/entities/schema'
import { remove } from '@/lib/change-unmutable'
import { createNewComp } from '@/shared/schema-drawer/lib/actions'

interface PaletteModalProps {
  addNewComps: (comps: Norm<Comp>) => void
  selectAndUnselectComp: (compId: string | string[]) => void
}

export default function PaletteModal(props: PaletteModalProps): JSX.Element {
  const [isOpen, setOpen] = useRecoilState(paletteModalState)

  const { data } = useQuery('schemas', getSchemaList)

  function onAdd(schema: Schema) {
    const createdNewComp = createNewComp(schema)
    props.addNewComps({ [createdNewComp.id]: createdNewComp })
    setOpen(false)
  }

  function addPreset(schema: Schema) {
    const comps = remove(schema.comps, ROOT_ID)
    props.addNewComps(comps)
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
          <Stack tokens={{ padding: '20px', childrenGap: '10px' }} horizontal>
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
          </Stack>
        </PivotItem>
      </Pivot>
    </Modal>
  )
}
