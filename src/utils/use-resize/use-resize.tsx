import { animate, quad } from '../animate'
import React, { useLayoutEffect, useRef, useState } from 'react'

import { removeCSSVar, setCSSVar } from '@/shared/theme'

interface UseResizeProps {
  name: string
  direction: 'left' | 'right'
  callapsible: boolean
  ref: { current: null | Element }
  size: {
    min: number
    max: number
    default: number
    collapsed: number
  }
  ms: number
}

export function useResize(props: UseResizeProps) {
  const [initParentWidth, setInitParentWidth] = useState<number>(0)
  const ref = useRef<null | HTMLDivElement>(null)
  const ms = props.ms || 333
  const names = {
    size: `${props.name}_size`,
    changing: `${props.name}_move`,
    userChanging: `${props.name}_usermove`,
    autoChanging: `${props.name}_automove`,
    collapsed: `${props.name}_collapsed`,
    expanded: `${props.name}_expanded`,
    idle: `${props.name}_idle`,
  }

  useLayoutEffect(init, [props.ref.current])
  useLayoutEffect(addEventListener, [props.ref.current])

  function init() {
    const size = isCollapsed() ? props.size.collapsed : getSize()
    setCSSVar(names.size, size)

    if (isCollapsed()) {
      setCSSVar(names.collapsed, 'true')
      document.body?.classList.add(names.collapsed)
      return
    }

    document.body?.classList.add(names.expanded)
    setCSSVar(names.expanded, 'true')
  }

  function addEventListener() {
    ref.current?.addEventListener('mousedown', onMouseDown)

    if (props.callapsible) {
      ref.current?.addEventListener('dblclick', onDoubleClick)
    }

    return () => {
      ref.current?.removeEventListener('dblclick', onDoubleClick)
      ref.current?.removeEventListener('mousedown', onMouseDown)
    }
  }

  function onMouseDown() {
    if (isCollapsed() || !props.ref.current) {
      return
    }

    const parentRect = props.ref.current?.getBoundingClientRect()
    setInitParentWidth(Math.round(parentRect.width))

    document.body.style.cursor = 'col-resize'
    document.onselectstart = (): boolean => false
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  function handleMouseUp(): void {
    document.body.style.cursor = 'auto'
    setInitParentWidth(0)
    removeCSSVar(names.changing)
    removeCSSVar(names.userChanging)
    document.onselectstart = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  function handleMouseMove(event: MouseEvent): void {
    if (!props.ref.current) {
      return
    }

    const parentRect = props.ref.current.getBoundingClientRect()
    const diff =
      props.direction === 'left'
        ? event.clientX - (initParentWidth + parentRect.left)
        : Math.abs(event.clientX - parentRect.right)

    const newWidth = Math.round(initParentWidth + diff)

    if (newWidth > props.size.max || newWidth < props.size.min) {
      return
    }

    localStorage.setItem(names.size, newWidth.toString())
    setCSSVar(names.changing, 'true')
    setCSSVar(names.userChanging, 'true')
    setCSSVar(names.size, newWidth)
  }

  function isCollapsed() {
    return localStorage.getItem(names.collapsed) === 'true'
  }

  function setCollapsed(value: boolean) {
    const size = getSize()

    if (value) {
      document.body?.classList.add(names.collapsed)
      document.body.classList.remove(names.expanded)
      setCSSVar(names.collapsed, 'true')
      removeCSSVar(names.expanded)
      localStorage.setItem(names.collapsed, 'true')
      setCSSWithAnimation(names.size, ms, props.size.collapsed, size)
    } else {
      document.body.classList.remove(names.collapsed)
      document.body.classList.add(names.expanded)
      setCSSVar(names.expanded, 'true')
      removeCSSVar(names.collapsed)
      localStorage.removeItem(names.collapsed)
      setCSSWithAnimation(names.size, ms, size, props.size.collapsed)
    }

    setCSSVar(names.changing, 'true')
    setTimeout(() => removeCSSVar(names.changing), ms)

    removeCSSVar(names.idle)
    setTimeout(() => setCSSVar(names.idle, 'true'), ms)

    setCSSVar(names.autoChanging, 'true')
    setTimeout(() => removeCSSVar(names.autoChanging), ms)
  }

  function onDoubleClick() {
    if (!props.ref.current) {
      return
    }

    if (isCollapsed()) {
      setCollapsed(false)
    } else {
      setCollapsed(true)
    }
  }

  function getSize() {
    return parseInt(localStorage.getItem(names.size) || '') || props.size.default
  }

  return {
    ResizeLine: <div className="ResizeTarget" ref={ref} />,
  }
}

// Private

function setCSSWithAnimation(name: string, ms: number, from: number, to: number) {
  animate({
    timing: quad,
    duration: ms,
    draw: (progress) => {
      const diff = from - to
      const diffProgress = diff * progress

      setCSSVar(name, Math.ceil(diffProgress + to))
    },
  })
}
