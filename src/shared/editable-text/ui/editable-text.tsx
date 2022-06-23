import { ITextFieldProps } from '@fluentui/react'

import './editable-text.css'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { isEnter } from '@/lib/key-events'
import TextField from '@/shared/textfield'

interface EditableTextProps extends ITextFieldProps {
  onClickOutside?: () => void
  initialIsEditing?: boolean
  isEditing?: boolean
}

const textFieldStyles = {
  fieldGroup: { border: '1px solid transparent' },
}

export default function EditableText(props: EditableTextProps): JSX.Element {
  if (props.initialIsEditing !== undefined && props.isEditing !== undefined) {
    throw new Error('Pass prop initialIsEditing or isEditing')
  }

  const ref = useRef<HTMLDivElement | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)

  const [isLocalEditing, setIsLocalEditing] = useState(props.initialIsEditing ?? false)
  const isEditing = props.isEditing ?? isLocalEditing

  function setIsEditing(newValue: boolean) {
    if (props.isEditing !== undefined) {
      props.onClickOutside?.()
    } else {
      setIsLocalEditing(newValue)
    }
  }

  useLayoutEffect(() => {
    if (!isLocalEditing) {
      setTimeout(() => {
        if (window.getSelection) {
          if (window.getSelection()?.empty) {
            // Chrome
            window.getSelection()?.empty()
          } else if (window.getSelection()?.removeAllRanges) {
            // Firefox
            window.getSelection()?.removeAllRanges()
          }
        }
      })
    } else {
      setTimeout(() => {
        rootRef.current?.querySelector<HTMLInputElement>('input')?.focus()
      })
    }
  }, [isEditing])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function clickOutside(event: any) {
      if (!rootRef.current?.contains(event?.target)) {
        setIsEditing(false)
        props.onClickOutside?.()
      }
    }

    document.addEventListener('click', clickOutside)

    return () => {
      document.removeEventListener('click', clickOutside)
    }
  }, [isEditing])

  return (
    <div className="EditableText" ref={rootRef}>
      <div style={{ visibility: !isEditing ? 'hidden' : 'visible' }}>
        <TextField
          {...props}
          styles={!isEditing ? textFieldStyles : undefined}
          value={isEditing ? props.value : undefined}
        />
      </div>
      {!isEditing && (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (isEnter(e)) {
              setIsEditing(true)
            }
          }}
          className="text"
          onDoubleClick={() => setIsEditing(true)}
          ref={ref}
          dangerouslySetInnerHTML={{
            __html: (props.value === undefined ? props.defaultValue : props.value) || '',
          }}
        ></div>
      )}
    </div>
  )
}
