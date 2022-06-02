import { Stack } from '@fluentui/react'

import { Config } from 'final-form'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-final-form'

import { Comp, Norm, Schema } from '@/entities/schema'
import CompDrawer from '@/entities/schema/schema-drawer'
import Autosave from '@/shared/autosave/ui/autosave'

interface CompFormProps {
  previewSchema: Schema
  schema: Schema
  schemas: Norm<Schema>
  onSubmit: Config<Comp, Comp>['onSubmit']
  context: Record<string, unknown>
  comp: Comp
}

export default function CompForm(props: CompFormProps): JSX.Element {
  const [initialValues, setInitialValues] = useState(props.comp || undefined)

  useEffect(() => {
    setInitialValues(props.comp)
  }, [props.comp.id])

  return (
    <Form<Comp, Comp>
      key={props.comp.id}
      initialValues={initialValues}
      onSubmit={props.onSubmit}
      render={(formProps) => {
        return (
          <Autosave onSubmit={formProps.handleSubmit} debounce={500}>
            <Stack tokens={{ padding: '0 0 30vh' }}>
              <Stack
                tokens={{ padding: '20px 20px 0' }}
                horizontal={true}
                horizontalAlign="space-between"
                verticalAlign="center"
              >
                <Stack as="h2">{props.comp.title}</Stack>
              </Stack>
              <Stack>
                <CompDrawer
                  schema={props.schema}
                  schemas={props.schemas}
                  context={{
                    formState: formProps.form.getState(),
                    formProps,
                    previewSchema: props.previewSchema,
                    ...props.context,
                  }}
                />
              </Stack>
            </Stack>
          </Autosave>
        )
      }}
    />
  )
}
