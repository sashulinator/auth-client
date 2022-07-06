import { Modal, Pivot, PivotItem, PrimaryButton, SearchBox, Stack } from '@fluentui/react'
import { isEmpty } from '@savchenko91/schema-validator'

import './palette-modal.css'

import { paletteModalState } from '../model'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import uniqid from 'uniqid'

import { getCompSchemaList } from '@/api/comp-schema'
import { ROOT_ID } from '@/constants/common'
import componentList from '@/constants/component-list'
import { createNewComp } from '@/entities/schema'
import { remove } from '@/lib/change-unmutable'
import HorizontalLine from '@/shared/horizontal-line'
import { Catalog, Comp, CompSchema, CompSchemaType, LinkedComp, isInputType } from '@/shared/schema-drawer'

interface PaletteModalProps {
  addNewComps: (comps: Catalog<Comp | LinkedComp>) => void
  toggleCompSelection: (compId: string | string[]) => void
}

export default function PaletteModal(props: PaletteModalProps): JSX.Element {
  const [isOpen, setOpen] = useRecoilState(paletteModalState)
  const [searchQuery, setFilterString] = useState('')

  const { data } = useQuery('schemas', getCompSchemaList)
  const presets: CompSchema[] = Object.values(data || {}).filter((schema) => schema.type === CompSchemaType.PRESET)
  const components: CompSchema[] = Object.values(data || {}).filter((schema) => schema.type === CompSchemaType.COMP)
  const dimensions: CompSchema[] = Object.values(data || {}).filter(
    (schema) => schema.type === CompSchemaType.FORM_DIMENSION
  )

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

  function addSchema(schema: CompSchema) {
    const id = uniqid()
    props.addNewComps({ [id]: { id, linkedSchemaId: schema.id } })
    setOpen(false)
  }

  function getElements(cb: (component: any) => boolean, searchQuery: string): CompSchema[] {
    return components.reduce<CompSchema[]>((acc, schema) => {
      const component = componentList[schema.componentName || '']

      if (cb(component) && new RegExp(searchQuery, 'i').test(schema.componentName || '')) {
        acc.push(schema)
      }

      return acc
    }, [])
  }

  const inputComponents = getElements((component) => isInputType(component), searchQuery)
  const contentComponents = getElements((component) => !isInputType(component), searchQuery)

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
          <Stack maxWidth={400} tokens={{ padding: '0 0 0 32px' }}>
            <SearchBox
              autoComplete="off"
              className="searchBox"
              onChange={(ev: unknown, value?: string) => setFilterString(value || '')}
            />
          </Stack>
          <Stack className="rootContainer">
            <Stack className="container">
              <HorizontalLine color="black" label="Input" />
              <div className="buttons">
                {isEmpty(inputComponents)
                  ? 'nothing found'
                  : inputComponents.map((element) => {
                      return (
                        <PrimaryButton key={element.id} onClick={() => onAdd(element)}>
                          {element.title}
                        </PrimaryButton>
                      )
                    })}
              </div>
              <HorizontalLine color="black" label="Content" />
              <div className="buttons">
                {isEmpty(contentComponents)
                  ? 'nothing found'
                  : contentComponents.map((element) => {
                      return (
                        <PrimaryButton key={element.id} onClick={() => onAdd(element)}>
                          {element.title}
                        </PrimaryButton>
                      )
                    })}
              </div>
            </Stack>
          </Stack>
        </PivotItem>
        <PivotItem headerText="Пресеты">
          <Stack maxWidth={400} tokens={{ padding: '0 0 0 32px' }}>
            <SearchBox
              autoComplete="off"
              className="searchBox"
              onChange={(ev: unknown, value?: string) => setFilterString(value || '')}
            />
          </Stack>
          <Stack className="rootContainer">
            <Stack className="container">
              <div className="buttons">
                {presets
                  .filter((schema) => new RegExp(searchQuery, 'i').test(schema.title || ''))
                  ?.map((schema) => {
                    return (
                      <PrimaryButton onClick={() => addPreset(schema)} key={schema.id}>
                        {schema.title}
                      </PrimaryButton>
                    )
                  })}
              </div>
            </Stack>
          </Stack>
        </PivotItem>
        <PivotItem headerText="Классификаторы">
          <Stack className="rootContainer">
            <Stack className="container">
              <div className="buttons">
                {dimensions.map((schema) => {
                  return (
                    <PrimaryButton onClick={() => addSchema(schema)} key={schema.id}>
                      {schema.title}
                    </PrimaryButton>
                  )
                })}
              </div>
            </Stack>
          </Stack>
        </PivotItem>
      </Pivot>
    </Modal>
  )
}
