import { Stack } from '@fluentui/react'

import { Config } from 'final-form'
import React, { useEffect, useState } from 'react'
import { Field, Form } from 'react-final-form'

import Autosave from '@/shared/autosave/ui/autosave'
import { Checkbox } from '@/shared/checkbox'
import { Catalog, Comp, CompSchema, DimensionComp } from '@/shared/schema-drawer'

interface DimensionCompFormProps {
  previewSchema: CompSchema
  schema: CompSchema
  schemas: Catalog<CompSchema>
  onSubmit: Config<Comp, Comp>['onSubmit']
  context: Record<string, unknown>
  comp: DimensionComp
}

export default function DimensionCompForm(props: DimensionCompFormProps): JSX.Element | null {
  const [initialValues, setInitialValues] = useState(props.comp || undefined)

  useEffect(() => {
    setInitialValues(props.comp)
  }, [props.comp.id])

  return (
    <Form<DimensionComp, DimensionComp>
      key={`${initialValues.id}${props.schema.id}${props.comp.id}`}
      initialValues={initialValues}
      onSubmit={props.onSubmit as any}
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
                <Stack as="h2">{props.schema.title}</Stack>
              </Stack>
              <Stack tokens={{ padding: '24px 24px 0', childrenGap: 24 }}>
                <Field<boolean> type="checkbox" name="required">
                  {({ input }) => <Checkbox {...input} label="required" />}
                </Field>
                <Field<boolean> type="checkbox" name="multiselect">
                  {({ input }) => <Checkbox {...input} label="multiselect" />}
                </Field>
              </Stack>
            </Stack>
          </Autosave>
        )
      }}
    />
  )
}
