import './resize-target.css'

import React, { useLayoutEffect, useRef, useState } from 'react'

import { setCSSVariable } from '@/shared/theme'

interface ResizeTargetProps {
  name: string
}

export default function ResizeTarget(props: ResizeTargetProps): JSX.Element {
  const [initParentWidth, setInitParentWidth] = useState<number>(0)
  const ref = useRef<null | HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }

    ref.current.addEventListener('mousedown', onMouseDown)

    const value = localStorage.getItem(props.name)

    if (value) {
      setCSSVariable(props.name, value)
    }

    return () => {
      if (!ref.current) {
        return
      }

      ref.current.removeEventListener('mousedown', onMouseDown)
    }
  }, [])

  function onMouseDown() {
    const resizeEl = ref.current
    const parent = resizeEl?.parentElement

    if (!resizeEl || !parent) {
      return
    }

    const parentRect = parent.getBoundingClientRect()
    setInitParentWidth(parentRect.width)

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

    const newWidth = event.clientX + initParentWidth
    const { minWidth, maxWidth } = getComputedStyle(parent)

    if (newWidth > parseInt(maxWidth) || newWidth < parseInt(minWidth)) {
      return
    }

    localStorage.setItem(props.name, newWidth.toString())
    setCSSVariable(props.name, newWidth)
  }

  return <div className="ResizeTarget" ref={ref} />
}
