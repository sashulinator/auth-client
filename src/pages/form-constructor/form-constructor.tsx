import { Stack } from '@fluentui/react'

import './form-constructor.css'

import { currentSchemaHistoryState } from '../../entities/schema/model/current-schema'
import CompPanel from './comp-panel'
import { CSchemasState } from './comp-panel/model/comp-schema'
import KeyListener from './key-listener'
import PaletteModal from './palette-modal'
import Preview from './preview'
import TreePanel from './tree-panel'
import React, { FC, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'

import { getSchema } from '@/api/schema'
import Header from '@/widgets/header'

const FormConstructor: FC = (): JSX.Element => {
  const { id } = useParams()

  const [, setCurrentSchemaHistory] = useRecoilState(currentSchemaHistoryState)

  const { data: fetchedCurrentSchema } = useQuery(['schema', id], getSchema)
  const resetCSchemas = useResetRecoilState(CSchemasState)

  useEffect(setFetchedCurrentSchemaToState, [fetchedCurrentSchema])
  useEffect(() => resetCSchemas, [])

  function setFetchedCurrentSchemaToState() {
    if (fetchedCurrentSchema !== undefined) {
      setCurrentSchemaHistory({ next: null, data: fetchedCurrentSchema, prev: null })
    }
  }

  return (
    <>
      <KeyListener />
      <Header />
      <div className="fakeHeader" />
      <Stack as="main" className="FormConstructor">
        <TreePanel />
        <Preview />
        <CompPanel />
        <PaletteModal />
      </Stack>
    </>
  )
}

export default FormConstructor
