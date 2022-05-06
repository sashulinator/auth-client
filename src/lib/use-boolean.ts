import { useCallback, useState } from 'react'

export default function useBoolean(initialState: boolean) {
  const [state, setState] = useState(initialState)

  const setTrue = useCallback(() => setState(true), [])
  const setFalse = useCallback(() => setState(false), [])
  const toggle = useCallback(() => setState((state) => !state), [])

  return [state, setTrue, setFalse, toggle] as const
}
