/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-misused-promises */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from '@savchenko91/schema-validator'

import { diff } from 'deep-object-diff'
import { Config, FormApi, FormState } from 'final-form'
import React, { useEffect, useRef, useState } from 'react'
import { FormSpy } from 'react-final-form'

export type AutosaveProps = AutosaveProps1 | AutosaveProps2

type AutosaveProps1 = {
  debounce: number
  save: (values: any, form: FormApi<any, any>) => void | Promise<void>
}

type AutosaveProps2 = {
  debounce: number
  children: React.ReactChild
  onSubmit: Config<any, any>['onSubmit']
}

export default function AutosaveHOC(hocProps: AutosaveProps): JSX.Element {
  // @ts-expect-error because
  return <FormSpy hocProps={hocProps} subscription={{ values: true }} component={Autosave} />
}

type AutosaveLogicProps = FormState<any, any> & {
  form: FormApi<any, any>
  hocProps: AutosaveProps
}

function Autosave(props: AutosaveLogicProps): JSX.Element | null {
  const [state, setState] = useState({ values: props.values, submitting: false })
  const timeout = useRef(0)
  const promise = useRef<null | Promise<void> | void>(null)
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
    timeout.current = window.setTimeout(save, props.hocProps.debounce)
  }, [props.values])

  async function save() {
    if (promise.current) {
      await promise.current
    }

    const { values } = props

    // diff бывает выкидывает ошибку если null прилетит
    // непонятно откуда он прилетает
    try {
      const difference1 = diff(state.values, values)
      const difference2 = diff(values, state.values)

      const difference = isEmpty(difference1) ? difference2 : difference1

      if (Object.keys(difference).length) {
        setState({ submitting: true, values })

        if (isAutosaveWithForm(props.hocProps) && props.hocProps.children) {
          forceSubmit()
        } else if (isSimpleAutosave(props.hocProps)) {
          promise.current = props.hocProps.save?.(values, props.form)
        }
        setState((s) => ({ ...s, submitting: false }))
      }
    } catch (e) {
      return
    }
  }

  function forceSubmit() {
    if (formRef.current) {
      const event = new CustomEvent('submit', { bubbles: true, cancelable: true })
      formRef.current.dispatchEvent(event)
    }
  }

  if (isAutosaveWithForm(props.hocProps) && props.hocProps.children) {
    return (
      <form onSubmit={props.hocProps.onSubmit as any} ref={formRef}>
        {props.hocProps.children}
      </form>
    )
  }

  if (isSimpleAutosave(props.hocProps)) {
    return null
  }

  return null
}

function isAutosaveWithForm(input: any): input is AutosaveProps2 {
  return !!input?.children
}
function isSimpleAutosave(input: any): input is AutosaveProps1 {
  return !!input?.save
}
