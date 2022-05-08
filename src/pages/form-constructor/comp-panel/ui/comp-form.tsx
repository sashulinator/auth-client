import { Stack } from '@fluentui/react'

import CompContextualMenu from './contextual-menu'
import { FormApi, SubmissionErrors } from 'final-form'
import React from 'react'
import { Form } from 'react-final-form'

import { Comp, Norm, Schema } from '@/common/types'
import Autosave from '@/shared/autosave/ui/autosave'
import CompDrawer from '@/shared/draw-comps'

interface CompFormProps {
  comp: Comp
  comps: Norm<Comp>
  schemas: Norm<Schema>
  onSubmit: (
    values: Comp,
    form: FormApi<Comp, Comp>,
    callback?: (errors?: SubmissionErrors) => void
  ) => SubmissionErrors | void
}

export default function CompForm(props: CompFormProps): JSX.Element {
  return (
    <Form<Comp, Comp>
      initialValues={props.comp}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onSubmit={() => {}}
      render={() => {
        return (
          <Stack as="form" tokens={{ padding: '0 0 30vh' }} onSubmit={(e) => e.preventDefault()}>
            <Stack
              tokens={{ padding: '20px 20px 0' }}
              horizontal={true}
              horizontalAlign="space-between"
              verticalAlign="center"
            >
              <Stack as="h2">{props.comp.name}</Stack>
              <Autosave save={props.onSubmit} />
              <CompContextualMenu />
            </Stack>
            <Stack>
              <CompDrawer comps={props.comps} schemas={props.schemas} />
            </Stack>
          </Stack>
        )
      }}
    />
  )
}
