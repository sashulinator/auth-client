import get from 'lodash.get'
import { useEffect } from 'react'

import api from '@/api/api-axios'
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

  function buildUrl() {
    return props.url.replaceAll(new RegExp('\\<.+\\>', 'ig'), (match) => {
      const path = match.replace('<', '').replace('>', '')
      return get({ context: props.context }, path)
    })
  }

  async function fetchData() {
    if (props.url && props.name && props.context.fns?.setFetchedDataToContext) {
      const res = await api(buildUrl(), {})

      props.context.fns?.setFetchedDataToContext((fetchContext) => {
        return { ...fetchContext, [props.name]: res.data }
      })
    }
  }

  return null
}
