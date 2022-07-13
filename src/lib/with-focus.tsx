import React, { LegacyRef, useEffect, useRef, useState } from 'react'

interface FocusProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFocus?: (...args: any[]) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBlur?: (...args: any[]) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: LegacyRef<Element | null>
  disabled?: boolean
  isFocused?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function withFocus<P extends FocusProps>(WrappedComponent: React.ComponentType<P>) {
  const ComponentWithInterceptedFocus = (props: Omit<P, 'isFocused'>) => {
    const ref = useRef<null | Element>(null)

    console.log('props', props)

    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
      function handleFocus() {
        if (props.disabled) {
          return
        }

        props.onFocus?.()
        setIsFocused(true)
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function handleOutsideClick(event: any) {
        if (!ref.current?.contains(event?.target)) {
          props.onBlur?.()
          setIsFocused(false)
        }
      }

      document.addEventListener('click', handleOutsideClick)
      ref.current?.addEventListener('click', handleFocus)

      ref.current?.addEventListener('focusin', handleFocus)
      document?.addEventListener('focusin', handleOutsideClick)

      return () => {
        document.removeEventListener('click', handleOutsideClick)
        ref.current?.removeEventListener('click', handleFocus)

        ref.current?.removeEventListener('focusin', handleFocus)
        document?.removeEventListener('focusin', handleOutsideClick)
      }
    }, [])

    const newProps = {
      ...props,
      isFocused,
      ref,
    } as P

    return <WrappedComponent {...newProps} />
  }
  return ComponentWithInterceptedFocus
}
