import { assertNotNull } from '@savchenko91/schema-validator'

import './preview.css'

import { highlightSelection, removeAllSelectionHighlights } from '../lib/highlight'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
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

  function onSubmit(data: unknown) {
    console.log('data', data)
  }

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

  useLayoutEffect(() => {
    const parent = ref.current?.parentElement

    if (parent) {
      assertNotNull(ref.current)
      parent.addEventListener('wheel', onWheel)

      const { width } = getComputedStyle(parent)
      const { width: previewWidth } = getComputedStyle(ref.current)

      setCSSVar('previewLeft', parseInt(width, 10) / 2 - parseInt(previewWidth) / 2)
      setCSSVar('previewTop', 77)

      localStorage.setItem(
        'position',
        JSON.stringify({
          el: { x: parseInt(width, 10) / 2 - parseInt(previewWidth) / 2, y: 77 },
          client: { x: 0, y: 0 },
        })
      )
    }

    return () => {
      if (parent) {
        parent.removeEventListener('wheel', onWheel)
      }
    }
  }, [])

  function onWheel(event: WheelEvent) {
    const previewEl = ref.current
    const parent = previewEl?.parentElement
    const positionString = localStorage.getItem('position')

    if (!previewEl || !parent) {
      return
    }

    const { top, left } = getComputedStyle(previewEl)

    if (!positionString) {
      localStorage.setItem(
        'position',
        JSON.stringify({
          el: { x: parseInt(left), y: parseInt(top) },
          client: { x: event.clientX, y: event.clientY },
        })
      )
      return
    }

    const position: Positions = JSON.parse(positionString)

    localStorage.setItem(
      'position',
      JSON.stringify({
        el: { x: position.el.x - event.deltaX, y: position.el.y - event.deltaY },
        client: { x: event.clientX, y: event.clientY },
      })
    )

    setCSSVar('previewLeft', position.el.x - event.deltaX)
    setCSSVar('previewTop', position.el.y - event.deltaY)
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
