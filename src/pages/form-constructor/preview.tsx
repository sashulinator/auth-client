import React, { FC } from 'react'
import { Form } from 'react-final-form'
import { useRecoilValue } from 'recoil'

import { SchemaConstructor } from '@/components/schema-constructor'
import { hierarchyFormSchemaState, normFormSchemaState } from '@/recoil/form-schema'

const Preview: FC = (): JSX.Element => {
  const hierarchyFormSchema = useRecoilValue(hierarchyFormSchemaState)
  const normFormSchema = useRecoilValue(normFormSchemaState)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(data: any) {
    console.log('data', data)
  }
  console.log('hierarchyFormSchema', hierarchyFormSchema)

  return (
    <div className="Preview">
      <Form
        key={JSON.stringify(normFormSchema)}
        onSubmit={onSubmit}
        render={(formProps) => {
          return (
            <form onSubmit={formProps.handleSubmit}>
              <SchemaConstructor normComps={normFormSchema.schema} hierarchyComps={hierarchyFormSchema.schema} />
            </form>
          )
        }}
      />
    </div>
  )
}

export default Preview
