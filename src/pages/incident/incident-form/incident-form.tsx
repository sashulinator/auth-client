import './incident-form.css'

import React from 'react'
import { Form } from 'react-final-form'
import uuid from 'uuid-random'

import { createIncident } from '@/api/incident'
import componentList from '@/constants/component-list'
import { Incident } from '@/entities/incident/model/types'
import SchemaDrawer, { Catalog, CompSchema } from '@/shared/schema-drawer'

interface IncidentFormProps {
  schema: CompSchema
  schemas: Catalog<CompSchema>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  incident: any
}

export default function IncidentForm(props: IncidentFormProps): JSX.Element {
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
      data: data.data,
    })
    console.log('resData', resData)
  }

  return (
    <Form
      initialValues={props.incident}
      onSubmit={onSubmit}
      render={(formProps) => {
        return (
          <form id="main" onSubmit={formProps.handleSubmit}>
            <SchemaDrawer
              componentList={componentList}
              schema={props.schema}
              schemas={props.schemas}
              context={{ form: formProps.form }}
            />
          </form>
        )
      }}
    />
  )
}
