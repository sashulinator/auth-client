import { ILabelStyles, ITextFieldProps, Icon, Label, TextField } from '@fluentui/react'

import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useAutoFocus } from '@/lib/use-autofocus'
import Stack from '@/shared/stack'
import { Tooltip } from '@/shared/tooltip'

interface TextFieldProps extends ITextFieldProps {
  autoFocusDelay?: number
  info?: string
  type?: string
  canRevealPassword?: boolean
  color?: string
}

const CustomTextField = forwardRef<HTMLInputElement | null, TextFieldProps>(
  (props, ref): JSX.Element => {
    const { t } = useTranslation()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { autoFocus, label, info, required, type, ...restProps } = props
    const setRef = useAutoFocus({
      isAutoFocus: autoFocus,
      ref,
      delay: props.autoFocusDelay,
    })

    const labelStyles: ILabelStyles = {
      root: {
        color: props.color,
      },
    }

    return (
      <span className="f">
        {label && !props.underlined && (
          <Stack horizontal horizontalAlign="space-between" verticalAlign="end">
            <Label required={required} styles={{ ...labelStyles }}>
              {t(label).toString()}
            </Label>
            {info && (
              <Stack style={{ marginBottom: '2px' }}>
                <Tooltip text={info}>
                  <Icon iconName="Info" style={{ fontWeight: 'bolder', opacity: '0.6' }} />
                </Tooltip>
              </Stack>
            )}
          </Stack>
        )}
        <TextField
          autoComplete="off"
          {...restProps}
          label={props.underlined ? label : undefined}
          required={props.underlined ? required : undefined}
          onRenderInput={(inputProps) => {
            return <input {...inputProps} ref={setRef} />
          }}
          type={props.type}
          canRevealPassword
        />
      </span>
    )
  }
)

CustomTextField.displayName = 'CustomTextField'

export default CustomTextField
