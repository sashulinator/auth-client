import { Label, Stack } from '@fluentui/react'

import './binding-editor.css'

import { ClassNames } from '../constants/classNames'
import clsx from 'clsx'
import React, { LegacyRef, forwardRef } from 'react'
import HeightAnimatedContainer from 'react-auto-animated-container'

import { Button } from '@/shared/button'

export interface RootProps {
  ref: LegacyRef<HTMLDivElement | null>
  label?: string
  children: React.ReactNode
  className?: string
}

const Root = forwardRef<HTMLDivElement | null, RootProps>(function BindingEditor(props, ref) {
  return (
    <div className={clsx(ClassNames.BindingEditorRoot, props.className)} ref={ref}>
      {props.label && <Label>{props.label}</Label>}
      {props.children}
    </div>
  )
})

interface BindingEditorProps {
  children: React.ReactNode
  isNotEmpty: boolean
  isFocused: boolean
}

export default function BindingEditor(props: BindingEditorProps) {
  return (
    <Stack
      className={clsx(ClassNames.BindingEditor, props.isNotEmpty && 'notEmpty', props.isFocused && 'isFocused')}
      verticalAlign="space-between"
    >
      <HeightAnimatedContainer duration={300} transitionTimingFunction="ease">
        <div className="fakeBorder" />
        <Stack tokens={{ childrenGap: '16px' }}>{props.children}</Stack>
      </HeightAnimatedContainer>
    </Stack>
  )
}

BindingEditor.Root = Root
BindingEditor.ActionPanel = ActionPanel

export interface ActionButtonItem {
  name: string
  iconName: string
  onClick: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement>
}
interface ActionPanelProps {
  mainButton: ActionButtonItem
  buttons: ActionButtonItem[]
}

function ActionPanel(props: ActionPanelProps) {
  return (
    <Stack horizontal horizontalAlign="space-between">
      <Button variant="action" iconProps={{ iconName: props.mainButton.iconName }} onClick={props.mainButton.onClick}>
        {props.mainButton.name}
      </Button>
      <Stack horizontal tokens={{ childrenGap: '12px' }}>
        {props.buttons.map((button) => {
          return (
            <Button
              variant="action"
              key={button.name}
              iconProps={{ iconName: button.iconName }}
              onClick={button.onClick}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}
