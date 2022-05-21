import './preview.css'

import { highlightSelection, removeAllSelectionHighlights } from '../lib/highlight'
import React, { useEffect, useRef } from 'react'
import { Form } from 'react-final-form'

import { Norm, Schema } from '@/entities/schema'
import SchemaDrawer from '@/shared/schema-drawer'
import { setCSSVar } from '@/shared/theme'

interface PreviewProps {
  schema: Schema
  schemas: Norm<Schema> | null
  selectedCompIds: string[]
}

interface Positions {
  el: { x: number; y: number }
  client: { x: number; y: number }
}

export default function Preview(props: PreviewProps): JSX.Element {
  const { schemas, schema } = props
  const ref = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    function updateHighlights() {
      setTimeout(() => {
        removeAllSelectionHighlights()
        props.selectedCompIds.forEach((compId) => {
          highlightSelection(compId)
        })
      })
    }

    document.addEventListener('click', updateHighlights)

    return () => {
      document.removeEventListener('click', updateHighlights)
    }
  }, [props.selectedCompIds, props.schema])

  function onSubmit(data: unknown) {
    console.log('data', data)
  }

  useEffect(() => {
    const parent = ref.current?.parentElement

    if (parent) {
      parent.addEventListener('mousedown', onMouseDown)
    }

    return () => {
      if (parent) {
        parent.removeEventListener('mousedown', onMouseDown)
      }
    }
  }, [])

  function onMouseDown(event: MouseEvent) {
    const previewEl = ref.current
    const parent = previewEl?.parentElement

    if (!previewEl || !parent) {
      return
    }

    const { top, left } = getComputedStyle(previewEl)

    console.log('event', event)

    localStorage.setItem(
      'position',
      JSON.stringify({
        el: { x: parseInt(left), y: parseInt(top) },
        client: { x: event.clientX, y: event.clientY },
      })
    )

    document.body.style.cursor = 'col-resize'
    document.onselectstart = (): boolean => false
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  function handleMouseUp(): void {
    document.body.style.cursor = 'auto'
    localStorage.removeItem('position')
    document.onselectstart = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  function handleMouseMove(event: MouseEvent): void {
    const resizeEl = ref.current
    const parent = resizeEl?.parentElement
    const positionString = localStorage.getItem('position')

    if (!resizeEl || !parent || !positionString) {
      return
    }

    const position: Positions = JSON.parse(positionString)

    const diffX = position.client.x - event.clientX
    const diffY = position.client.y - event.clientY

    setCSSVar('previewLeft', position.el.x - diffX)
    setCSSVar('previewTop', position.el.y - diffY)
  }

  return (
    <div className="Preview" ref={ref}>
      <div className="wrapper">
        <div className="selectorArea" />
        <div className="hoverArea" />
        {schemas && schema && (
          <Form
            onSubmit={onSubmit}
            render={(formProps) => {
              return (
                <form onSubmit={formProps.handleSubmit}>
                  <SchemaDrawer
                    schema={schema}
                    schemas={schemas}
                    context={{
                      formState: formProps.form.getState(),
                      formProps,
                    }}
                  />
                </form>
              )
            }}
          />
        )}
      </div>
    </div>
  )
}
