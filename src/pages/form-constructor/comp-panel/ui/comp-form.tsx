import { Stack } from '@fluentui/react'

import { Config } from 'final-form'
import React, { useRef } from 'react'
import { Form } from 'react-final-form'

import { Comp, Schema } from '@/common/types'
import Autosave from '@/shared/autosave/ui/autosave'
import CompDrawer, { Context } from '@/shared/draw-comps'

interface CompFormProps {
  schema: Schema
  onSubmit: Config<Comp, Comp>['onSubmit']
  context: Context
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
      initialValues={props.context.states.selectedComp || undefined}
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
                  <Stack as="h2">{props.context.states.selectedComp?.title}</Stack>
                </Stack>
                <Stack>
                  <CompDrawer
                    comps={props.schema.comps}
                    bindingContext={{
                      states: {
                        ...props.context.states,
                        formState: formProps.form.getState(),
                      },
                      functions: {
                        ...props.context.functions,
                      },
                    }}
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
