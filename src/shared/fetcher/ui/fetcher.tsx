import { useEffect } from 'react'

import { DrawerContext } from '@/shared/schema-drawer'

interface FetcherProps {
  url: string
  name: string
  context: DrawerContext
}

export default function Fetcher(props: FetcherProps): null {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData()
  }, [])

  async function fetchData() {
    if (props.url && props.name && props.context.fns?.setFetchedDataToContext) {
      const res = await fetch(props.url, {})
      const data = await res.json()

      props.context.fns?.setFetchedDataToContext((fetchContext) => {
        return { ...fetchContext, [props.name]: data }
      })
    }
  }

  return null
}
