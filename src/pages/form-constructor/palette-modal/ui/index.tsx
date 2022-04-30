import { Modal, PrimaryButton } from '@fluentui/react'
import { assertNotNull } from '@savchenko91/schema-validator'

import { paletteModalState } from '../model'
import React, { FC } from 'react'
import { useRecoilState } from 'recoil'

import { addCompToParent, createNewComp, findParentId } from '@/helpers/form-schema-state'
import { FSchemaState, pickedFCompIdState } from '@/pages/form-constructor/preview/model/form-schema'

const PaletteModal: FC = (): JSX.Element => {
  const [pickedFCompId, setPickedCompId] = useRecoilState(pickedFCompIdState)
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
  const [isOpen, setOpen] = useRecoilState(paletteModalState)

  function onAdd(componentName: string) {
    assertNotNull(FSchema)

    const createdNewComp = createNewComp(componentName)
    const parentToPut = pickedFCompId ? findParentId(pickedFCompId, FSchema.comps) : 'stackRootId'

    const newFormSchema = addCompToParent(parentToPut, 0, createdNewComp, FSchema.comps)

    setFSchema({ ...FSchema, comps: newFormSchema })
    setPickedCompId(createdNewComp.id)
    setOpen(false)
  }

  return (
    <Modal titleAriaId={'Add comp'} isOpen={isOpen} onDismiss={() => setOpen(false)} isBlocking={false}>
      <PrimaryButton onClick={() => onAdd('TextInput')}>TextInput</PrimaryButton>
      <PrimaryButton onClick={() => onAdd('PrimaryButton')}>PrimaryButton</PrimaryButton>
      <PrimaryButton onClick={() => onAdd('Stack')}>Stack</PrimaryButton>
      <PrimaryButton onClick={() => onAdd('Checkbox')}>Checkbox</PrimaryButton>
      <PrimaryButton onClick={() => onAdd('Text')}>Text</PrimaryButton>
    </Modal>
  )
}

export default PaletteModal
