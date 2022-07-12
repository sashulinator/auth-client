import './incident-form.css'

import React from 'react'
import { Form } from 'react-final-form'
import { useNavigate } from 'react-router-dom'

import { createIncident, updateIncident } from '@/api/incident'
import componentList from '@/constants/component-list'
import ROUTES from '@/constants/routes'
import { CreateInputIncident, UpdateInputIncident } from '@/entities/incident/model/types'
import SchemaDrawer, { CompSchema, Dictionary, hasInstanceId } from '@/shared/schema-drawer'

interface IncidentFormProps {
  schema: CompSchema
  schemas: Dictionary<CompSchema>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  incident: any
}

export default function IncidentForm(props: IncidentFormProps): JSX.Element {
  const navigate = useNavigate()
  async function onSubmit(data: UpdateInputIncident | CreateInputIncident) {
    if (hasInstanceId(data)) {
      await updateIncident(data as UpdateInputIncident)
    } else {
      const resData = await createIncident(data)
      navigate(ROUTES.INCIDENT.PATH.replace(':id', resData.dataBlock.instanceId))
    }
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
              context={{ form: formProps.form, formState: formProps.form.getState() }}
            />
          </form>
        )
      }}
    />
  )
}
