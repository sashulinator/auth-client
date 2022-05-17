import React from 'react'
import { Form } from 'react-final-form'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import uuid from 'uuid-random'

import { createIncident, getIncident } from '@/api/incident'
import { Incident } from '@/entities/incident/model/types'
import { Norm, Schema } from '@/entities/schema'
import SchemaDrawer from '@/shared/schema-drawer'

interface IncidentFormProps {
  schema: Schema
  schemas: Norm<Schema>
}

export default function IncidentForm(props: IncidentFormProps): JSX.Element {
  const { id } = useParams()

  const { data } = useQuery(['schema', id], getIncident)

  async function onSubmit(data: Incident) {
    const resData = await createIncident({
      id: uuid(),
      status: data.status,
      validationStateCd: data.validationStateCd,
      creator: 'vasya',
      createdAt: new Date().toISOString(),
      editedAt: new Date().toISOString(),
      sourceSystemCd: 'test',
      name: data.name,
      values: data.values,
    })
    console.log('resData', resData)
  }

  return (
    <div className="IncidentForm">
      <Form
        initialValues={data}
        onSubmit={onSubmit}
        render={(formProps) => {
          return (
            <form onSubmit={formProps.handleSubmit}>
              <SchemaDrawer
                schema={props.schema}
                schemas={props.schemas}
                context={{
                  formState: formProps.form.getState(),
                  formProps,
                }}
              />
            </form>
          )
        }}
      />
    </div>
  )
}
