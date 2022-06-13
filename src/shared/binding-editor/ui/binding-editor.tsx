import { ActionButton, IButtonStyles, Label, Stack } from '@fluentui/react'

import './binding-editor.css'

import clsx from 'clsx'
import React, { LegacyRef, forwardRef } from 'react'

export interface RootProps {
  ref: LegacyRef<HTMLDivElement | null>
  label?: string
  children: React.ReactNode
}

const Root = forwardRef<HTMLDivElement | null, RootProps>(function BindingEditor(props, ref) {
  return (
    <div className="BindingEditorRoot" ref={ref}>
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
      className={clsx('BindingEditor', props.isNotEmpty && 'notEmpty', props.isFocused && 'isFocused')}
      verticalAlign="space-between"
    >
      <div className="fakeBorder" />
      <Stack tokens={{ childrenGap: '16px' }}>{props.children}</Stack>
    </Stack>
  )
}

BindingEditor.Root = Root
BindingEditor.ActionPanel = ActionPanel

/**
 * ActionPanel
 */

const buttonStyles: IButtonStyles = {
  rootHovered: {
    backgroundColor: 'var(--themePrimaryTransparent01)',
  },
  root: {
    height: '32px',
  },
  label: {
    color: 'var(--themePrimary)',
  },
}

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
      <ActionButton
        iconProps={{ iconName: props.mainButton.iconName }}
        onClick={props.mainButton.onClick}
        styles={buttonStyles}
      >
        {props.mainButton.name}
      </ActionButton>
      <Stack horizontal tokens={{ childrenGap: '12px' }}>
        {props.buttons.map((button) => {
          return (
            <ActionButton
              key={button.name}
              iconProps={{ iconName: button.iconName }}
              onClick={button.onClick}
              styles={buttonStyles}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}
