import { isEmpty } from '@savchenko91/schema-validator'

import { diff } from 'deep-object-diff'
import { AnyObject, FormApi, FormState } from 'final-form'
import React, { useEffect, useRef, useState } from 'react'
import { FormSpy } from 'react-final-form'

interface AutosaveProps<FormValues = Record<string, any>, InitialFormValues = Partial<FormValues>> {
  onSubmit: (values: FormValues, form: FormApi<FormValues, InitialFormValues>) => void
  debounce?: number
}

export default function Autosave<FormValues = Record<string, any>, InitialFormValues = Partial<FormValues>>(
  props: AutosaveProps<FormValues, InitialFormValues>
): JSX.Element {
  return <FormSpy {...props} subscription={{ values: true }} component={AutosaveComponent} />
}

// AUTOSAVE COMPONENT

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface AutosaveComponentProps<FormValues = Record<string, any>, InitialFormValues = Partial<FormValues>>
  extends FormState<FormValues, InitialFormValues> {
  form: FormApi<FormValues, InitialFormValues>
  onSubmit?: (values: FormValues, form: FormApi<FormValues, InitialFormValues>) => void
  debounce?: number
}

AutosaveComponent.defaultValues = {
  debounce: 0,
}

function AutosaveComponent(props: AutosaveComponentProps): null {
  const [state, setState] = useState({ values: props.values, submitting: false })
  const timeout = useRef(0)
  const promise = useRef<null | Promise<void> | void | AnyObject>(null)

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    timeout.current = window.setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      save()
    }, props.debounce)
  }, [props.values])

  async function save() {
    if (promise.current) {
      await promise.current
    }

    // иногда почему-то прилетает null поэтому по умолчанию сделаем {}
    const { values = {} } = props
    const { values: stateValues = {} } = state

    const diffStateValue = diff(stateValues, values)

    const difference = isEmpty(diffStateValue) ? diff(values, stateValues) : diffStateValue

    if (Object.keys(difference).length) {
      setState({ submitting: true, values })

      promise.current = props.onSubmit?.(values, props.form)

      setState((s) => ({ ...s, submitting: false }))
    }
  }

  return null
}
