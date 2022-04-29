import './index.css'

import CompPanel from './comp-panel'
import { CSchemasState } from './comp-panel/model/comp-schema'
import PaletteModal from './palette-modal'
import Preview from './preview'
import { FSchemaState } from './preview/model/form-schema'
import TreePanel from './tree-panel'
import React, { FC, useEffect } from 'react'
import { useRecoilState } from 'recoil'

const FormConstructor: FC = (): JSX.Element => {
  const [, setFSchema] = useRecoilState(FSchemaState)
  const [, setCSchemas] = useRecoilState(CSchemasState)

  async function getSchemaWithComps() {
    const res = await fetch('/api/v1/schemas/ee4254ef-a9a3-4243-be68-51ce733b338e', {
      headers: {
        'content-type': 'application/json',
        accept: '*/*',
      },
    })

    const data = await res.json()

    setFSchema(data.FSchema)
    setCSchemas(data.CSchemas)
  }
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getSchemaWithComps()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="FormConstructor">
      <TreePanel />
      <Preview />
      <CompPanel />
      <PaletteModal />
    </div>
  )
}

export default FormConstructor
