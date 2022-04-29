import { Modal, PrimaryButton } from '@fluentui/react'

import { paletteModalState } from '../model'
import React, { FC } from 'react'
import { useRecoilState } from 'recoil'

import { addCompToParent, createNewComp, findParentId } from '@/helpers/form-schema-state'
import { FSchemaState, pickedFCompIdState } from '@/pages/form-constructor/preview/model/form-schema'

const PaletteModal: FC = (): JSX.Element => {
  const [pickedFCompId, setPickedCompId] = useRecoilState(pickedFCompIdState)
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
  const [isOpen, setOpen] = useRecoilState(paletteModalState)

  return (
    <Modal titleAriaId={'Add comp'} isOpen={isOpen} onDismiss={() => setOpen(false)} isBlocking={false}>
      <PrimaryButton
        onClick={() => {
          const createdNewComp = createNewComp('TextInput')
          const parentToPut = pickedFCompId ? findParentId(pickedFCompId, FSchema.comps) : 'stackRootId'

          const newFormSchema = addCompToParent(parentToPut, 0, createdNewComp, FSchema.comps)

          setFSchema({ ...FSchema, comps: newFormSchema })
          setPickedCompId(createdNewComp.id)
          setOpen(false)
        }}
      >
        TextInput
      </PrimaryButton>
      <PrimaryButton
        onClick={() => {
          const createdNewComp = createNewComp('PrimaryButton')
          const parentToPut = pickedFCompId ? findParentId(pickedFCompId, FSchema.comps) : 'stackRootId'

          const newFormSchema = addCompToParent(parentToPut, 0, createdNewComp, FSchema.comps)

          setFSchema({ ...FSchema, comps: newFormSchema })
          setPickedCompId(createdNewComp.id)
          setOpen(false)
        }}
      >
        PrimaryButton
      </PrimaryButton>
    </Modal>
  )
}

export default PaletteModal
