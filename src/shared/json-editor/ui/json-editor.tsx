import { Label } from '@fluentui/react'
import { assertString } from '@savchenko91/schema-validator'

import { Ace } from 'ace-builds'
import 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-monokai'
import React, { useRef } from 'react'
import AceEditor, { IAceEditorProps } from 'react-ace'
import { FieldRenderProps } from 'react-final-form'

const TAB_SIZE = 2

export interface JSONEditorProps extends FieldRenderProps<any>, IAceEditorProps {}

const tryParseJson = (value: unknown): any => {
  try {
    assertString(value)
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

export default function JSONEditor(props: JSONEditorProps): JSX.Element {
  const lastStringValue = useRef<any>()
  // т.к. JSON.parse возвращает any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastOnChangeValue = useRef<any>()

  function onChange(value: string): void {
    const parsedValue = tryParseJson(value)
    lastOnChangeValue.current = parsedValue
    lastStringValue.current = value

    props.input?.onChange?.(parsedValue)
  }

  function handleAceBlur(_: unknown, editor?: Ace.Editor): void {
    const aceValue = editor?.getValue?.()
    const parsedValue = tryParseJson(aceValue)

    props.input?.onBlur?.(parsedValue)
  }

  return (
    <div className="JSONEditor">
      <Label>{props.label}</Label>
      <AceEditor
        width="100%"
        mode="json"
        theme="monokai"
        name="UNIQUE_ID_OF_DIV"
        {...props}
        tabSize={TAB_SIZE}
        height="250px"
        onChange={onChange}
        onBlur={handleAceBlur}
        setOptions={{
          useWorker: false,
          showGutter: false,
          ...props?.setOptions,
        }}
      />
    </div>
  )
}
