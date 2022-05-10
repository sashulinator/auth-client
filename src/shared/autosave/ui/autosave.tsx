import { FormApi, FormState } from 'final-form'
import diff from 'object-diff'
import React, { useEffect, useRef, useState } from 'react'
import { FormSpy } from 'react-final-form'

export interface AutosavePropsHOC {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save: (values: any, form: FormApi<any, any>) => void | Promise<void>
  debounce: number
  children?: React.ReactChild
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AutosaveProps = FormState<any, any> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormApi<any, any>
  hocProps: AutosavePropsHOC
}

function Autosave(props: AutosaveProps) {
  const [state, setState] = useState({ values: props.values, submitting: false })
  const timeout = useRef(0)
  const promise = useRef<null | Promise<void> | void>(null)

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    timeout.current = window.setTimeout(save, props.hocProps.debounce)
  }, [props.values])

  async function save() {
    if (promise.current) {
      await promise.current
    }

    const { values } = props

    const difference = diff(state.values, values)

    if (Object.keys(difference).length) {
      setState({ submitting: true, values })

      promise.current = props.hocProps.save(values, props.form)
      await promise.current

      promise.current = null

      setState((s) => ({ ...s, submitting: false }))
    }
  }

  return props.hocProps.children
}

export default function AutosaveHOC(props: AutosavePropsHOC): JSX.Element {
  // @ts-expect-error because of final-form props for Autosave
  return <FormSpy hocProps={props} subscription={{ values: true }} component={Autosave} />
}
