import { Checkbox, ICheckboxProps } from '@fluentui/react'

import React from 'react'
import { useForm } from 'react-final-form'

interface CheckBoxProps extends ICheckboxProps {
  сonvertFalseToUndefined?: boolean
  name: string
}

export default function CheckBox(props: CheckBoxProps): JSX.Element {
  const form = useForm()

  function onChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) {
    props?.onChange?.(ev, checked)

    if (props.сonvertFalseToUndefined && !checked) {
      form.change(props.name, undefined)
    }
  }

  return <Checkbox {...props} onChange={onChange} />
}
