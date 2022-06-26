import { Modal, Pivot, PivotItem, PrimaryButton, Stack } from '@fluentui/react'

import './palette-modal.css'

import { paletteModalState } from '../model'
import React from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'

import { getSchemaList } from '@/api/schema'
import { ROOT_ID } from '@/constants/common'
import componentList from '@/constants/component-list'
import { createNewComp } from '@/entities/schema'
import { remove } from '@/lib/change-unmutable'
import { Catalog, Comp, CompSchema } from '@/shared/schema-drawer'

interface PaletteModalProps {
  addNewComps: (comps: Catalog<Comp>) => void
  toggleCompSelection: (compId: string | string[]) => void
}

export default function PaletteModal(props: PaletteModalProps): JSX.Element {
  const [isOpen, setOpen] = useRecoilState(paletteModalState)

  const { data } = useQuery('schemas', getSchemaList)

  function onAdd(schema: CompSchema) {
    const createdNewComp = createNewComp(schema, componentList)
    props.addNewComps({ [createdNewComp.id]: createdNewComp })
    setOpen(false)
  }

  function addPreset(schema: CompSchema) {
    const comps = remove(schema.data, ROOT_ID)
    props.addNewComps(comps)
    setOpen(false)
  }

  return (
    <Modal
      className="PaletteModal"
      titleAriaId={'Add comp'}
      isOpen={isOpen}
      onDismiss={() => setOpen(false)}
      isBlocking={false}
    >
      <Pivot aria-label="Palette of components" styles={{ root: { display: 'flex', justifyContent: 'center' } }}>
        <PivotItem headerText="Компоненты">
          <Stack className="rootContainer">
            <Stack className="container">
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
          </Stack>
        </PivotItem>
        <PivotItem headerText="Пресеты">
          <Stack className="rootContainer">
            <Stack className="container">
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
          </Stack>
        </PivotItem>
      </Pivot>
    </Modal>
  )
}
