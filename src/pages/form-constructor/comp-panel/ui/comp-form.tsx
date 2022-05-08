import { Stack } from '@fluentui/react'

import CompContextualMenu from './contextual-menu'
import React from 'react'
import { Form } from 'react-final-form'

import { Comp, Norm, Schema } from '@/common/types'
import Autosave, { AutosavePropsHOC } from '@/shared/autosave/ui/autosave'
import CompDrawer from '@/shared/draw-comps'

interface CompFormProps {
  comp: Comp
  comps: Norm<Comp>
  schemas: Norm<Schema>
  onAutosave: AutosavePropsHOC['save']
}

export default function CompForm(props: CompFormProps): JSX.Element {
  return (
    <Form<Comp, Comp>
      initialValues={props.comp}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onSubmit={() => {}}
      render={() => {
        return (
          <Autosave save={props.onAutosave} debounce={500}>
            <Stack tokens={{ padding: '0 0 30vh' }}>
              <Stack
                tokens={{ padding: '20px 20px 0' }}
                horizontal={true}
                horizontalAlign="space-between"
                verticalAlign="center"
              >
                <Stack as="h2">{props.comp.name}</Stack>
                <CompContextualMenu />
              </Stack>
              <Stack>
                <CompDrawer comps={props.comps} schemas={props.schemas} />
              </Stack>
            </Stack>
          </Autosave>
        )
      }}
    />
  )
}
