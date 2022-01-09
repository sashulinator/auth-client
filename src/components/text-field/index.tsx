import React, { forwardRef } from 'react'
import { ITextFieldProps, TextField } from '@fluentui/react'
import { useAutoFocus } from '@/utils/use-autofocus'

const CustomTextField = forwardRef<HTMLInputElement | null, ITextFieldProps & { autoFocusDelay?: number }>(
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
      />
    )
  }
)

CustomTextField.displayName = 'CustomTextField'

export default CustomTextField
