import React, { useEffect } from 'react'

interface FetcherProps {
  url: string
  name: string
  setFetchedDataToContext: React.Dispatch<React.SetStateAction<Record<string, unknown>>>
}

export default function Fetcher(props: FetcherProps): null {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData()
  }, [])

  async function fetchData() {
    if (props.url && props.name && props.setFetchedDataToContext) {
      const res = await fetch(props.url, {})
      const data = await res.json()

      props.setFetchedDataToContext((fetchContext) => {
        return { ...fetchContext, [props.name]: data }
      })
    }
  }

  return null
}
