import React, { FC } from 'react'
import { Form } from 'react-final-form'
import { useRecoilState } from 'recoil'

import { drawSchema } from '@/helpers/draw-schema'
import { formSchemaData, formSchemaState } from '@/recoil/form-schema'

const Preview: FC = (): JSX.Element => {
  const [formSchema] = useRecoilState(formSchemaState)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(data: any) {
    console.log('data', data)
  }

  return (
    <div className="Preview">
      <Form
        onSubmit={onSubmit}
        render={(formProps) => {
          return <form onSubmit={formProps.handleSubmit}>{drawSchema(formSchema, formSchemaData.schema)}</form>
        }}
      />
    </div>
  )
}

export default Preview
