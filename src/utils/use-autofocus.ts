import { ForwardedRef, LegacyRef, MutableRefObject, RefCallback, useRef } from 'react'

export interface AutoFocusProps {
  isAutoFocus?: boolean
  ref?: RefCallback<HTMLElement | null> | MutableRefObject<HTMLElement | null> | ForwardedRef<HTMLElement | null>
  delay?: number
}

export function useAutoFocus<T extends HTMLElement>({ isAutoFocus, ref, delay }: AutoFocusProps) {
  const firsRenderRef = useRef(true)
  const setRef: LegacyRef<T | null> = (element) => {
    if (isAutoFocus && firsRenderRef.current) {
      firsRenderRef.current = false
      delay ? setTimeout(() => element?.focus(), delay) : element?.focus()
    }

    if (typeof ref === 'function') {
      ref(element)
    } else {
      if (ref) {
        ref.current = element
      }
    }
  }

  return setRef
}
