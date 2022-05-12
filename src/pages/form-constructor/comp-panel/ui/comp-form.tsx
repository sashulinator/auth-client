import { Stack } from '@fluentui/react'

import { Config } from 'final-form'
import React from 'react'
import { Form } from 'react-final-form'

import { Comp, Norm, Schema } from '@/entities/schema'
import Autosave from '@/shared/autosave/ui/autosave'
import CompDrawer from '@/shared/schema-drawer'

interface CompFormProps {
  schema: Schema
  schemas: Norm<Schema>
  onSubmit: Config<Comp, Comp>['onSubmit']
  context: Record<string, unknown>
  comp: Comp
}

export default function CompForm(props: CompFormProps): JSX.Element {
  return (
    <Form<Comp, Comp>
      initialValues={props.comp || undefined}
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
                    ...props.context,
                    fns: {
                      changeField: formProps.form.change,
                      formSubscribe: formProps.form.subscribe,
                    },
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
