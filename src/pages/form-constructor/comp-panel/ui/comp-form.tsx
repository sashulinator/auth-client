import { Stack } from '@fluentui/react'

import { Config } from 'final-form'
import React, { useEffect, useMemo, useState } from 'react'

import componentList from '@/constants/component-list'
import { FormAutosave } from '@/shared/autosave'
import SchemaDrawer, { Comp, CompSchema, CreateCompSchema, Dictionary, isComp } from '@/shared/schema-drawer'

interface CompFormProps {
  previewSchema: CompSchema | CreateCompSchema
  schema: CompSchema
  schemas: Dictionary<CompSchema>
  onSubmit: Config<Comp, Comp>['onSubmit']
  context: Record<string, unknown>
  comp: Comp
}

export default function CompForm(props: CompFormProps): JSX.Element | null {
  const [initialValues, setInitialValues] = useState(props.comp || undefined)
  const comp = props.comp

  useEffect(() => {
    setInitialValues(props.comp)
  }, [props.comp.id])

  const names = useMemo(() => {
    return Object.values(props.previewSchema.data)
      .filter(isComp)
      .filter((comp) => comp.name)
      .map((comp) => comp.name)
      .sort()
  }, [])

  return (
    <FormAutosave<Comp, Comp>
      key={`${initialValues.id}${props.schema.id}${props.comp.id}`}
      initialValues={initialValues}
      onSubmit={props.onSubmit}
      debounce={500}
      render={(formProps) => {
        return (
          <Stack tokens={{ padding: '0 0 30vh' }}>
            <Stack
              tokens={{ padding: '20px 20px 0' }}
              horizontal={true}
              horizontalAlign="space-between"
              verticalAlign="center"
            >
              <Stack as="h2">{comp.title}</Stack>
            </Stack>
            <Stack>
              <SchemaDrawer
                componentList={componentList}
                schema={props.schema}
                schemas={props.schemas}
                context={{
                  form: formProps.form,
                  previewSchema: props.previewSchema,
                  previewData: {
                    schema: props.previewSchema,
                    names,
                    options: {
                      comps: Object.values(props.previewSchema.data)
                        .filter(isComp)
                        .sort((a, b) => (a.title?.toLowerCase() > b.title?.toLowerCase() ? 1 : -1))
                        .map((comp) => ({
                          key: comp.id,
                          text: comp.title,
                        })),
                    },
                  },
                  ...props.context,
                }}
              />
            </Stack>
          </Stack>
        )
      }}
    />
  )
}
