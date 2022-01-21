import { useCallback, useEffect, useState } from 'react'

export function useInputValue(clientValue = '', handleChange: (num: number) => () => void) {
  // value that you can change typing
  const [value, setValue] = useState(clientValue)
  // value that you set when press enter
  const [appliedValue, setCurrentPage] = useState(clientValue)

  useEffect(() => {
    if (appliedValue !== clientValue) {
      setValue(clientValue)
      setCurrentPage(clientValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientValue, appliedValue])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInputChange = useCallback((e: { target: any }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    setValue(e.target.value)
  }, [])

  const onKeyUp = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: { target: any; key: string }) => {
      if (e.key === 'Enter') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        const newAppliedValue = e.target.value as string
        setCurrentPage(newAppliedValue)
        handleChange(parseInt(newAppliedValue || '', 10))()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appliedValue]
  )

  return [value, onInputChange, onKeyUp] as const
}
