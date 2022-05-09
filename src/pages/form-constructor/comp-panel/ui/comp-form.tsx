import { Stack } from '@fluentui/react'

import CompContextualMenu from './contextual-menu'
import React, { useRef } from 'react'
import { Form } from 'react-final-form'

import { Comp, Norm, Schema } from '@/common/types'
import Autosave, { AutosavePropsHOC } from '@/shared/autosave/ui/autosave'
import CompDrawer, { Context } from '@/shared/draw-comps'

interface CompFormProps {
  comp: Comp
  comps: Norm<Comp>
  schemas: Norm<Schema>
  onSubmit: AutosavePropsHOC['save']
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
      initialValues={props.comp}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
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
                  <CompContextualMenu />
                </Stack>
                <Stack>
                  <CompDrawer
                    comps={props.comps}
                    schemas={props.schemas}
                    bindingContext={{
                      ...props.context,
                      form: formProps.form,
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
