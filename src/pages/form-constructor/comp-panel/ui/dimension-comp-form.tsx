import { Stack } from '@fluentui/react'

import { Config } from 'final-form'
import React, { useEffect, useState } from 'react'
import { Field } from 'react-final-form'

import { FormAutosave } from '@/shared/autosave'
import { Checkbox } from '@/shared/checkbox'
import { Comp, CompSchema, CreateCompSchema, Dictionary, LinkedComp } from '@/shared/schema-drawer'
import CustomTextField from '@/shared/textfield'

interface DimensionCompFormProps {
  previewSchema: CompSchema | CreateCompSchema
  schema: CompSchema
  schemas: Dictionary<CompSchema>
  onSubmit: Config<Comp, Comp>['onSubmit']
  context: Record<string, unknown>
  comp: LinkedComp
}

export default function DimensionCompForm(props: DimensionCompFormProps): JSX.Element | null {
  const [initialValues, setInitialValues] = useState(props.comp || undefined)

  useEffect(() => {
    setInitialValues(props.comp)
  }, [props.comp.id])

  return (
    <FormAutosave<LinkedComp, LinkedComp>
      key={`${initialValues.id}${props.schema.id}${props.comp.id}`}
      initialValues={initialValues}
      onSubmit={props.onSubmit as any}
      debounce={500}
      render={() => {
        return (
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
              <Field<string> name="title">{({ input }) => <CustomTextField {...input} label="title" />}</Field>
              <Field<boolean> type="checkbox" name="props.required">
                {({ input }) => <Checkbox {...input} label="required" />}
              </Field>
              <Field<boolean> type="checkbox" name="props.multiselect">
                {({ input }) => <Checkbox {...input} label="multiselect" />}
              </Field>
            </Stack>
          </Stack>
        )
      }}
    />
  )
}
