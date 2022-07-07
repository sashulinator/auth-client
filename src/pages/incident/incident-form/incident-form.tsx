import './incident-form.css'

import React from 'react'
import { Form } from 'react-final-form'

import { createIncident, updateIncident } from '@/api/incident'
import componentList from '@/constants/component-list'
import { CreateInputIncident, UpdateInputIncident } from '@/entities/incident/model/types'
import SchemaDrawer, { Catalog, CompSchema, hasInstanceId } from '@/shared/schema-drawer'

interface IncidentFormProps {
  schema: CompSchema
  schemas: Catalog<CompSchema>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  incident: any
}

export default function IncidentForm(props: IncidentFormProps): JSX.Element {
  async function onSubmit(data: UpdateInputIncident | CreateInputIncident) {
    const resData: CreateInputIncident | UpdateInputIncident = {
      ...data,
      status: data.status,
      validation_state_cd: data.validation_state_cd,
      source_system_cd: data.source_system_cd,
      name: data.name,
    }

    if (hasInstanceId(resData)) {
      await updateIncident(resData as UpdateInputIncident)
    } else {
      await createIncident(resData)
    }

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
