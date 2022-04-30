import React, { FC } from 'react'
import { Form } from 'react-final-form'
import { useRecoilState } from 'recoil'

import { FSchemaState } from '@/pages/form-constructor/preview/model/form-schema'
import CompDrawer from '@/shared/draw-comps'

const Preview: FC = (): JSX.Element => {
  const [FSchema] = useRecoilState(FSchemaState)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(data: any) {
    console.log('data', data)
  }

  return (
    <div className="Preview">
      <Form
        key={JSON.stringify(FSchema)}
        onSubmit={onSubmit}
        render={(formProps) => {
          return (
            <form onSubmit={formProps.handleSubmit}>
              <CompDrawer comps={FSchema.comps} />
            </form>
          )
        }}
      />
    </div>
  )
}

export default Preview
