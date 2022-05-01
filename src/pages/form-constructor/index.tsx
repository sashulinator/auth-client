import { Stack } from '@fluentui/react'

import './index.css'

import CompPanel from './comp-panel'
import PaletteModal from './palette-modal'
import Preview from './preview'
import { FSchemaState } from './preview/model/form-schema'
import TreePanel from './tree-panel'
import React, { FC, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { getSchema } from '@/api/schema'
import Header from '@/widgets/header'

const FormConstructor: FC = (): JSX.Element => {
  const [, setFSchema] = useRecoilState(FSchemaState)
  const { id } = useParams()
  const { data } = useQuery(['schema', id], getSchema)

  useEffect(() => {
    if (data !== undefined) {
      setFSchema(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      <Header />
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
