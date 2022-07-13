import './incident-form.css'

import React from 'react'
import { Form } from 'react-final-form'
import { useNavigate } from 'react-router-dom'

import { useCreateIncidentMutation } from '@/api/incident/create'
import { useUpdateIncidentMutation } from '@/api/incident/update'
import componentList from '@/constants/component-list'
import ROUTES from '@/constants/routes'
import { CreateInputIncident, UpdateInputIncident } from '@/entities/incident/model/types'
import SchemaDrawer, { CompSchema, Dictionary, hasInstanceId } from '@/shared/schema-drawer'
import { errorMessage, successMessage } from '@/shared/toast'

interface IncidentFormProps {
  schema: CompSchema
  schemas: Dictionary<CompSchema>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  incident: any
  refetch: () => void
}

export default function IncidentForm(props: IncidentFormProps): JSX.Element {
  const navigate = useNavigate()
  const { mutate: createIncident } = useCreateIncidentMutation()
  const { mutate: updateIncident } = useUpdateIncidentMutation()

  function onSubmit(data: UpdateInputIncident | CreateInputIncident) {
    if (hasInstanceId(data)) {
      updateIncident(data as UpdateInputIncident, {
        onSuccess() {
          props.refetch()
          successMessage('Рисковое событие обновлено')
        },
        onError() {
          errorMessage('При обновлении риского события произошла ошибка')
        },
      })
    } else {
      createIncident(data, {
        onSuccess(response) {
          navigate(ROUTES.INCIDENT.PATH.replace(':id', response.dataBlock.instanceId))
          successMessage('Рисковое событие создано')
        },
        onError() {
          errorMessage('При создании риского события произошла ошибка')
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
