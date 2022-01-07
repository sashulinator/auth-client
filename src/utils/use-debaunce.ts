import { useRef, useState } from 'react'

export function useDebounce<T>(defaultValue: T, delay: number) {
  const [value, setValue] = useState(defaultValue)
  const idRef = useRef<undefined | number>(undefined)

  function setValueWithDelay(newValue: T) {
    clearTimeout(idRef.current)
    idRef.current = window.setTimeout(() => setValue(newValue), delay)
  }

  return [value, setValueWithDelay, setValue] as const
}
