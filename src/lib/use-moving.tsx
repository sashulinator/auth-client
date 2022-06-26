import { assertNotNull } from '@savchenko91/schema-validator'

import { useLayoutEffect, useRef } from 'react'

import { setCSSVar } from '@/shared/theme'

interface Positions {
  el: { x: number; y: number }
  client: { x: number; y: number }
}

export default function useMoving(
  name: string,
  draggableClassnames: string[]
): React.MutableRefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null)

  const leftName = `${name}Left`
  const topName = `${name}Top`

  useLayoutEffect(() => {
    const parent = ref.current?.parentElement

    if (parent) {
      assertNotNull(ref.current)
      parent.addEventListener('mousedown', onMouseDown, true)
      parent.addEventListener('wheel', onWheel)

      const { width } = getComputedStyle(parent)
      const { width: previewWidth } = getComputedStyle(ref.current)

      setCSSVar(leftName, parseInt(width, 10) / 2 - parseInt(previewWidth) / 2)
      setCSSVar(topName, 77)

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
  })

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

    setCSSVar(leftName, position.el.x - event.deltaX)
    setCSSVar(topName, position.el.y - event.deltaY)
  }

  function onMouseDown(event: MouseEvent) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target: any = event.target
    const isDraggable = [...draggableClassnames].some((className) => target?.classList.contains(className))

    if (target !== ref.current?.parentElement && !isDraggable) {
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

    setCSSVar(leftName, position.el.x - diffX)
    setCSSVar(topName, position.el.y - diffY)
  }

  return ref
}
