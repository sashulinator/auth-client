import './preview.css'

import { CSchemasState } from '../../comp-panel/model/comp-schema'
import React, { FC, useEffect } from 'react'
import { Form } from 'react-final-form'
import { useRecoilState, useResetRecoilState } from 'recoil'

import { FSchemaHistoryState, pickedFCompIdsState } from '@/pages/form-constructor/preview/model/form-schema'
import CompDrawer from '@/shared/draw-comps'

const Preview: FC = (): JSX.Element => {
  const [FSchemaHistory] = useRecoilState(FSchemaHistoryState)
  const [CSchemas] = useRecoilState(CSchemasState)
  const resetFSchema = useResetRecoilState(FSchemaHistoryState)
  const resetPickedFCompId = useResetRecoilState(pickedFCompIdsState)

  useEffect(() => {
    resetFSchema()
    resetPickedFCompId()
  }, [])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(data: any) {
    console.log('data', data)
  }

  return (
    <div className="Preview">
      <div className="selectorArea" />
      {CSchemas && (
        <Form
          key={JSON.stringify(FSchemaHistory)}
          onSubmit={onSubmit}
          render={(formProps) => {
            return (
              <form onSubmit={formProps.handleSubmit}>
                {FSchemaHistory && <CompDrawer schemas={CSchemas} comps={FSchemaHistory.data.comps} />}
              </form>
            )
          }}
        />
      )}
    </div>
  )
}

export default Preview
