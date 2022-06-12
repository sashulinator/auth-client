import { Label, Stack } from '@fluentui/react'

import './binding-editor.css'

import clsx from 'clsx'
import React, { LegacyRef, forwardRef } from 'react'

export interface BindingEditorProps {
  isNotEmpty: boolean
  isFocused: boolean
  ref: LegacyRef<HTMLDivElement | null>
  label?: string
  children: React.ReactNode
}

export const BindingEditor = forwardRef<HTMLDivElement | null, BindingEditorProps>(function BindingEditor(props, ref) {
  return (
    <div className={clsx('BindingEditor', props.isNotEmpty && 'notEmpty', props.isFocused && 'isFocused')} ref={ref}>
      {props.label && <Label>{props.label}</Label>}
      <Stack className="wrapper" verticalAlign="space-between">
        <div className="fakeBorder" />
        <Stack tokens={{ childrenGap: '16px' }}>{props.children}</Stack>
      </Stack>
    </div>
  )
})
