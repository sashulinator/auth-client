import { ITextFieldProps, TextField } from '@fluentui/react'

import React, { forwardRef } from 'react'

import { useAutoFocus } from '@/lib/use-autofocus'

const CustomNumberField = forwardRef<HTMLInputElement | null, ITextFieldProps & { autoFocusDelay?: number }>(
  (props, ref): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { autoFocus, ...restProps } = props
    const setRef = useAutoFocus({
      isAutoFocus: autoFocus,
      ref,
      delay: props.autoFocusDelay,
    })

    return (
      <TextField
        autoComplete="off"
        {...restProps}
        onRenderInput={(inputProps) => {
          return <input {...inputProps} ref={setRef} />
        }}
        type="number"
      />
    )
  }
)

CustomNumberField.displayName = 'CustomNumberField'

export default CustomNumberField
