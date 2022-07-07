import Autosave from './autosave'
import { FormApi } from 'final-form'
import React from 'react'
import { Form, FormProps } from 'react-final-form'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface FormAutoSaveProps<FormValues = Record<string, any>, InitialFormValues = Partial<FormValues>>
  extends FormProps<FormValues, InitialFormValues> {
  debounce: number
  onSubmit: (values: FormValues, form: FormApi<FormValues, InitialFormValues>) => void
  // не могу сделать Omit<...> так как почему-то аргументы render cтановятся any
  components?: undefined
  children?: undefined
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FormAutosave<FormValues = Record<string, any>, InitialFormValues = Partial<FormValues>>(
  props: FormAutoSaveProps<FormValues, InitialFormValues>
): JSX.Element {
  const { debounce, render, onSubmit, ...formProps } = props

  return (
    <Form
      {...formProps}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onSubmit={() => {}}
      render={(...args) => {
        return (
          <>
            <Autosave debounce={debounce} onSubmit={onSubmit} />
            {render?.(...args)}
          </>
        )
      }}
    />
  )
}
