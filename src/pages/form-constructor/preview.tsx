import React, { FC } from 'react'
import { Form } from 'react-final-form'
import { useRecoilValue } from 'recoil'

import { SchemaConstructor } from '@/components/schema-constructor'
import { hierarchicalFCompsState, normFCompsState } from '@/recoil/form-schema'

const Preview: FC = (): JSX.Element => {
  const hierarchicalFComps = useRecoilValue(hierarchicalFCompsState)
  const normFComps = useRecoilValue(normFCompsState)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(data: any) {
    console.log('data', data)
  }

  return (
    <div className="Preview">
      <Form
        key={JSON.stringify(normFComps)}
        onSubmit={onSubmit}
        render={(formProps) => {
          return (
            <form onSubmit={formProps.handleSubmit}>
              <SchemaConstructor normComps={normFComps} hierarchyComps={hierarchicalFComps} />
            </form>
          )
        }}
      />
    </div>
  )
}

export default Preview
