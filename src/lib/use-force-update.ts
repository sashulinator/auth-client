import { useState } from 'react'

export function useForceUpdate() {
  const [, setUpdate] = useState({})

  return () => setUpdate({})
}
