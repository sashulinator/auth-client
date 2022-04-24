import { Checkbox, PrimaryButton, Stack } from '@fluentui/react'

import React, { FC } from 'react'
import { Form } from 'react-final-form'

import CustomTextField from '@/components/text-field'
import { drawSchema } from '@/helpers/draw-schema'
import { formSchemaData } from '@/recoil/form-schema'

export const hashComponents = {
  Stack,
  Checkbox,
  TextField: CustomTextField,
  PrimaryButton,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

const Preview: FC = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(data: any) {
    console.log('data', data)
  }

  return (
    <div className="Preview">
      <Form
        onSubmit={onSubmit}
        render={(formProps) => {
          return <form onSubmit={formProps.handleSubmit}>{formSchemaData.schema.map(drawSchema)}</form>
        }}
      />
    </div>
  )
}

export default Preview
