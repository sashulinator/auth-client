import { assertNotNull } from '@savchenko91/schema-validator'

import './preview.css'

import { highlightSelected } from '../lib/highlight'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { Form } from 'react-final-form'

import componentList from '@/constants/component-list'
import LoadingAria from '@/shared/loading-aria'
import SchemaDrawer, { Catalog, CompSchema, CompSchemaType } from '@/shared/schema-drawer'
import { setCSSVar } from '@/shared/theme'

interface PreviewProps {
  schema: CompSchema
  schemas: Catalog<CompSchema> | null
  selectedCompIds: string[]
  isLoading: boolean
}

interface Positions {
  el: { x: number; y: number }
  client: { x: number; y: number }
}

export default function Preview(props: PreviewProps): JSX.Element | null {
  const { schemas, schema } = props
  const ref = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    function updateHighlights() {
      window.setTimeout(() => highlightSelected(props.selectedCompIds))
    }

    document.addEventListener('click', updateHighlights)
    document.addEventListener('keydown', updateHighlights)

    return () => {
      document.removeEventListener('click', updateHighlights)
      document.addEventListener('keydown', updateHighlights)
    }
  }, [props.selectedCompIds, props.schema])

  function onSubmit(data: unknown) {
    console.log('data', data)
  }

  useLayoutEffect(() => {
    const parent = ref.current?.parentElement

    if (parent) {
      assertNotNull(ref.current)
      parent.addEventListener('mousedown', onMouseDown, true)
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
        parent.removeEventListener('mousedown', onMouseDown, true)
      }
    }
  }, [props.schema.id])

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

  function onMouseDown(event: MouseEvent) {
    const target: any = event.target

    if (!target?.classList.contains('PreviewPanel') && !target?.classList.contains('ms-Stack')) {
      return
    }

    const previewEl = ref.current
    const parent = previewEl?.parentElement

    if (!previewEl || !parent) {
      return
    }

    const { top, left } = getComputedStyle(previewEl)

    localStorage.setItem(
      'position',
      JSON.stringify({
        el: { x: parseInt(left), y: parseInt(top) },
        client: { x: event.clientX, y: event.clientY },
      })
    )

    document.body.style.cursor = 'move'
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

  if (props.schema.type === CompSchemaType.FORM_DIMENSION) {
    return null
  }

  return (
    <div className="Preview" ref={ref}>
      <LoadingAria loading={props.isLoading} label="Components loading...">
        <div className="wrapper">
          <div className="selectorArea" />
          <div className="hoverArea" />
          {schemas && schema && (
            <Form
              key={JSON.stringify(schema.catalog)}
              onSubmit={onSubmit}
              render={(formProps) => {
                return (
                  <form id="main" onSubmit={formProps.handleSubmit}>
                    <SchemaDrawer
                      componentList={componentList}
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
      </LoadingAria>
    </div>
  )
}
