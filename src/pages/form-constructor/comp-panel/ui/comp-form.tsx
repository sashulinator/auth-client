import { Stack } from '@fluentui/react'

import { Config } from 'final-form'
import React, { useRef } from 'react'
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
  const formRef = useRef<HTMLFormElement | null>(null)

  function save() {
    if (formRef.current) {
      const event = new CustomEvent('submit', { bubbles: true, cancelable: true })
      formRef.current.dispatchEvent(event)
    }
  }

  return (
    <Form<Comp, Comp>
      initialValues={props.comp || undefined}
      onSubmit={props.onSubmit}
      render={(formProps) => {
        return (
          <form onSubmit={formProps.handleSubmit} ref={formRef}>
            <Autosave save={save} debounce={500}>
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
                    context={{ formState: formProps.form.getState(), ...props.context }}
                  />
                </Stack>
              </Stack>
            </Autosave>
          </form>
        )
      }}
    />
  )
}
