import './incident-form.css'

import React from 'react'
import { Form } from 'react-final-form'
import { useNavigate } from 'react-router-dom'

import { updateIncident } from '@/api/incident'
import { useCreateIncidentMutation } from '@/api/incident/create'
import componentList from '@/constants/component-list'
import ROUTES from '@/constants/routes'
import { CreateInputIncident, UpdateInputIncident } from '@/entities/incident/model/types'
import SchemaDrawer, { CompSchema, Dictionary, hasInstanceId } from '@/shared/schema-drawer'
import { successMessage } from '@/shared/toast'

interface IncidentFormProps {
  schema: CompSchema
  schemas: Dictionary<CompSchema>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  incident: any
}

export default function IncidentForm(props: IncidentFormProps): JSX.Element {
  const navigate = useNavigate()
  const { mutate: createIncident } = useCreateIncidentMutation()

  async function onSubmit(data: UpdateInputIncident | CreateInputIncident) {
    if (hasInstanceId(data)) {
      await updateIncident(data as UpdateInputIncident)
    } else {
      createIncident(data, {
        onSuccess(response) {
          navigate(ROUTES.INCIDENT.PATH.replace(':id', response.dataBlock.instanceId))
          successMessage('Рисковое событие создано')
        },
        onError() {
          successMessage('При создании риского события произошла ошибка')
        },
      })
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
