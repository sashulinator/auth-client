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

  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }

    ref.current.addEventListener('mousedown', onMouseDown)

    if (props.callapsible) {
      ref.current.addEventListener('dblclick', dblclick)
    }

    const value = localStorage.getItem(props.name)

    if (value) {
      setCSSVar(props.name, value)
    }

    if (isCollapsed()) {
      setCSSVar(`${props.name}_collapsed`, 'true')
    } else {
      setCSSVar(`${props.name}_expanded`, 'true')
    }

    return () => {
      if (!ref.current) {
        return
      }

      ref.current.removeEventListener('dblclick', dblclick)
      ref.current.removeEventListener('mousedown', onMouseDown)
    }
  }, [])

  function onMouseDown() {
    if (isCollapsed()) {
      return
    }

    const resizeEl = ref.current
    const parent = resizeEl?.parentElement

    if (!resizeEl || !parent) {
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
    document.onselectstart = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  function handleMouseMove(event: MouseEvent): void {
    const resizeEl = ref.current
    const parent = resizeEl?.parentElement

    if (!resizeEl || !parent) {
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

    localStorage.setItem(props.name, newWidth.toString())
    setCSSVar(props.name, newWidth)
  }

  function isCollapsed() {
    const isCollapsed = localStorage.getItem(`${props.name}_collapsed`)
    return isCollapsed === 'true'
  }

  function setCollapsed(value: boolean) {
    if (value) {
      setCSSVar(`${props.name}_collapsed`, 'true')
      removeCSSVar(`${props.name}_expanded`)
      localStorage.setItem(`${props.name}_collapsed`, 'true')
    } else {
      setCSSVar(`${props.name}_expanded`, 'true')
      removeCSSVar(`${props.name}_collapsed`)
      localStorage.removeItem(`${props.name}_collapsed`)
    }
  }

  function dblclick() {
    const resizeEl = ref.current
    const parent = resizeEl?.parentElement

    if (!resizeEl || !parent) {
      return
    }

    if (isCollapsed()) {
      setCollapsed(false)
      parent.style.transition = '.3s'
      parent.style.transform = ''
      setTimeout(() => {
        parent.style.transition = ''
      }, 300)
    } else {
      setCollapsed(true)
      parent.style.transition = '.3s'
      setTimeout(() => {
        parent.style.transition = ''
      }, 300)
    }
  }

  return <div className="ResizeTarget" ref={ref} />
}
