import './field-border.css'

import clsx from 'clsx'
import React, { DetailedHTMLProps, forwardRef } from 'react'

import withFocus from '@/lib/with-focus'

interface FieldBorderProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isFocused?: boolean
  children?: React.ReactNode
  className?: string
}

const FieldBorderForwardRef = forwardRef<HTMLDivElement | null, FieldBorderProps>(function FieldBorder(
  props,
  ref
): JSX.Element {
  const { isFocused, ...restProps } = props
  return (
    <div {...restProps} className={clsx('FieldBorder', props.className, isFocused && 'isFocused')} ref={ref}>
      <div className="border" />
      {props.children}
    </div>
  )
})

const FieldBorder = withFocus(FieldBorderForwardRef)

export default FieldBorder
