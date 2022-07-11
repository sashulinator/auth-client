import './resize-target.css'

import React, { useLayoutEffect, useRef, useState } from 'react'

import { removeCSSVar, setCSSVar } from '@/shared/theme'

interface ResizeTargetProps {
  name: string
  direction: 'left' | 'right'
  callapsible?: boolean
}

export default function ResizeTarget(props: ResizeTargetProps): JSX.Element {
  const [initParentWidth, setInitParentWidth] = useState<number>(0)
  const ref = useRef<null | HTMLDivElement>(null)

  const names = {
    size: `${props.name}_size`,
    changing: `${props.name}_move`,
    userChanging: `${props.name}_usermove`,
    autoChanging: `${props.name}_automove`,
    collapsed: `${props.name}_collapsed`,
    expanded: `${props.name}_expanded`,
    idle: `${props.name}_idle`,
  }

  useLayoutEffect(init, [])
  useLayoutEffect(addEventListener, [])

  function init() {
    const value = localStorage.getItem(names.size)

    if (value) {
      setCSSVar(names.size, value)
    }

    if (isCollapsed()) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
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
    if (isCollapsed()) {
      return
    }

    const parent = ref.current?.parentElement

    if (!parent) {
      return
    }

    const parentRect = parent.getBoundingClientRect()
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
    const parent = ref.current?.parentElement

    if (!parent) {
      return
    }

    const parentRect = parent.getBoundingClientRect()
    const diff =
      props.direction === 'left'
        ? event.clientX - (initParentWidth + parentRect.left)
        : Math.abs(event.clientX - parentRect.right)

    const newWidth = Math.round(initParentWidth + diff)
    const { minWidth, maxWidth } = getComputedStyle(parent)

    if (newWidth > parseInt(maxWidth) || newWidth < parseInt(minWidth)) {
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
    if (value) {
      document.body.classList.add(names.collapsed)
      setCSSVar(names.collapsed, 'true')
      removeCSSVar(names.expanded)
      localStorage.setItem(names.collapsed, 'true')
    } else {
      document.body.classList.remove(names.collapsed)
      setCSSVar(names.expanded, 'true')
      removeCSSVar(names.collapsed)
      localStorage.removeItem(names.collapsed)
    }

    setCSSVar(names.changing, 'true')
    setTimeout(() => removeCSSVar(names.changing), 300)

    removeCSSVar(names.idle)
    setTimeout(() => setCSSVar(names.idle, 'true'), 300)

    setCSSVar(names.autoChanging, 'true')
    setTimeout(() => removeCSSVar(names.autoChanging), 300)
  }

  function onDoubleClick() {
    const parent = ref.current?.parentElement

    if (!parent) {
      return
    }

    if (isCollapsed()) {
      setCollapsed(false)
    } else {
      setCollapsed(true)
    }
  }

  return <div className="ResizeTarget" ref={ref} />
}
