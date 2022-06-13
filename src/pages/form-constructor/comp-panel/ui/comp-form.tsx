import { Stack } from '@fluentui/react'

import { Config } from 'final-form'
import React, { useEffect, useMemo, useState } from 'react'
import { Form } from 'react-final-form'

import componentList from '@/constants/component-list'
import Autosave from '@/shared/autosave/ui/autosave'
import SchemaDrawer, { Catalog, Comp, Schema } from '@/shared/schema-drawer'

interface CompFormProps {
  previewSchema: Schema
  schema: Schema
  schemas: Catalog<Schema>
  onSubmit: Config<Comp, Comp>['onSubmit']
  context: Record<string, unknown>
  comp: Comp
}

export default function CompForm(props: CompFormProps): JSX.Element {
  const [initialValues, setInitialValues] = useState(props.comp || undefined)

  useEffect(() => {
    setInitialValues(props.comp)
  }, [props.comp.id])

  const names = useMemo(() => {
    return Object.values(props.previewSchema.comps)
      .filter((comp) => comp.name)
      .map((comp) => comp.name)
      .sort()
  }, [])

  return (
    <Form<Comp, Comp>
      key={`${initialValues.id}${props.schema.id}${props.comp.id}`}
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
              <Stack tokens={{ padding: '20px 20px 0' }}>id: {props.comp.id}</Stack>
              <Stack>
                <SchemaDrawer
                  componentList={componentList}
                  schema={props.schema}
                  schemas={props.schemas}
                  context={{
                    formState: formProps.form.getState(),
                    formProps,
                    previewSchema: props.previewSchema,
                    previewData: {
                      schema: props.previewSchema,
                      compIds: Object.keys(props.previewSchema.comps),
                      names,
                    },
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
