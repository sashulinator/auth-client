import React, { CSSProperties, useEffect, useRef } from 'react'

interface SelectionProps {
  selectedItemIndex?: number
  animationMs: number
}

export default function Selection(props: SelectionProps): JSX.Element | null {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(animate, [props.selectedItemIndex])

  function animate() {
    if (!ref.current) {
      return
    }

    ref.current.style.transition = `${props.animationMs}ms`

    setTimeout(() => ref?.current && (ref.current.style.transition = '0'), props.animationMs)
  }

  if (props.selectedItemIndex === undefined) {
    return null
  }

  const style = {
    '--selectedItemIndex': props.selectedItemIndex,
  } as CSSProperties

  return <div className="selection" style={style} ref={ref} />
}
