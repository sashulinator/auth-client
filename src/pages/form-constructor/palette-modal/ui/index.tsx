import { Modal, Pivot, PivotItem, PrimaryButton, Stack } from '@fluentui/react'

import { paletteModalState } from '../model'
import React, { FC } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'

import { getSchemaList } from '@/api/schema'
import { ROOT_COMP_ID } from '@/constants/common'
import { addCompToParent, createNewComp, findParentId } from '@/helpers/form-schema-state'
import { FSchemaState, pickedFCompIdState } from '@/pages/form-constructor/preview/model/form-schema'
import { Schema } from '@/types/form-constructor'

const PaletteModal: FC = (): JSX.Element => {
  const [isOpen, setOpen] = useRecoilState(paletteModalState)
  const [pickedFCompId, setPickedCompId] = useRecoilState(pickedFCompIdState)
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)

  const { data } = useQuery('schemas', getSchemaList)

  function onAdd(schema: Schema) {
    const createdNewComp = createNewComp(schema)
    const isRoot = pickedFCompId === ROOT_COMP_ID
    const parentToPut = pickedFCompId && !isRoot ? findParentId(pickedFCompId, FSchema.comps) : ROOT_COMP_ID

    const newFormSchema = addCompToParent(parentToPut, 0, createdNewComp, FSchema.comps)

    setFSchema({ ...FSchema, comps: newFormSchema })
    setPickedCompId(createdNewComp.id)
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
              return <PrimaryButton key={schema.id}>{schema.name}</PrimaryButton>
            }
            return null
          })}
        </PivotItem>
      </Pivot>
    </Modal>
  )
}

export default PaletteModal
